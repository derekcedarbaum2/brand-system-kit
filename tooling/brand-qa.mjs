#!/usr/bin/env node
/* =====================================================================
   brand-qa.mjs — one-command brand gate for any finished artifact.
   Runs the deterministic checks a skill should pass before shipping:
     1. contrast-check   (profile palette meets WCAG AA)
     2. lint             (artifact: banned words, hex, gradients, leakage)
     3. render  (optional, --render)  → PNG for visual critique

   Usage:
     node brand-qa.mjs <artifact.html|.md> <profile-dir> [--render]

   Exit 0 = shippable (deterministic gates pass). Exit 1 = blocked.
   When --render is used, a failed render blocks too, and the agent should
   then VIEW the PNG and confirm the register (restraint vs warmth) — the
   one check a script can't make. --render is skipped for .md artifacts
   (convert to HTML first).
   ===================================================================== */

import { execFileSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [artifact, profileDir] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const doRender = process.argv.includes('--render');
if (!artifact || !profileDir) {
  console.error('usage: node brand-qa.mjs <artifact> <profile-dir> [--render]');
  process.exit(2);
}

const run = (script, args) => {
  try {
    const out = execFileSync('node', [join(here, script), ...args], { encoding: 'utf8' });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') };
  }
};

console.log(`\n══════ BRAND QA: ${basename(artifact)}  [${basename(profileDir)}] ══════\n`);

const steps = [];
const contrast = run('contrast-check.mjs', [profileDir]);
process.stdout.write(contrast.out);
steps.push(['contrast', contrast.code]);

const lint = run('lint.mjs', [artifact, profileDir]);
process.stdout.write(lint.out);
steps.push(['lint', lint.code]);

let pngPath = null;
if (doRender && /\.md$/i.test(artifact)) {
  console.log('render skipped: .md artifacts can\'t be rendered; convert to HTML first');
} else if (doRender) {
  pngPath = resolve(artifact.replace(/\.html?$/i, '') + '.qa.png');
  // Delete any stale PNG so a leftover file can't satisfy the check.
  if (existsSync(pngPath)) unlinkSync(pngPath);
  const r = run('render.mjs', [artifact, pngPath]);
  process.stdout.write(r.out);
  const renderOk = r.code === 0 && existsSync(pngPath);
  if (!renderOk) { console.log('✗ render failed'); pngPath = null; }
  steps.push(['render', renderOk ? 0 : (r.code || 1)]);
}

const blocked = steps.filter(([, c]) => c !== 0);
console.log(`\n══════ RESULT ══════`);
for (const [name, code] of steps) console.log(`  ${code === 0 ? '✓' : '✗'} ${name}`);
if (pngPath) console.log(`  → render: ${pngPath}  (VIEW IT — confirm the register; scripts can't judge "restraint vs warmth")`);
if (blocked.length) {
  console.log(`\n✗ BLOCKED — ${blocked.map(b => b[0]).join(', ')} failed. Do not ship.`);
  process.exit(1);
}
console.log(`\n✓ Deterministic gates pass.${doRender ? ' Now confirm the render visually.' : ''}`);
