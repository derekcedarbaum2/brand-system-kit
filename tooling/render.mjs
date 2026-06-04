#!/usr/bin/env node
/* =====================================================================
   render.mjs — rasterize an HTML artifact to PNG via headless Chrome,
   so an agent can SEE the output and critique it against the brand.
   The missing half of the loop: lint.mjs reads the source, this lets
   vision read the pixels (color drift, spacing, hierarchy, "does it
   read as advisor or vendor").

   Usage:
     node render.mjs <artifact.html> [out.png] [--width N] [--height N]

   Defaults to letter width (816px = 8.5in @96dpi). Captures the first
   viewport-height of the page — for multi-page docs, raise --height or
   render sections separately. For print fidelity use --print-to-pdf
   (see the brief/one-pager skills); this is for fast visual critique.
   ===================================================================== */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';

// Find a Chrome/Chromium binary. Override with CHROME_PATH env var.
function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',           // macOS
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', // Linux
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',               // Windows
  ];
  return candidates.find(p => { try { return existsSync(p); } catch { return false; } });
}
const CHROME = findChrome();

const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('--'));
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};

const input = positional[0];
if (!input) { console.error('usage: node render.mjs <artifact.html> [out.png] [--width N] [--height N]'); process.exit(2); }
if (!CHROME) { console.error('Chrome/Chromium not found. Set CHROME_PATH to its binary.'); process.exit(3); }

const inPath = resolve(input);
const outPath = resolve(positional[1] || inPath.replace(/\.html?$/i, '') + '.png');
const width = flag('width', '816');
const height = flag('height', '1056');

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=2',          // crisp text for vision critique
  `--window-size=${width},${height}`,
  `--screenshot=${outPath}`,
  `file://${inPath}`,
], { stdio: 'ignore' });

if (!existsSync(outPath)) { console.error('render failed — no PNG produced'); process.exit(1); }
console.log(`✓ rendered ${basename(inPath)} → ${outPath}  (${width}×${height} @2x)`);
