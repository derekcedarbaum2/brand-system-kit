#!/usr/bin/env node
/* =====================================================================
   contrast-check.mjs — compute WCAG 2.1 contrast ratios for a profile's
   foreground/background token pairings, straight from tokens.json.
   Turns the static accessibility table into a deterministic gate.

   Usage:  node contrast-check.mjs <profile-dir>

   Exit 1 if any TEXT/LARGE pairing fails AA (4.5 normal / 3.0 large+UI).
   Decorative pairings (borders) are reported but never block.

   Mode-awareness: a pairing's background may be a token name OR a literal
   hex. `emphasis` is a document-mode token (used on a light page), so it
   is tested against #ffffff, never the profile's default bg (near-black
   for UL — testing there would be a context error).
   ===================================================================== */

import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node contrast-check.mjs <profile-dir>'); process.exit(2); }
const tokensPath = join(dir, 'tokens.json');
if (!existsSync(tokensPath)) { console.error(`no tokens.json in ${dir}`); process.exit(2); }
const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));
const C = Object.fromEntries(
  Object.entries(tokens.color || {}).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [k, v.$value]));

// WCAG relative luminance + contrast ratio
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (hex) => {
  const m = hex.replace('#', '');
  const n = m.length === 3 ? m.split('').map(x => x + x).join('') : m;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (fg, bg) => {
  const a = lum(fg), b = lum(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

// resolve a bg spec (token name or literal hex) to a hex value
const DOC_BG = C['bg-doc'] || '#ffffff';
const resolve = (spec) => spec.startsWith('#') ? spec : C[spec];

// Pairings: [fgToken, bgSpec, kind, note]. kind: text=4.5, large=3.0, decor=report-only
const PAIRS = [
  ['text-primary',   'bg',       'text',  'headlines / strong'],
  ['text-body',      'bg',       'text',  'body copy'],
  ['text-secondary', 'bg',       'text',  'secondary copy'],
  ['text-dim',       'bg',       'large', 'mono labels (small, de-emphasized)'],
  ['accent',         'bg',       'text',  'links / accent text'],
  ['emphasis',       DOC_BG,     'text',  'emphasis figure (document mode, light bg)'],
  ['border',         'bg',       'decor', 'hairline borders'],
  ['text-body',      'bg-card',  'text',  'body on card'],
  ['text-primary',   'bg-card',  'text',  'headline on card'],
  ['white',          'bg',       'text',  'headline on near-black (UL)'],
  ['text-on-dark',   'bg-dark',  'text',  'body on dark panel'],
  ['accent-on-dark', 'bg-dark',  'large', 'accent on dark panel'],
];

const need = { text: 4.5, large: 3.0, decor: 0 };
const rows = [], fails = [];
for (const [fg, bgSpec, kind, note] of PAIRS) {
  const fgv = C[fg], bgv = resolve(bgSpec);
  if (!fgv || !bgv) continue;
  const r = ratio(fgv, bgv);
  const pass = kind === 'decor' || r >= need[kind];
  const aaa = r >= (kind === 'text' ? 7 : 4.5);
  rows.push({ fg, bg: bgSpec.startsWith('#') ? `${bgSpec}(doc)` : bgSpec, r, req: need[kind], kind, pass, aaa, note });
  if (!pass) fails.push({ fg, bg: bgSpec, note });
}

const line = '─'.repeat(74);
console.log(line);
console.log(`contrast-check  [profile: ${basename(dir)}]`);
console.log(line);
for (const x of rows) {
  const mark = x.kind === 'decor' ? '· ' : x.pass ? (x.aaa ? '✓✓' : '✓ ') : '✗ ';
  console.log(`  ${mark} ${x.r.toFixed(2).padStart(6)} : ${x.fg} on ${x.bg}  (need ${x.req || '—'}, ${x.kind}) — ${x.note}`);
}
console.log(line);
if (fails.length) {
  console.log(`✗ ${fails.length} pairing(s) fail AA:`);
  fails.forEach(f => console.log(`   ${f.fg} on ${f.bg} — ${f.note}`));
} else {
  console.log('✓ all text/large pairings meet WCAG AA');
}
console.log(line);
process.exit(fails.length ? 1 : 0);
