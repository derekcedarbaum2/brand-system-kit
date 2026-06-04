# Accessibility

WCAG 2.1 contrast requirements and their implications for the {{COMPANY}} palette.

## WCAG contrast thresholds

| Level | Normal text | Large text (18pt+ / 14pt bold) |
|---|---|---|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

Target **AA for all body text**. Target **AAA for critical CTAs, primary headlines, and navigation.**

## Screen / presentation palette — contrast audit

Background `#14201F` / `#1A2625` — effectively near-black.

| Pairing | Ratio | AA body? | AAA body? | AA large? |
|---|---|---|---|---|
| `--white` (#FFFFFF) on `--bg` (#14201F) | 19.4:1 | ✅ | ✅ | ✅ |
| `--body` (#E6E9E7) on `--bg` | 13.1:1 | ✅ | ✅ | ✅ |
| `--accent` (#9FC7CD) on `--bg` | 13.8:1 | ✅ | ✅ | ✅ |
| `--muted` (#8A9290) on `--bg` | 5.6:1 | ✅ | ❌ | ✅ |
| `--dim` (#3E5C8A) on `--bg` | 3.1:1 | ❌ | ❌ | ✅ (large only) |
| `--white` on `--card` (#20302E) | 17.8:1 | ✅ | ✅ | ✅ |
| `--muted` on `--card` | 5.1:1 | ✅ | ❌ | ✅ |
| `--dim` on `--card` | 2.9:1 | ❌ | ❌ | ⚠️ borderline |

### Implications (screen)

- **`--dim` is NOT safe for body text.** Use only for labels (mono, uppercase, letter-spaced — effectively bolder / larger by optical weight) or source citations where the info is supplementary.
- **`--muted` passes AA for body** but not AAA. For anything where accessibility is a hard requirement (public client docs, public presentations, regulatory deliverables), upgrade to `--body` (#E6E9E7).
- **Source citations** (`--dim` at 0.32em) are acceptable as decorative attribution but should not carry required information.

---

## Print — light / document mode — contrast audit

Background `#FFFFFF`.

| Pairing | Ratio | AA body? | AAA body? |
|---|---|---|---|
| `--charcoal` (#1C1C1C) on white | 16.1:1 | ✅ | ✅ |
| `--text-body` (#333333) on white | 12.6:1 | ✅ | ✅ |
| `--text-secondary` (#666666) on white | 5.7:1 | ✅ | ❌ |
| `--accent` (#3E5C8A) on white | 7.5:1 | ✅ | ✅ |
| `--accent-light` (#9FC7CD) on white | 1.5:1 | ❌ | ❌ |
| `--teal` (#2A7D8A) on white | 5.9:1 | ✅ | ❌ |
| `--emphasis` (#9A2D2D) on white | 7.3:1 | ✅ | ✅ |

### Implications (print-light)

- **`--accent-light` is decorative only** — never use for text. It's for bullet markers and subtle stripes, where the glyph isn't information-bearing.
- **`--text-secondary` passes AA** but falls short of AAA. Fine for subtitles and captions; not for required body content.
- **`--teal` passes AA for headers** (which are large) but would fall short for body paragraphs — it's a table-header / decorative color, not a body color.

---

## Print — dark mode — contrast audit

Background `#1A2625`.

| Pairing | Ratio | AA body? | AAA body? |
|---|---|---|---|
| `--text-primary` (#ffffff) on `--bg-page` | 19.0:1 | ✅ | ✅ |
| `--text-body` (#E6E9E7) on `--bg-page` | 15.8:1 | ✅ | ✅ |
| `--text-secondary` rgba(180,195,220,0.7) on `--bg-page` | ~8.5:1 | ✅ | ✅ |
| `--text-dim` rgba(180,195,220,0.5) on `--bg-page` | ~5.8:1 | ✅ | ❌ |
| `--text-label` (#8A9290) on `--bg-page` | 4.1:1 | ⚠️ borderline | ❌ |

### Implications (print-dark)

- **`--text-label` is borderline AA** — for one-pagers that might be viewed on low-quality monitors or printed, upgrade label text to `--text-dim` or bolder weight.
- Note: rgba values are approximations — test against the actual printed surface for critical documents.

---

## Non-text contrast

WCAG 2.1 also requires **3:1 contrast for UI components and graphical objects** (borders, icons, form inputs):

| Pairing | Ratio | Pass 3:1? |
|---|---|---|
| `--border` (#2A3A38) on `--bg` (#14201F) | 1.2:1 | ❌ |
| `--border` (#2C3C3A) on `--bg-page` (print dark) | 1.3:1 | ❌ |
| `--border` (#E5E5E5) on `#FFFFFF` (print light) | 1.2:1 | ❌ |

**All card borders technically fail 3:1** — they're intentionally subtle for the visual system. Acceptable because:
- They separate content but aren't solely load-bearing (whitespace + text hierarchy also differentiate)
- Card content itself passes contrast on the card background

**Where this matters:** input fields, buttons, and interactive controls on the website need stronger borders. Use `--accent` (silvery on dark, charcoal on light) for interactive element borders, not the subtle `--border` token.

---

## Focus states

Every interactive element must have a visible focus state:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

Don't remove `outline` without replacing it. Default browser focus rings are fine — just customize color to match brand.

---

## Color is never the only signal

Per WCAG:

- A link that's just a different color isn't accessible. Add underline or weight.
- A status indicator that's only color ("red = bad, green = good") fails. Add an icon or text label.
- A chart that differentiates only by color fails. Add shape / pattern or label directly.

Since the {{COMPANY}} palette is color-restrained by philosophy, this rule reinforces rather than conflicts with the brand.

---

## Screen reader / semantic HTML

For decks and websites:

- Use real `<h1>`, `<h2>`, `<h3>` — not styled divs
- Alt text on every `<img>` (including the logo — `alt="{{COMPANY}}"`)
- `<button>` for buttons, `<a>` for links — never the wrong element styled to look like the other
- `aria-label` for icon-only buttons
- `role="presentation"` on layout tables (see `tokens-email.md`)
- `aria-live` regions for dynamic content updates

---

## Reduced motion

See `motion.md` — always respect `prefers-reduced-motion`.

---

## Quick audit checklist

Before publishing any branded output:

- [ ] Body text contrast ≥ 4.5:1 (AA)
- [ ] Large text / headlines contrast ≥ 3:1 (AA)
- [ ] Links distinguishable by more than color
- [ ] Every image has alt text
- [ ] Every interactive element has a focus state
- [ ] Motion respects `prefers-reduced-motion`
- [ ] No info conveyed by color alone

If any fail, fix before shipping.
