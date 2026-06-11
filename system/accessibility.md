# Accessibility

WCAG 2.1 contrast requirements and how the kit enforces them.

## WCAG contrast thresholds

| Level | Normal text | Large text (18pt+ / 14pt bold) |
|---|---|---|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

Target **AA for all body text**. Target **AAA for critical CTAs, primary headlines, and navigation.**

## The contrast audit is computed, not hand-written

Don't maintain a contrast table by hand. It drifts the first time a token changes. Run:

```
node tooling/contrast-check.mjs profiles/<name>
```

It tests every shipping pairing straight from `tokens.json` (text roles on `--bg` and `--bg-card`, `--text-on-dark` on `--bg-dark`, accents, `--emphasis` on the document surface) and fails loudly if a pairing's token is missing, because a silently skipped pairing would shrink the gate. The notes below explain *why* pairings are chosen, not what your numbers are; your numbers come from the tool.

- **`--text-dim` is checked at 4.5:1 as normal text.** It carries real text: small labels, footers, source lines. It gets no large-text discount. If your dim value fails, adjust the value; don't demote the check.
- **`--text-secondary` should pass AA, not necessarily AAA.** Where accessibility is a hard requirement (public client docs, regulatory deliverables), upgrade secondary copy to `--text-body`.
- **`--emphasis` is a document-mode color.** It's tested against the `bg-doc` token when the profile defines one (Northwind defines `#FBFAF7`), falling back to white. Testing a print-red against a restraint profile's near-black screen background would be a context error; that's not where it appears.
- **Accents used as text** (links, section labels) are tested like text. Accents used as 2px bars and bullet markers are decorative; see non-text contrast below.

---

## Non-text contrast

WCAG 2.1 also requires **3:1 contrast for UI components and graphical objects** (borders, icons, form inputs).

Hairline `--border` values are intentionally subtle and usually fail 3:1. `contrast-check.mjs` reports border pairings but never blocks on them. Acceptable because:

- Borders separate content but aren't solely load-bearing (whitespace and text hierarchy also differentiate)
- Card content itself passes contrast on the card background

**Where this matters:** input fields, buttons, and interactive controls need stronger borders. Use `--accent` for interactive element borders, not the subtle `--border` token.

---

## Focus states

Every interactive element must have a visible focus state:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

Don't remove `outline` without replacing it. Default browser focus rings are fine; just customize color to match brand.

---

## Color is never the only signal

Per WCAG:

- A link that's just a different color isn't accessible. Add underline or weight.
- A status indicator that's only color ("red = bad, green = good") fails. Add an icon or text label.
- A chart that differentiates only by color fails. Add shape / pattern or label directly.

Since the kit's defaults are color-restrained by philosophy, this rule reinforces rather than conflicts with the system.

---

## Screen reader / semantic HTML

Manual checks. No script verifies these; review them yourself before shipping decks and websites:

- Use real `<h1>`, `<h2>`, `<h3>`, not styled divs
- Alt text on every `<img>` (including the logo: `alt="your brand name"`)
- `<button>` for buttons, `<a>` for links; never the wrong element styled to look like the other
- `aria-label` for icon-only buttons
- `role="presentation"` on layout tables (see `tokens-email.md`)
- `aria-live` regions for dynamic content updates

---

## Reduced motion

See `motion.md`. Always respect `prefers-reduced-motion`.

---

## Quick audit checklist

Before publishing any branded output:

- [ ] Body text contrast ≥ 4.5:1 (AA): `node tooling/contrast-check.mjs profiles/<name>`
- [ ] Large text / headlines contrast ≥ 3:1 (AA)
- [ ] Links distinguishable by more than color
- [ ] Every image has alt text
- [ ] Every interactive element has a focus state
- [ ] Motion respects `prefers-reduced-motion`
- [ ] No info conveyed by color alone

If any fail, fix before shipping.
