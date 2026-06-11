#!/usr/bin/env node
/* =====================================================================
   build-tokens.mjs — generate derived artifacts from a DTCG tokens.json.
   Zero dependencies. Node >= 18.

   Usage:
     node build-tokens.mjs <tokens.json> [target.css] [--md <doc.md>]

   - Writes a :root{} CSS block into target.css between markers.
   - With --md, writes a Markdown color table into doc.md between markers.
   Both replace only content between their markers, preserving everything
   else (hand-written CSS / prose). If markers are absent, the block is
   inserted after the first line containing "AUTO-GENERATED" (or, with no
   such line, prepended to the file).

   CSS markers:
     /* >>> AUTO-GENERATED TOKENS — do not edit by hand <<< * /  … /* >>> END AUTO-GENERATED TOKENS <<< * /
   MD markers:
     <!-- >>> AUTO-GENERATED PALETTE — do not edit by hand <<< -->  …  <!-- >>> END AUTO-GENERATED PALETTE <<< -->
   ===================================================================== */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const CSS_START = '/* >>> AUTO-GENERATED TOKENS — do not edit by hand <<< */';
const CSS_END   = '/* >>> END AUTO-GENERATED TOKENS <<< */';
const MD_START  = '<!-- >>> AUTO-GENERATED PALETTE — do not edit by hand <<< -->';
const MD_END    = '<!-- >>> END AUTO-GENERATED PALETTE <<< -->';

const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('--'));
const flagVal = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : null; };

const tokensPath = positional[0];
const cssPath = positional[1] && !positional[1].endsWith('.md') ? positional[1] : null;
const mdPath = flagVal('md');
if (!tokensPath) { console.error('usage: node build-tokens.mjs <tokens.json> [target.css] [--md <doc.md>]'); process.exit(2); }

const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function resolve(value, root, seen = new Set()) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    if (seen.has(value)) {
      console.error(`✗ circular token reference: ${[...seen, value].join(' → ')}`);
      process.exit(1);
    }
    seen.add(value);
    const path = value.slice(1, -1).split('.');
    let node = root; for (const k of path) node = node?.[k];
    return resolve(node?.$value ?? node, root, seen);
  }
  return value;
}
const fmtFont = (arr) => arr.map(f => (/\s/.test(f) ? `'${f}'` : f)).join(', ');

function replaceBlock(text, start, end, block, fallbackAnchor) {
  if (text.includes(start) && text.includes(end)) {
    // Replacement via callback: a "$&"/"$1" in a token $description must be
    // inserted literally, never interpreted as a regex replacement pattern.
    return text.replace(new RegExp(escapeRe(start) + '[\\s\\S]*?' + escapeRe(end)), () => block);
  }
  if (fallbackAnchor && text.includes(fallbackAnchor)) {
    // Insert after the first LINE containing the anchor (per the header doc).
    const lines = text.split('\n');
    const i = lines.findIndex(l => l.includes(fallbackAnchor));
    lines.splice(i + 1, 0, '', block);
    return lines.join('\n');
  }
  return block + '\n\n' + text;
}

// ---- CSS :root block ----
if (cssPath) {
  const lines = [];
  for (const [groupName, group] of Object.entries(tokens)) {
    if (groupName.startsWith('$')) continue;
    const type = group.$type;
    if (type !== 'color' && type !== 'fontFamily') continue;
    for (const [name, tok] of Object.entries(group)) {
      if (name.startsWith('$')) continue;
      let v = resolve(tok.$value, tokens);
      if (type === 'fontFamily') v = fmtFont(v);
      lines.push(`  --${type === 'fontFamily' ? 'font-' : ''}${name}: ${v};`);
    }
  }
  const block = `${CSS_START}\n:root {\n${lines.join('\n')}\n}\n${CSS_END}`;
  let css = existsSync(cssPath) ? readFileSync(cssPath, 'utf8') : '';
  css = replaceBlock(css, CSS_START, CSS_END, block, 'AUTO-GENERATED');
  writeFileSync(cssPath, css);
  console.log(`✓ ${lines.length} CSS vars → ${cssPath}`);
}

// ---- Markdown palette table ----
if (mdPath) {
  const colors = Object.entries(tokens.color || {}).filter(([k]) => !k.startsWith('$'));
  const rows = colors.map(([name, tok]) =>
    `| \`--${name}\` | \`${resolve(tok.$value, tokens)}\` | ${(tok.$description || '').replace(/\|/g, '\\|')} |`);
  const table = `${MD_START}\n` +
    `<!-- regenerate: node tooling/build-tokens.mjs ${tokensPath} --md ${mdPath} -->\n\n` +
    `| Token | Hex | Usage |\n|---|---|---|\n${rows.join('\n')}\n\n` +
    `${MD_END}`;
  let md = existsSync(mdPath) ? readFileSync(mdPath, 'utf8') : '';
  md = replaceBlock(md, MD_START, MD_END, table, 'AUTO-GENERATED');
  writeFileSync(mdPath, md);
  console.log(`✓ ${colors.length}-row palette table → ${mdPath}`);
}

if (!cssPath && !mdPath) console.error('nothing to do: pass a target.css and/or --md <doc.md>');
