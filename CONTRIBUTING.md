# Contributing

Thanks for taking a look. This kit is small and zero-dependency on purpose. Keep it that way.

## Setup
- Node ≥ 18 (stdlib only; no `npm install`).
- Chrome/Chromium only if you want `render.mjs` to produce PNGs.

## Run the gates (what CI runs)
```bash
# Contrast: every profile must pass WCAG AA
node tooling/contrast-check.mjs profiles/northwind
node tooling/contrast-check.mjs profiles/graphite

# Token build is reproducible: regenerate, then confirm no drift
npm run build
git diff --exit-code -- 'profiles/*/brand.css' 'profiles/*/color-system.md'

# Lint: both clean samples pass, the bad artifact must fail
node tooling/lint.mjs profiles/northwind/sample.html profiles/northwind   # exit 0
node tooling/lint.mjs profiles/graphite/sample.html profiles/graphite     # exit 0
node tooling/lint.mjs examples/bad.html profiles/northwind                # exit 1 (must fail, exactly)

xmllint --noout diagrams/*.svg
```

CI additionally lints every template in `templates/` against northwind and rejects any hardcoded `fill=`/`stroke=` hex in `diagrams/*.svg` (tokenize with `tooling/tokenize-svg.mjs`).

## Adding a profile
1. Copy a demo: `cp -R profiles/northwind profiles/<slug>` (or run `/brand-init`).
2. Edit `profiles/<slug>/tokens.json`. `tokens.json` is the **only** place hex lives.
3. Regenerate and verify (must pass AA):
   ```bash
   node tooling/contrast-check.mjs profiles/<slug>
   node tooling/build-tokens.mjs profiles/<slug>/tokens.json profiles/<slug>/brand.css --md profiles/<slug>/color-system.md
   ```
4. Commit `tokens.json` **and** the regenerated `brand.css` / `color-system.md` together. CI checks they're in sync.

## Rules
- Never hand-edit a generated `:root` block or palette table. Regenerate from `tokens.json`.
- Every palette must pass `contrast-check` (WCAG AA) before it merges.
- Diagrams stay token-driven (`var(--role)`); don't bake in literal hex.
- Don't add runtime dependencies.

## PRs
Keep them focused. If you change a generator, run all the gates above and confirm CI is green.
