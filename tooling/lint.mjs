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

   Taxonomy:
     MUST (✗, exit 1)  — banned words, gradients, forbidden colors (hex of
                         any length, rgb()/rgba(), named white/black),
                         foreign profile names.
     SHOULD (⚠, warn)  — off-token hex, non-token color literals (hsl(),
                         other named colors), box-shadow, accent budget,
                         straight apostrophes/quotes, "AI" as adjective.

   Exit code: 0 = clean (warnings allowed), 1 = MUST violation.
   ===================================================================== */

import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const [, , artifactPath, profileDir] = process.argv;
if (!artifactPath || !profileDir) {
  console.error('usage: node lint.mjs <artifact> <profile-dir>');
  process.exit(2);
}

// Strip HTML comments up front — instructional comments are not the artifact.
// All checks (banned words, hexes, apostrophes, …) run on the stripped source.
const raw = readFileSync(artifactPath, 'utf8');
const src = raw.replace(/<!--[\s\S]*?-->/g, '');
const tokensPath = join(profileDir, 'tokens.json');
const tokens = existsSync(tokensPath) ? JSON.parse(readFileSync(tokensPath, 'utf8')) : {};
const lintCfg = Object.fromEntries(
  Object.entries(tokens.lint || {}).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [k, v.$value])
);
// Normalize any hex to uppercase #RRGGBB: expand 3/4-digit shorthand, strip alpha.
const normHex = (h) => {
  let m = String(h).trim().replace(/^#/, '');
  if (m.length === 8) m = m.slice(0, 6);        // #rrggbbaa → drop alpha
  else if (m.length === 4) m = m.slice(0, 3);   // #rgba → drop alpha
  if (m.length === 3) m = m.split('').map(x => x + x).join('');
  return '#' + m.toUpperCase();
};

const palette = Object.entries(tokens.color || {})
  .filter(([k]) => !k.startsWith('$'))
  .map(([, v]) => normHex(v.$value));

// Default banned marketing-jargon words. Edit to taste, or extend per profile.
// (Kept generic on purpose — e.g. "journey" is omitted since "user journey" /
// journey maps are legitimate; add it back if your brand bans it.)
const BANNED = [
  'leverage', 'synergy', 'cutting-edge', 'bleeding-edge', 'best-in-class',
  'industry-leading', 'world-class', 'robust', 'seamless', 'holistic',
  'paradigm', 'disruptive', 'disruption', 'empower', 'revolutionize',
  'next-generation', 'ai-powered', 'intelligent automation', 'digital transformation',
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

// --- color hygiene ---
// Strip numeric character references (&#8212; / &#x2014;) so entity codes
// never read as hex values, then match 3/4/6/8-digit hex.
const colorSrc = src.replace(/&#\d+;|&#x[0-9a-fA-F]+;/g, '');
const HEX_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const hexes = [...colorSrc.matchAll(HEX_RE)].map(m => normHex(m[0]));

// rgb()/rgba() integer literals → hex, treated like any other hex below.
const RGB_RE = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)/gi;
const rgbHexes = [...colorSrc.matchAll(RGB_RE)].map(m =>
  '#' + [m[1], m[2], m[3]].map(c => Math.min(255, +c).toString(16).padStart(2, '0')).join('').toUpperCase());

// Named white/black used as color values (CSS contexts only, so prose is safe).
const cssChunks = [
  ...[...colorSrc.matchAll(/<style[\s\S]*?<\/style>/gi)].map(m => m[0]),
  ...[...colorSrc.matchAll(/style\s*=\s*"([^"]*)"/gi)].map(m => m[1]),
  ...[...colorSrc.matchAll(/style\s*=\s*'([^']*)'/gi)].map(m => m[1]),
];
const css = cssChunks.join('\n');
const namedHexes = [];
for (const m of css.matchAll(/[:\s(,]\b(white|black)\b\s*(?=[;,)}\s!]|$)/gim)) {
  namedHexes.push(m[1].toLowerCase() === 'white' ? '#FFFFFF' : '#000000');
}

// Forbidden colors (MUST) — hex of any length, rgb/rgba, named white/black,
// all normalized before comparison.
const allColorHexes = [...hexes, ...rgbHexes, ...namedHexes];
const forbidden = [...new Set(
  [...(lintCfg['forbidden-bg'] || []), ...(lintCfg['forbidden-text'] || [])].map(normHex))];
for (const f of forbidden) {
  must(allColorHexes.includes(f), `forbidden color ${f} (off-system — use a token)`);
}

// Off-token hex (SHOULD — may be intentional one-offs like header bg tints).
// #fff/#ffffff and #000/#000000 are whitelisted equivalently via normalization.
if (palette.length) {
  const stray = [...new Set([...hexes, ...rgbHexes])]
    .filter(h => !palette.includes(h) && !['#FFFFFF', '#000000'].includes(h));
  should(stray.length > 0, `${stray.length} hex value(s) not in token palette: ${stray.slice(0, 6).join(', ')}${stray.length > 6 ? '…' : ''} (move to tokens.json or confirm intentional)`);
}

// Non-token color literals (SHOULD) — hsl()/hsla() and other CSS named colors.
const hslHits = colorSrc.match(/\bhsla?\(/gi);
should(Boolean(hslHits), `non-token color literal: hsl()/hsla() ×${hslHits ? hslHits.length : 0} (use a token)`);
const OTHER_NAMED = ['red', 'blue', 'green', 'gray', 'grey', 'orange', 'purple', 'yellow',
  'pink', 'brown', 'cyan', 'magenta', 'silver', 'gold', 'navy', 'teal', 'maroon',
  'olive', 'lime', 'aqua', 'fuchsia', 'crimson', 'indigo', 'violet', 'salmon', 'coral'];
const namedOther = [...new Set(
  [...css.matchAll(new RegExp(`[:\\s(,]\\b(${OTHER_NAMED.join('|')})\\b\\s*(?=[;,)}\\s!]|$)`, 'gim'))]
    .map(m => m[1].toLowerCase()))];
should(namedOther.length > 0, `non-token color literal: named color(s) ${namedOther.join(', ')} (use a token)`);

// --- accent budget (SHOULD) — distinct accent-family colors used in the artifact ---
// "accent", "accent-2", … count; "accent-on-dark"/"accent-light" are variants, not extra accents.
const maxAccents = lintCfg['max-accents'];
if (typeof maxAccents === 'number') {
  const colorTok = tokens.color || {};
  const accentNames = Object.keys(colorTok).filter(k => /^accent(-\d+)?$/.test(k));
  const used = accentNames.filter(n =>
    src.includes(`var(--${n})`) || hexes.includes(normHex(colorTok[n].$value)));
  should(used.length > maxAccents,
    `uses ${used.length} accent colors (${used.join(', ')}) — budget is ${maxAccents}`);
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
// Per-occurrence: a curly &rsquo; elsewhere does NOT excuse straight apostrophes.
const aposHits = (prose.replace(/&[a-z]+;|&#\w+;/gi, '').match(/(?<![:/])\b\w+'\w+/g) || []);
should(aposHits.length > 0, `straight apostrophe in prose ×${aposHits.length} (use &rsquo;)`);

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
