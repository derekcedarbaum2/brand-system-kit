# Lint Rules

What `tooling/lint.mjs` enforces, plus the human checks a script can't make. Run the gate before shipping any artifact:

```
node tooling/lint.mjs <artifact>.html profiles/<name>     # exit 1 = a MUST failed
node tooling/brand-qa.mjs <artifact>.html profiles/<name> --render   # contrast + lint + preview
```

HTML comments are stripped before every check. Instructional comments are not the artifact, so a banned word or hex inside `<!-- -->` never trips a rule. Code and `<pre>` blocks are likewise exempt from the word rules.

## MUST: `lint.mjs`, exit 1

- **Banned words.** The list lives in the `BANNED` array in `tooling/lint.mjs` (leverage, synergy, cutting-edge, world-class, robust, seamless, holistic, disruptive, empower, revolutionize, next-generation, ai-powered, intelligent automation, digital transformation...). Edit that array to fit your brand, and keep `voice-and-tone.md` in sync with it.
- **Gradients.** `linear-gradient` / `radial-gradient` / `conic-gradient` block. Flat fills only.
- **Forbidden colors.** Each profile's `lint.forbidden-bg` / `forbidden-text` (e.g. pure `#FFFFFF` / `#000000` for a warm-neutral brand). Matched in every spelling: hex of any length (3/4/6/8-digit, alpha stripped), `rgb()` / `rgba()` literals, and named `white` / `black` in CSS contexts.
- **Foreign profile names.** Names in a profile's `lint.foreign-names` (your *other* profiles) must not appear in this profile's artifact.

## SHOULD: `lint.mjs`, warnings

Fix unless justified; warnings don't block the exit code.

- **Off-token hex.** Hex values not in the profile palette. Move them into `tokens.json` or confirm they're intentional one-offs.
- **Non-token color literals.** `hsl()` / `hsla()` and CSS named colors other than white/black. Use a token.
- **Box-shadow.** Allowed only for screen-preview page elevation, never on content components (cards, callouts).
- **Accent budget.** More distinct accent-family colors (`--accent`, `--accent-2`, ...) than the profile's `lint.max-accents`.
- **Typographic hygiene.** Straight apostrophes and double-hyphens in prose. Use `&rsquo;` and `&mdash;`.
- **"AI" as adjective.** "AI-powered / AI-driven / AI-enabled / AI-first" gets flagged. Make AI the subject of a concrete sentence, not a modifier on a buzzword.

## Human checks: render, then look

Run with `--render`, then read the output yourself.

- Headlines are assertions, not labels ("Onboarding got faster", not "Onboarding Analysis").
- The artifact reads in the brand's **register** (restraint vs. warmth, see `identity.md`). A script can't judge the register; you must.
- `--emphasis` used at most once per section, on one decisive figure.
- Every text/large color pairing passes WCAG AA. Verify with `tooling/contrast-check.mjs` (it's computed; see `accessibility.md`).
- Real semantic HTML (`<h1>`, `<a>`, `<button>`), alt text on images, a visible focus state, no meaning conveyed by color alone.

## When a MUST fails
Don't ship. Fix the violation and re-run. If a rule genuinely doesn't apply to this artifact, note why; don't silently skip.
