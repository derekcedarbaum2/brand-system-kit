# Lint Rules

What `tooling/lint.mjs` enforces, plus the human checks a script can't make. Run the gate before shipping any artifact:

```
node tooling/lint.mjs <artifact>.html profiles/<name>     # exit 1 = a MUST failed
node tooling/brand-qa.mjs <artifact>.html profiles/<name> --render   # contrast + lint + preview
```

## MUST — enforced by `lint.mjs` (exit 1 on any violation)

- **No banned marketing-jargon words.** The list lives in the `BANNED` array in `tooling/lint.mjs` (leverage, synergy, cutting-edge, world-class, robust, seamless, holistic, disruptive, empower, revolutionize, next-generation, ai-powered, intelligent automation, digital transformation…). Edit that array to fit your brand.
- **No gradients.** `linear-gradient` / `radial-gradient` / `conic-gradient` are flagged. Flat fills only.
- **No forbidden hex.** Each profile's `lint.forbidden-bg` / `forbidden-text` (e.g. pure `#FFFFFF` / `#000000` for a warm-neutral brand) must not appear.
- **No off-token hex (SHOULD-strength warning).** Hex values not in the profile palette are flagged — move them into `tokens.json` or confirm they're intentional.
- **No foreign brand-name leakage.** Names in a profile's `lint.foreign-names` (your *other* brands) must not appear in this brand's artifact.
- **Box-shadow** is allowed only for screen-preview page elevation, never on content components (warning).

## SHOULD — human / visual checks (run with `--render`, then look)

- Headlines are assertions, not labels ("Onboarding got faster" — not "Onboarding Analysis").
- The artifact reads in the brand's **register** (restraint vs. warmth — see `identity.md`). A script can't judge "advisor vs. vendor"; you must.
- `--emphasis` used at most once per section, on one decisive figure.
- Every text/large color pairing passes WCAG AA — verify with `tooling/contrast-check.mjs` (it's computed; see `accessibility.md`).
- Real semantic HTML (`<h1>`, `<a>`, `<button>`), alt text on images, a visible focus state, no meaning conveyed by color alone.
- Typographic quotes and dashes (`&mdash;`, `&rsquo;`, `&ldquo;`/`&rdquo;`), not straight quotes or `--`.

## When a MUST fails
Don't ship. Fix the violation and re-run. If a rule genuinely doesn't apply to this artifact, note why — don't silently skip.
