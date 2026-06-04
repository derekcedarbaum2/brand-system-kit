#!/usr/bin/env node
/* =====================================================================
   tokenize-svg.mjs — convert hardcoded-hex SVG diagrams into
   token-driven SVGs: maps the canonical light/document palette to
   CSS custom properties, injects a swappable <style> :root block, and
   rewrites fills/strokes to var(--…). Same diagram now renders in any
   brand's colors by swapping the injected block.

   Usage:
     node tokenize-svg.mjs <in.svg> [out.svg]      # default out = overwrite
     node tokenize-svg.mjs <in.svg> --stdout       # preview, no write
     node tokenize-svg.mjs <in.svg> --palette <profile-tokens.json>

   Idempotent. With no --palette, injects the canonical light defaults
   (renders identically to the original).

   NOTE: XML comments are masked during the hex→var pass and self-healed
   (any var(--x) left inside a comment is reverted to hex) — XML forbids
   "--" inside comments, and var(--name) contains "--", so a hex rewritten
   inside a comment would produce unparseable XML.
   ===================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';

// Source-hex → token-role map. EDIT THIS to match the hardcoded palette in YOUR
// existing SVGs, so the tool knows which literal maps to which semantic role.
// Ships with the demo "Northwind" palette + common neutrals.
const MAP = {
  '#161a19': 'ink',
  '#353b3a': 'body',
  '#5c6463': 'secondary',
  '#7e8584': 'dim',
  '#1f6e7a': 'accent',
  '#3e5c8a': 'accent-2',
  '#9a2d2d': 'emphasis',
  '#fbfaf7': 'bg',
  '#f0eee8': 'card',
  '#e3e0d8': 'border',
  // common neutrals so generic SVGs convert too:
  '#000000': 'ink', '#333333': 'body', '#666666': 'secondary',
  '#999999': 'dim', '#ffffff': 'bg', '#f5f5f5': 'card', '#e5e5e5': 'border',
};

// Role → default hex (the demo "Northwind" palette). With no --palette, an SVG
// renders on these. Covers the full role set the bundled diagrams reference.
const DEFAULTS = {
  ink: '#161a19', body: '#353b3a', secondary: '#5c6463', dim: '#6e7574',
  accent: '#1f6e7a', 'accent-light': '#cfe0e2', 'accent-2': '#3e5c8a',
  teal: '#2a7d8a', warm: '#8a6d1f', positive: '#2e7d4f', emphasis: '#9a2d2d',
  bg: '#fbfaf7', card: '#f0eee8', 'card-accent': '#e6eef0', border: '#e3e0d8',
};

const args = process.argv.slice(2);
const toStdout = args.includes('--stdout');
// Positionals = non-flag args, EXCLUDING the value that follows a value-taking
// flag like --palette. (Without this, `in.svg --palette tokens.json` would treat
// tokens.json as the output path and overwrite the profile's source of truth.)
const VALUE_FLAGS = new Set(['--palette']);
const positionals = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (VALUE_FLAGS.has(a)) { i++; continue; }   // skip the flag AND its value
  if (a.startsWith('--')) continue;             // skip valueless flags (--stdout)
  positionals.push(a);
}
const input = positionals[0];
if (!input) { console.error('usage: node tokenize-svg.mjs <in.svg> [out.svg] [--stdout] [--palette tokens.json]'); process.exit(2); }
const out = positionals[1] || input;

let svg = readFileSync(input, 'utf8');

// Build the active palette (defaults, optionally overridden by a profile tokens.json)
const palette = { ...DEFAULTS };
const pi = args.indexOf('--palette');
if (pi >= 0 && args[pi + 1]) {
  const tok = JSON.parse(readFileSync(args[pi + 1], 'utf8'));
  const c = tok.color || {};
  const pick = (k) => c[k]?.$value;
  // Map EVERY diagram role onto a profile token so a re-skin is fully coherent
  // even on a dark profile (no light leftovers). Roles a profile doesn't define
  // collapse onto its nearest core token.
  const xref = {
    ink: 'text-primary', body: 'text-body', secondary: 'text-secondary', dim: 'text-dim',
    accent: 'accent', 'accent-2': 'accent-2', teal: 'accent-2', 'accent-light': 'accent-2',
    warm: 'accent', positive: 'accent', emphasis: 'emphasis',
    bg: 'bg', card: 'bg-card', 'card-accent': 'bg-card', border: 'border',
  };
  for (const [role, profKey] of Object.entries(xref)) {
    const v = pick(profKey); if (v) palette[role] = v.toLowerCase();
  }
}

// 0. mask XML comments so the hex→var pass never touches them, and self-heal
//    any var(--x) already left inside a comment by the pre-fix tokenizer.
const SENT = '\u0001';  // control char — not present in SVG text
const comments = [];
svg = svg.replace(/<!--[\s\S]*?-->/g, (m) => {
  let fixed = m;
  for (const [name, hex] of Object.entries(DEFAULTS)) {
    fixed = fixed.replace(new RegExp(`var\\(--${name}\\)`, 'g'), hex);
  }
  comments.push(fixed);
  return `${SENT}${comments.length - 1}${SENT}`;
});

// 1. rewrite hex → var()  (comments are masked out)
let replaced = 0;
for (const [hex, name] of Object.entries(MAP)) {
  svg = svg.replace(new RegExp(hex, 'gi'), () => { replaced++; return `var(--${name})`; });
}

// restore the (now-clean) comments
svg = svg.replace(new RegExp(`${SENT}(\\d+)${SENT}`, 'g'), (_, i) => comments[+i]);

// 2. inject / replace the :root style block right after <svg ...>
const styleBlock =
  `<style>:root{\n` +
  Object.entries(palette).map(([k, v]) => `  --${k}: ${v};`).join('\n') +
  `\n}</style>`;
if (/<style>:root\{[\s\S]*?\}<\/style>/i.test(svg)) {
  svg = svg.replace(/<style>:root\{[\s\S]*?\}<\/style>/i, styleBlock);
} else {
  svg = svg.replace(/<svg\b[^>]*>/i, (m) => m + '\n' + styleBlock);
}

if (toStdout) { process.stdout.write(svg); }
else { writeFileSync(out, svg); console.log(`✓ ${input} → ${out}  (${replaced} fills tokenized)`); }
