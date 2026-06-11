# Typography

**Three font roles.** Each profile binds a family to every role in its `tokens.json`. The roles are system; the families are values.

- `--font-serif`: headlines and pull quotes in **warmth** profiles (the Northwind demo binds Source Serif 4). Restraint profiles bind this role back to the sans; they use no serif.
- `--font-sans`: body copy and UI everywhere. In **restraint** profiles it also carries the headlines (the Graphite demo binds Inter for both).
- `--font-mono`: labels, section tags, source citations, metadata; in restraint, also the wordmark (both demos bind JetBrains Mono).

No fonts are bundled. The demos load theirs from the Google Fonts CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
```

Font smoothing is always on:
```css
-webkit-font-smoothing: antialiased;
```

---

## Presentation (screen, 1280×720)

### Headlines

- Font: `--font-serif` (resolves to a serif in warmth, the sans in restraint)
- Weight: 700 (h2, h3), 800 (h1)
- Transform: None (mixed case — not uppercase)
- Letter spacing: -2px (h1), -1px (h2), normal (h3)
- Color: `--text-primary`
- Line height: 1.08 (h1), 1.15 (h2), 1.35 (h3)

| Level | Size (em) | Weight |
|---|---|---|
| h1 | 2.5 | 800 |
| h2 | 1.8 | 700 |
| h3 | 0.9 | 700 |

### Body / UI

- Font: `--font-sans`
- Weight: 400 (normal), 500 (pull quotes), 600 (strong)
- Color: `--text-secondary` for paragraphs, `--text-body` for insight text
- Line height: 1.7 (paragraphs), 1.6 (pull quotes), 1.65 (list items)

### Monospace / labels

- Font: `--font-mono`
- Weight: 500–700
- Transform: UPPERCASE
- Letter spacing: 1px–4px (depends on context)
- Color: `--text-dim`

### Section labels

- Font: `--font-mono`
- Size: 0.38em
- Weight: 600
- Transform: UPPERCASE
- Letter spacing: 4px
- Color: `--text-dim`
- Margin bottom: 14px
- Class: `.label`

### Pull quotes

- Font: `--font-serif` in warmth, `--font-sans` in restraint
- Size: 0.88em
- Weight: 500
- Color: `--text-body`
- Line height: 1.6
- Max width: 90%
- Strong: `--text-primary`, 700 weight
- Class: `.pull`

### Base scale

An HTML deck renders at 1280×720 and scales the viewport (reveal.js behavior, if that's your renderer). Effective base is ~32px. Practical reference:
- h2 at 1.8em ≈ 58px rendered
- Body at 0.65em ≈ 21px rendered
- Labels at 0.38em ≈ 12px rendered

---

## Print (8.5×11 letter)

### Size scale

| Element | Size | Weight |
|---|---|---|
| Company name (h1) | 20–22px | 700–800 |
| Tagline / headline (h2) | 18–21px | 700 |
| Card headings (h3) | 12.5–14px | 700 |
| Body text | 9–11px | 400 |
| Section labels | 8–9px | 600 |
| Stat numbers | 22–26px | 800–900 |
| Footer text | 8.5–9px | 400 |

### Section labels (print)

```css
.label {
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-dim);
  margin-bottom: 9px;
}
```

### Stat numbers (print)

- Font: `--font-sans`, 22–26px, 800 weight
- Color: `--text-primary`
- Letter-spacing: -0.5px

### Stat labels (print)

- Font: `--font-mono`, 9px, uppercase
- Letter-spacing: 0.3px
- Color: `--text-dim` (dark surfaces) or `--text-secondary` (light)

---

## Document mode (PRDs, strategy briefs)

- **H1 (doc title):** `--font-serif`, 800 (or the heaviest available serif weight), 26px, `--text-primary`, -0.5px letter-spacing, margin-bottom 8px
- **Subtitle:** 13px, `--text-secondary`, margin-bottom 4px
- **Metadata line:** `--font-mono`, 9px, uppercase, 2px letter-spacing, `--text-secondary`, margin-bottom 18px
- **H2:** 17px, 700, `--text-primary`, margin 26px 0 10px, **left border 3px solid `--accent`**, padding-left 12px, line-height 1.3
- **H3:** 13px, 700, `--text-primary`, margin 16px 0 5px
- **Body paragraph:** 11px, 400, `--text-body`, line-height 1.7, margin 7px 0
- **Strong:** `--text-primary`, 600 weight
- **Lists:** 20px left padding, 3px between items, item font-size inherits body

---

## Typographic rules

- **Headlines are mixed case.** Never uppercase.
- **Labels are uppercase.** Mono, letter-spaced.
- **Body is the sans (`--font-sans`).** Headlines take `--font-serif` — a real serif in warmth profiles, the sans again in restraint. Body never goes serif or mono; that's a per-profile decision made once in `tokens.json`, not per artifact.
- **Mono is `--font-mono`.** The demos bind JetBrains Mono with Menlo as fallback — don't hand-pick a different mono per artifact.
- **Use typographic quotes and dashes.** `&mdash;`, `&rsquo;`, `&ldquo;`/`&rdquo;` — not `--`, `'`, `"`.
- **No ALL CAPS in body text.** Caps are reserved for mono labels.
- **No underlines for emphasis.** Use `<strong>` (renders `--text-primary` at 600 weight).
- **Italics are fine for book/publication titles and quoted emphasis** — used sparingly.
