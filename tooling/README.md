# tooling/

The executable half of the kit. Zero dependencies — Node ≥18 stdlib only. All scripts read a profile's `tokens.json` as the source of truth.

| Script | Job |
|---|---|
| `build-tokens.mjs` | `tokens.json` → CSS `:root` block **and** (`--md`) a Markdown palette table. The generated blocks live between AUTO-GENERATED markers; everything else in the target file is preserved. |
| `contrast-check.mjs` | WCAG 2.1 AA for the profile's foreground/background pairings, computed from `tokens.json`. Exit 1 if any text/large pairing fails. Mode-aware (an `emphasis` doc token is tested on a light bg, not the dark default). |
| `lint.mjs` | Gate one artifact: banned marketing words, gradients, box-shadow, off-token / forbidden hex, and foreign brand-name leakage. Exit 1 on a MUST violation. Reads `company-name` / `forbidden-*` / `foreign-names` from the profile's `tokens.json` (`lint` group). |
| `render.mjs` | Rasterize an HTML artifact to PNG via headless Chrome (set `CHROME_PATH` if not auto-found) for a visual eye-test. |
| `brand-qa.mjs` | One command: `contrast-check` + `lint` (+ optional `--render`). The gate a producing step should call before shipping. |
| `tokenize-svg.mjs` | Convert a hardcoded-hex SVG to `var(--role)` and (re)inject a palette `:root`. With `--palette <profile>/tokens.json`, re-skins to that brand. |

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
```

## Rules
- Run every command from the **repo root** (paths above are repo-relative).
- `tokens.json` is the only place hex lives. Never hand-edit a generated `:root` block or palette table — regenerate.
- Always pass an explicit output path to `tokenize-svg.mjs`; with no out path it rewrites the input in place.
