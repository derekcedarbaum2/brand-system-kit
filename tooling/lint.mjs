#!/usr/bin/env node
/* =====================================================================
   lint.mjs — executable brand gate for HTML / Markdown artifacts.
   Zero dependencies. Node >= 18.

   Usage:
     node lint.mjs <artifact.html|.md> <profile-dir>

   <profile-dir> must contain tokens.json (DTCG). The profile's lint
   constants live under the "lint" group of that file. Shared rules
   (banned words, gradients, pure black/white, typographic hygiene)
   are defined here; profile rules come from tokens.json.

   Exit code: 0 = clean (warnings allowed), 1 = MUST violation.
   ===================================================================== */

import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const [, , artifactPath, profileDir] = process.argv;
if (!artifactPath || !profileDir) {
  console.error('usage: node lint.mjs <artifact> <profile-dir>');
  process.exit(2);
}

const src = readFileSync(artifactPath, 'utf8');
const tokensPath = join(profileDir, 'tokens.json');
const tokens = existsSync(tokensPath) ? JSON.parse(readFileSync(tokensPath, 'utf8')) : {};
const lintCfg = Object.fromEntries(
  Object.entries(tokens.lint || {}).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [k, v.$value])
);
const palette = Object.entries(tokens.color || {})
  .filter(([k]) => !k.startsWith('$'))
  .map(([, v]) => String(v.$value).toLowerCase());

// Universal banned words (UL-agnostic — positioning words live in profile)
const BANNED = [
  'leverage', 'synergy', 'cutting-edge', 'bleeding-edge', 'best-in-class',
  'industry-leading', 'world-class', 'robust', 'seamless', 'holistic',
  'paradigm', 'disruptive', 'disruption', 'empower', 'unlock', 'revolutionize',
  'next-generation', 'ai-powered', 'intelligent automation', 'digital transformation',
  'journey', 'partner with you'
];

const musts = [];
const shoulds = [];
const must = (cond, msg) => { if (cond) musts.push(msg); };
const should = (cond, msg) => { if (cond) shoulds.push(msg); };

// --- strip code/pre so flow diagrams & sample data don't trip word rules ---
const prose = src
  .replace(/<pre[\s\S]*?<\/pre>/gi, '')
  .replace(/<code[\s\S]*?<\/code>/gi, '')
  .replace(/```[\s\S]*?```/g, '');

// --- banned words (MUST) ---
for (const w of BANNED) {
  const re = new RegExp(`\\b${w.replace(/[-\s]/g, '[-\\s]')}\\b`, 'gi');
  const hits = prose.match(re);
  if (hits) must(true, `banned word "${w}" ×${hits.length}`);
}

// --- gradients / shadows (MUST) ---
must(/linear-gradient|radial-gradient|conic-gradient/i.test(src), 'gradient detected (flat fills only)');
// box-shadow is a SHOULD: screen-preview page elevation is allowed (see anti-patterns.md);
// shadows on content components (cards, callouts) are the real smell.
should(/\bbox-shadow\s*:(?!\s*none)/i.test(src), 'box-shadow present — allowed only for screen-preview page elevation, never on content components');

// --- hex hygiene (MUST) ---
const hexes = [...src.matchAll(/#[0-9a-fA-F]{3,6}\b/g)].map(m => m[0].toLowerCase());
const forbiddenBg = (lintCfg['forbidden-bg'] || []).map(s => s.toLowerCase());
const forbiddenText = (lintCfg['forbidden-text'] || []).map(s => s.toLowerCase());
for (const f of [...forbiddenBg, ...forbiddenText]) {
  must(hexes.includes(f), `forbidden hex ${f} (off-system — use a token)`);
}
// hexes not in palette (SHOULD — may be intentional one-offs like header bg tints)
if (palette.length) {
  const stray = [...new Set(hexes)].filter(h => !palette.includes(h) && !['#fff', '#000'].includes(h));
  should(stray.length > 0, `${stray.length} hex value(s) not in token palette: ${stray.slice(0, 6).join(', ')}${stray.length > 6 ? '…' : ''} (move to tokens.json or confirm intentional)`);
}

// --- foreign brand-name leakage (MUST) ---
// Names come from this profile's tokens.json: lint["foreign-names"] = ["Other Brand", ...]
// (the names of your OTHER profiles, so one brand's copy never leaks into another's artifact).
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const o of (lintCfg['foreign-names'] || [])) {
  must(new RegExp(esc(o), 'i').test(prose), `foreign brand name "${o}" in a ${lintCfg['company-name'] || 'this'} artifact`);
}

// --- typographic hygiene (SHOULD) ---
should(/\s--\s/.test(prose), 'double-hyphen "--" in prose (use &mdash;)');
should(/(?<![:/])\b\w+'\w+/.test(prose.replace(/&[a-z]+;/g, '')) && !/&rsquo;/.test(src),
       'straight apostrophe in prose (use &rsquo;)');

// --- "AI" as adjective (SHOULD, profile-flavored) ---
should(/\bAI-(powered|driven|enabled|first)\b/i.test(prose), '"AI" used as an adjective (make AI the subject)');

// --- report ---
const name = basename(artifactPath);
const line = '─'.repeat(48);
console.log(line);
console.log(`brand-lint: ${name}  [profile: ${lintCfg['company-name'] || basename(profileDir)}]`);
console.log(line);
if (!musts.length && !shoulds.length) {
  console.log('✓ clean — no violations');
} else {
  if (musts.length) {
    console.log(`\n✗ MUST (${musts.length}) — blocks ship:`);
    musts.forEach(m => console.log(`   ✗ ${m}`));
  }
  if (shoulds.length) {
    console.log(`\n⚠ SHOULD (${shoulds.length}) — fix unless justified:`);
    shoulds.forEach(s => console.log(`   ⚠ ${s}`));
  }
}
console.log(line);
process.exit(musts.length ? 1 : 0);
