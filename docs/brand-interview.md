# Style interview: scaffold a profile (any agent)

A tool-agnostic guide for an AI agent (Codex, Cursor, Claude Code, and the rest) to interview a user and stand up a complete style profile for this kit. The Claude Code `/brand-init` skill is a thin wrapper around this file. Codex and other agents should follow it directly.

> **Working directory:** run every `node tooling/...` command from the cloned **brand-system-kit repo root** (where `tooling/`, `profiles/`, `diagrams/` live).

## The one idea (say this once, up front)

> **Match the visual register to your reader.**

Two kinds of reader judge a document by opposite signals. A **technical or expert reviewer** (engineers, evaluators, program reviews) reads polish as salesy, so they trust *restraint*: near-black, no extra color, mono labels, the work speaking for itself. An **executive, stakeholder, or customer** reads a cold, dense page as hard to trust, so they trust *warmth*: light background, serif headlines, one editorial accent. **The register is a consequence of the reader, not a taste call.** Settle the reader first, and almost everything else follows.

## How to interview (the method)

You are working the user toward a complete, coherent style, not running a fixed form.

1. **One question at a time.** Ask, wait, then ask the next. Never dump the whole tree at once. (Claude Code: use AskUserQuestion for the structured choices.)
2. **Always lead with your recommended answer and why.** Once you know the reader and register, most downstream choices have an obvious default. Phrase each question so the user can confirm in one word: *"For a restraint style I'd default the background to near-black `#0B0E14`. Keep it, or go lighter?"*
3. **Resolve dependencies in order.** Each answer constrains the next. Don't ask about accents before the register, or contrast fixes before a palette exists.
4. **Derive, don't interrogate.** If the register plus one accent imply a sensible value, propose it and move on. Stop to ask only when the choice is genuinely the user's (style name, the one accent hue, anything you can't infer).
5. **Adapt.** Follow a surprising answer down its branch. A reader who skews technical but wants a warm palette is a real signal. Explore the tension, don't override it.
6. **Know when you're done.** You have enough when you can fill **every** field of `tokens.json` (all `color` roles, the three `fontFamily` roles, `ratio`, and the whole `lint` group) with a value you can defend. Not before.

## The decision tree (walk it top to bottom)

Recommended defaults in parentheses.

1. **Reader & what they distrust** (open): who reads these documents, and what makes a document read as wrong to them? Sets the register.
2. **Register** (derive from #1, confirm): restraint or warmth. State the consequence.
3. **Slug + identity** (open): style name becomes `profiles/<slug>/`; URL; contact; optional tagline or wordmark.
4. **Default surface** (restraint goes dark `#0B0E14`; warmth goes light off-white like `#FBFAF7`, never pure white).
5. **Primary accent**: ask the *feel* in a word, propose one or two concrete hexes (warmth: rust, teal, amber; restraint: slate, silver, graphite). The one color you truly need from them.
6. **Secondary accent `--accent-2`** (warmth: a complementary hue for data-viz or alt callouts; restraint: a dimmer shade of the primary, since restraint uses no second color).
7. **Accent on dark `--accent-on-dark`** (derive, confirm): the accent's variant for dark panels. This is a contrast-checked pairing (4.5 against `bg-dark`: the shipped CSS uses it at 9px mono-label sizes, which is small text under WCAG, not large), so derive it, don't skip it. Warmth: brighten the primary accent until it clears the dark panel (Northwind lifts teal `#1F6E7A` to `#5FB3BF`). Restraint: often the same value as `accent`, since the page is already dark.
8. **Emphasis `--emphasis`** (a single reserved figure color, usually a muted red or oxblood; one per section, never decorative). It's a document-mode color: `contrast-check` tests it against `bg-doc` when the profile defines one (Northwind sets `bg-doc` to its paper value), else against `#ffffff`. Define `bg-doc` for light registers so emphasis is checked on the real page color.
9. **Neutrals** (derive, confirm as a set): `text-primary` (near-black or near-white, never pure), `text-body`, `text-secondary`, `text-dim`, `border`, `bg-card`, `bg-dark` plus `text-on-dark`. Propose the full ramp; ask only to nudge.
10. **Typography**: headline family (serif reads as firm and editorial; neo-grotesque sans reads as product and tech, so a serif headline reads as established rather than a software product), body (an Inter-class sans), labels (a monospace).
11. **`ratio` group** (derive, never ask): declared surface-area intent as `bg-pct` / `card-pct` / `accent-pct`. Per-register defaults: warmth 80/15/5 (Northwind's values), restraint 70/20/10 (Graphite's). Nothing in the tooling consumes `ratio` yet; it's declarative intent for whoever reads the profile, so the defaults are fine unless the user objects.
12. **lint guardrails**: `max-accents` (warmth 2, restraint 1), `forbidden-bg` and `forbidden-text` (warm styles forbid pure `#FFFFFF` and `#000000`), and `foreign-names`: the kit's demo names (`"Northwind"`, `"Graphite"`) plus the user's *other* style names, so one style's copy never leaks into another's document. The demo names are mandatory, because every new profile starts life as a copy of a demo.

If an answer is already implied by an earlier one, state your assumption and skip the question.

## After the interview: build, verify, ship

1. **Write `profiles/<slug>/tokens.json`**, modeled on `profiles/northwind/tokens.json` (warmth) or `profiles/graphite/tokens.json` (restraint). Fill the full `color` role set (including `accent-on-dark`, and `bg-doc` for light registers), three `fontFamily` roles, `ratio`, and the `lint` group.
2. **Pass WCAG AA, iterate until clean:**
   ```
   node tooling/contrast-check.mjs profiles/<slug>
   ```
   For any failing text or large pairing, darken or lighten that token and re-run. Never hand over an inaccessible palette.
3. **Copy the register-matched demo, then generate.** The component layers are register-specific, not generic: Northwind's `brand.css` sets serif headlines and an italic serif pull quote; Graphite's is all-sans with a mono wordmark and a dark doc-header. Copy the pair that matches the chosen register:
   - warmth: `profiles/northwind/brand.css` + `profiles/northwind/sample.html`
   - restraint: `profiles/graphite/brand.css` + `profiles/graphite/sample.html`

   Then regenerate the `:root` block and palette table:
   ```
   node tooling/build-tokens.mjs profiles/<slug>/tokens.json profiles/<slug>/brand.css --md profiles/<slug>/color-system.md
   ```
   Also update the Google Fonts `@import` at the top of `brand.css` by hand. Only the `:root` block regenerates; the `@import` is hand-maintained, and if it doesn't load the chosen families the render silently falls back to system fonts.
4. **Retheme the sample, render, run the register eye-test.** Replace every demo string in the copied `sample.html` (title, wordmark, prose, footer), then:
   ```
   node tooling/render.mjs profiles/<slug>/sample.html
   ```
   View the PNG and check all five:
   1. Background matches the register (light paper for warmth, near-black for restraint)?
   2. Headline family matches the register (serif = warmth, sans = restraint)?
   3. Accent count within the `max-accents` budget?
   4. Wordmark and all prose carry the new brand, with zero "Northwind" or "Graphite" leakage?
   5. At most one emphasis figure per visible section?

   Fix and re-render on any miss, capped at 3 render iterations; past that, report the remaining concerns to the user instead of looping. Note that `render.mjs` captures only the first viewport (816×1056 by default, `--width`/`--height` to change); for a scroll-length sample pass a taller `--height` or render it section by section.
5. **Gate it (mandatory):**
   ```
   node tooling/brand-qa.mjs profiles/<slug>/sample.html profiles/<slug> --render
   ```
   This runs contrast-check plus lint (the name-leakage gate that catches leftover demo copy) and produces a fresh `.qa.png`. **Exit 0 is required before you report done.** Non-zero means fix the reported violations and re-run.
6. **Report:** the profile path, the contrast and brand-qa results, and one line on why this register fits the reader.

## Rules
- Register is derived from the reader. Never let the user pick a palette before naming who it's for.
- Every palette passes `contrast-check` before you call it done.
- `tokens.json` is the source of truth. Never hand-edit a generated `:root` block or palette table; regenerate.
- `--emphasis` is for one decisive figure per section. Never decorative.
