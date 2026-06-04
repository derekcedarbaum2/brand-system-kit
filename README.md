# brand-system-kit

[![CI](https://github.com/derekcedarbaum2/brand-system-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/derekcedarbaum2/brand-system-kit/actions/workflows/ci.yml)
&nbsp;![Node ≥18](https://img.shields.io/badge/node-%E2%89%A518-3E5C8A)
&nbsp;![License: MIT](https://img.shields.io/badge/license-MIT-1F6E7A)

An **executable** brand system. Most brand guidelines are a PDF nobody enforces. This is the opposite: a token source-of-truth, a lint gate that blocks off-brand output, a WCAG checker, and a visual-critique loop — all zero-dependency Node, plus a Claude Code skill that interviews you and scaffolds your own brand in minutes.

It ships with two demo brands — **Northwind** (warmth register) and **Graphite** (restraint register) — so the whole pipeline runs the moment you clone it, and you see both halves of the thesis. Replace them with yours.

## Preview

Same kit, two registers. Left: Northwind (warmth — light, serif, editorial accent). Right: Graphite (restraint — near-black, no brand color, mono labels).

| Northwind (warmth) | Graphite (restraint) |
|---|---|
| ![Northwind sample](docs/sample-northwind.png) | ![Graphite sample](docs/sample-graphite.png) |

One diagram, re-skinned to each brand by swapping the token profile — nothing hand-edited:

| `--palette northwind` | `--palette graphite` |
|---|---|
| ![Persona, Northwind](docs/diagram-northwind.png) | ![Persona, Graphite](docs/diagram-graphite.png) |

> This is the *bones*, not a brand. There's no "right" palette here — the kit is the machine that makes any brand consistent and enforceable.

> **Using an AI agent to set this up?** Point it at [`AGENTS.md`](AGENTS.md) — step-by-step install, verification, and "scaffold a brand" instructions written to be followed literally.

---

## The one idea

> **Match the visual register to the buyer's trust model.**

One philosophy, two registers, because two buyers grant trust for opposite reasons:

| Register | Buyer | Distrusts | Trust comes from |
|---|---|---|---|
| **Restraint** | Technical operator | Polish, hype, salesmanship | Near-black, no brand color, mono labels — "we're not selling you" |
| **Warmth** | Non-technical exec | Hackers, vendors, "AI" hand-waving | Light, serif headlines, one editorial accent — "advisor, not vendor" |

Restraint and warmth aren't opposite philosophies — they're the same discipline (argument first, evidence over decoration, hierarchy through restraint) aimed at different fears. If you sell to more than one kind of buyer, you need more than one register — which is why the kit is multi-profile.

---

## Architecture: generic core + profiles

```
brand-system-kit/
  system/                  # the bones — the brand-system guides (generic)
    identity.md            #   philosophy + the meta-thesis (register ↔ trust model)
    typography.md  components.md  spacing.md  motion.md
    color-system.md  tokens-screen.md  tokens-print.md  tokens-email.md
    voice-and-tone.md  anti-patterns.md  lint-rules.md  imagery.md
    data-viz.md  slide-layouts.md  accessibility.md  medium-guide.md  README.md
  tooling/                 # the executable system (zero-dep Node ≥18)
    build-tokens.mjs       #   tokens.json → CSS :root block + Markdown palette table
    contrast-check.mjs     #   WCAG 2.1 AA, computed from tokens.json (mode-aware)
    lint.mjs               #   gate an artifact: banned words, off-token hex, gradients, name leakage
    render.mjs             #   HTML → PNG (headless Chrome) for visual critique
    brand-qa.mjs           #   one command: contrast + lint + optional render
    tokenize-svg.mjs       #   hardcoded-hex SVG → var()-driven, re-skinnable per profile
  profiles/
    northwind/             # DEMO brand (invented). Your brands become siblings here.
      tokens.json          #   the single source of truth
      brand.css  color-system.md  sample.html   # all generated/derived
  diagrams/                # 37 token-driven SVG templates (re-skin to any profile)
  skill/brand-init/        # Claude Code skill: interview → scaffold a new profile
  examples/bad.html        # an artifact full of violations, to see the linter bite
```

`system/` is the prose framework (read these to understand the *why*); `tooling/` enforces it; `profiles/` are the brands; `diagrams/` are ready-to-skin templates.

Each brand is a **profile** = one `tokens.json`. The tooling is venture-agnostic; it never hard-codes a palette.

---

## Quickstart

```bash
# 1. Check the demo palette is accessible (it is)
node tooling/contrast-check.mjs profiles/northwind

# 2. Generate CSS + palette table from the tokens
node tooling/build-tokens.mjs profiles/northwind/tokens.json profiles/northwind/brand.css --md profiles/northwind/color-system.md

# 3. Gate an artifact (contrast + lint), and render it for the eye test
node tooling/brand-qa.mjs profiles/northwind/sample.html profiles/northwind --render

# 4. See the linter bite
node tooling/lint.mjs examples/bad.html profiles/northwind   # exits 1
```

`render.mjs` needs Chrome/Chromium; set `CHROME_PATH` if it isn't auto-found.

---

## Make your own

Two ways:

- **With Claude Code:** drop `skill/brand-init/` into `~/.claude/skills/` and run `/brand-init`. It interviews you (audience → register → palette → fonts → name), writes a valid `tokens.json`, iterates until it passes WCAG AA, generates the CSS, and renders a sample.
- **By hand:** copy `profiles/northwind/` to `profiles/<your-brand>/`, edit `tokens.json`, re-run steps 1–3 above.

Then wire `brand-qa.mjs` into whatever produces your artifacts (a docs build, a deck generator, a CI step) so nothing ships ungated.

---

## Design tokens

Tokens are [DTCG format](https://www.designtokens.org/) (W3C Design Tokens, first stable spec). `tokens.json` is the only place hex lives — CSS and docs are generated from it, so they can't drift. The `lint` group carries non-visual constants (brand name, forbidden hexes, accent budget, foreign-name list) that the gate reads.

## What it deliberately doesn't do

No design opinions beyond "be consistent and accessible." No fonts bundled (loaded from Google Fonts in the demo CSS — swap freely). No framework. It's plumbing.

## License

MIT — see [LICENSE](LICENSE).
