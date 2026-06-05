---
name: brand-init
description: Interview the user end-to-end and scaffold a complete brand profile for brand-system-kit — a DTCG tokens.json, generated CSS + palette table, a passing WCAG-AA check, and a rendered sample. Grills one question at a time (each with a recommended answer), walking the design-decision tree from audience down to every token, then builds and verifies. Trigger phrases: "brand init", "scaffold a brand", "new brand profile", "/brand-init".
---

# brand-init — interview, then scaffold a brand

Builds one profile for brand-system-kit: an executable, single-source-of-truth brand. Output: `profiles/<slug>/` with a `tokens.json`, generated `brand.css` + `color-system.md`, and a rendered sample PNG that passes the gate.

> **Working directory:** run every `node tooling/...` command from the cloned **brand-system-kit repo root** (where `tooling/`, `profiles/`, `diagrams/` live). If the kit isn't cloned yet, clone it first (see `AGENTS.md`).

## The one idea (say this once, up front)

> **Match the visual register to the buyer's trust model.**

Two buyers grant trust for opposite reasons. A **technical buyer who distrusts polish** trusts *restraint* — near-black, no brand color, mono labels ("we're not selling you"). A **non-technical buyer who distrusts hype** trusts *warmth* — light, serif headlines, one editorial accent ("advisor, not vendor"). **The register is a consequence of the audience, not a taste call.** So we settle the audience first; almost everything else follows from it.

---

## How to interview (the method)

You are grilling the user toward a complete, coherent brand — not running a fixed form. Follow these rules:

1. **One question at a time.** Use AskUserQuestion for structured choices, plain prose for open ones. Never batch the whole tree.
2. **Always lead with your recommended answer and why.** You've already learned the audience and register; most downstream choices have an obvious default. Phrase questions so the user can confirm in one tap: *"For a restraint brand I'd default the background to near-black `#0B0E14`. Keep it, or go lighter?"*
3. **Resolve dependencies in order.** Each answer constrains the next. Don't ask about accents before the register; don't ask about contrast fixes before the palette exists.
4. **Derive, don't interrogate.** If the register + one accent decide a sensible value for a neutral or a font, propose it and move on — only stop to ask when a choice is genuinely the user's (brand name, the one accent hue, anything you can't infer).
5. **Adapt.** Follow a surprising answer down its branch (a "technical buyer" who insists on a warm palette is a real signal — explore the tension, don't override it).
6. **Know when you're done.** You have enough when you can fill **every** field of `tokens.json` — all `color` roles, the three `fontFamily` roles, `ratio`, and the whole `lint` group — with a value you can defend. Not before.

---

## The decision tree (walk it top to bottom)

Settle each node before the ones that depend on it. Recommended defaults in parentheses.

**1. Audience & their distrust** (open) — Who reads these artifacts, and what makes them suspicious of a vendor? This single answer sets the register.

**2. Register** (derive from #1; confirm) — Restraint or warmth. State the consequence as you confirm.

**3. Slug + identity** (open) — Brand name → `profiles/<slug>/`. URL, contact. Optional tagline/wordmark.

**4. Default surface** (restraint → dark `#0B0E14`; warmth → light off-white like `#FBFAF7`, never pure white).

**5. Primary accent** — ask for the *feel* in a word, propose 1–2 concrete hexes (warmth → rust/teal/amber; restraint → slate/silver/graphite). This is the one color you genuinely need from them.

**6. Secondary accent `--accent-2`** (warmth → a complementary hue for data-viz / alt callouts; restraint → a dimmer shade of the primary — restraint uses no second brand color).

**7. Emphasis `--emphasis`** (a single reserved figure color — usually a muted red/oxblood; used once per section, never decorative). Tested on a light document background regardless of register.

**8. Neutrals** (derive, then confirm as a set) — `text-primary` (near-black/near-white, never pure), `text-body`, `text-secondary`, `text-dim`, `border`, `bg-card`, `bg-dark` + `text-on-dark` for the one dark panel. Propose the full ramp; ask only if they want to nudge.

**9. Typography** — headline family (serif = "firm/advisor", neo-grotesque sans = "product/tech"; serif is the strongest "not an app" signal), body (an Inter-class sans), labels (a monospace). Recommend per register.

**10. lint guardrails** — `max-accents` (warmth 2, restraint 1), `forbidden-bg` / `forbidden-text` (warm brands forbid pure `#FFFFFF`/`#000000`), and `foreign-names` (the names of the user's *other* brands, so one brand's copy never leaks into another's artifact).

If an answer is already implied by an earlier one, state your assumption and skip the question.

---

## After the interview: build, verify, ship

1. **Write `profiles/<slug>/tokens.json`** — model it exactly on `profiles/northwind/tokens.json` (a warmth example) or `profiles/graphite/tokens.json` (restraint). Fill the full `color` role set, the three `fontFamily` roles, `ratio`, and the `lint` group from the interview.

2. **Pass WCAG AA — iterate until clean:**
   ```
   node tooling/contrast-check.mjs profiles/<slug>
   ```
   Any failing text/large pairing → darken/lighten that token and re-run. Never hand over an inaccessible palette.

3. **Generate the derived files** (copy `profiles/northwind/brand.css` first — the component layer is generic; only the `:root` block regenerates):
   ```
   node tooling/build-tokens.mjs profiles/<slug>/tokens.json profiles/<slug>/brand.css --md profiles/<slug>/color-system.md
   ```

4. **Render a sample and look** (copy + retheme `profiles/northwind/sample.html`):
   ```
   node tooling/render.mjs profiles/<slug>/sample.html
   ```
   Confirm it reads in the intended register (advisor vs. vendor / restraint vs. hype). Fix and re-render if not.

5. **Report:** the profile path, the contrast result, and a one-line statement of why this register fits the audience.

## Rules

- Register is derived from the audience — never let the user pick a palette before naming who it's for.
- Every palette passes `contrast-check` before you call it done.
- `tokens.json` is the source of truth. Never hand-edit a generated `:root` block or palette table — regenerate.
- `--emphasis` is for one decisive figure per section. Never decorative.
