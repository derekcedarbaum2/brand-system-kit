# tooling/

The executable half of the kit. Zero dependencies: Node ≥18 stdlib only. All scripts read a profile's `tokens.json` as the source of truth.

| Script | Job |
|---|---|
| `build-tokens.mjs` | `tokens.json` → CSS `:root` block **and** (`--md`) a Markdown palette table. The generated blocks live between AUTO-GENERATED markers; everything else in the target file is preserved (with no markers, the block is inserted after the first line containing "AUTO-GENERATED"). Errors out (exit 1) on a circular token reference. |
| `contrast-check.mjs` | WCAG 2.1 AA for the profile's foreground/background pairings, computed from `tokens.json`. Exit 1 if any text/large pairing fails **or if a pairing's token is missing**, printed loudly as `✗ missing token: … (pairing skipped)` so a missing token can't silently shrink the gate. Mode-aware: the `emphasis` doc token is tested against the profile's `bg-doc` token if defined, else `#ffffff`. |
| `lint.mjs` | Gate one artifact. MUST (✗, exit 1): banned marketing words, gradients, forbidden colors (hex of any length, `rgb()`/`rgba()`, named `white`/`black`), foreign profile names. SHOULD (⚠, warning only): off-token hex, non-token color literals (`hsl()`, other named colors), box-shadow, accent budget, straight apostrophes/quotes, "AI" as adjective. HTML comments are stripped before all checks. Reads `company-name` / `forbidden-*` / `foreign-names` from the profile's `tokens.json` (`lint` group). |
| `render.mjs` | Rasterize an HTML artifact to PNG via headless Chrome (set `CHROME_PATH` if not auto-found) for a visual eye-test. |
| `brand-qa.mjs` | One command: `contrast-check` + `lint` (+ optional `--render`), the gate a producing step should call before shipping. A failed render blocks (exit 1); any stale `.qa.png` is deleted before rendering. For `.md` artifacts, lint still runs but `--render` is skipped with a note: convert to HTML first. |
| `tokenize-svg.mjs` | Convert a hardcoded-hex SVG to `var(--role)` and (re)inject a palette `:root`. With `--palette <profile>/tokens.json`, re-skins to that brand. `--stdout` prints the result instead of writing (preview mode). Idempotent: a second pass reports 0 fills tokenized. |

## npm scripts

`npm run build` (regenerate every profile's `brand.css` + `color-system.md` from `tokens.json`) · `npm run contrast` (WCAG check every profile) · `npm run qa` / `npm run qa:graphite` (full brand-qa on the bundled sample artifacts, with render).

## Common commands

```bash
# generate CSS + palette table for a profile
node tooling/build-tokens.mjs profiles/<p>/tokens.json profiles/<p>/brand.css --md profiles/<p>/color-system.md

# the gate (run before shipping any artifact)
node tooling/brand-qa.mjs <artifact>.html profiles/<p> --render

# accessibility, standalone
node tooling/contrast-check.mjs profiles/<p>

# re-skin a diagram to a profile (always give an OUTPUT path)
node tooling/tokenize-svg.mjs diagrams/<name>.svg out.svg --palette profiles/<p>/tokens.json

# preview a tokenization without writing anything
node tooling/tokenize-svg.mjs diagrams/<name>.svg --stdout
```

## Rules
- Run every command from the **repo root** (paths above are repo-relative).
- `tokens.json` is the only place hex lives. Never hand-edit a generated `:root` block or palette table; regenerate instead.
- Always pass an explicit output path to `tokenize-svg.mjs` (or use `--stdout`); with no out path it rewrites the input in place.
