# Typography

**Two font families.**

- **Inter** (Google Fonts CDN) — headlines, body, UI
- **JetBrains Mono** (Google Fonts CDN) — labels, section tags, source citations, mono UI

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
```

System font smoothing is always on:
```css
-webkit-font-smoothing: antialiased;
```

---

## Presentation (screen, 1280×720)

### Headlines

- Font: Inter
- Weight: 700 (h2, h3), 800 (h1)
- Transform: None (mixed case — NOT uppercase)
- Letter spacing: -2px (h1), -1px (h2), normal (h3)
- Color: White (`#FFFFFF`)
- Line height: 1.08 (h1), 1.15 (h2), 1.35 (h3)

| Level | Size (em) | Weight |
|---|---|---|
| h1 | 2.5 | 800 |
| h2 | 1.8 | 700 |
| h3 | 0.9 | 700 |

### Body / UI

- Font: Inter → -apple-system → sans-serif
- Weight: 400 (normal), 500 (pull quotes), 600 (strong)
- Color: Muted (`#8A9290`) for paragraphs, Body (`#E6E9E7`) for insight text
- Line height: 1.7 (paragraphs), 1.6 (pull quotes), 1.65 (list items)

### Monospace / labels

- Font: JetBrains Mono
- Weight: 500–700
- Transform: UPPERCASE
- Letter spacing: 1px–4px (depends on context)
- Color: Dim (`#3E5C8A`) for labels

### Section labels

- Font: JetBrains Mono
- Size: 0.38em
- Weight: 600
- Transform: UPPERCASE
- Letter spacing: 4px
- Color: Dim (`#3E5C8A`)
- Margin bottom: 14px
- Class: `.label`

### Pull quotes

- Size: 0.88em
- Weight: 500
- Color: Body (`#E6E9E7`)
- Line height: 1.6
- Max width: 90%
- Strong: White, 700 weight
- Class: `.pull`

### Base scale

Reveal.js renders at 1280×720 and scales the viewport. Effective base is ~32px. Practical reference:
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
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-dim);
  margin-bottom: 9px;
}
```

### Stat numbers (print)

- Font: Inter, 22–26px, 800 weight
- Color: white (dark mode) or `--charcoal` (light/doc mode)
- Letter-spacing: -0.5px

### Stat labels (print)

- Font: JetBrains Mono, 9px, uppercase
- Letter-spacing: 0.3px
- Color: `--text-dim` (dark) or `--text-secondary` (light)

---

## Document mode (PRDs, strategy briefs)

- **H1 (doc title):** Inter 800, 26px, `--charcoal`, -0.5px letter-spacing, margin-bottom 8px
- **Subtitle:** 13px, `--text-secondary`, margin-bottom 4px
- **Metadata line:** JetBrains Mono, 9px, uppercase, 2px letter-spacing, `--text-secondary`, margin-bottom 18px
- **H2:** 17px, 700, `--charcoal`, margin 26px 0 10px, **left border 3px solid `--accent`**, padding-left 12px, line-height 1.3
- **H3:** 13px, 700, `--charcoal`, margin 16px 0 5px
- **Body paragraph:** 11px, 400, `--text-body`, line-height 1.7, margin 7px 0
- **Strong:** `--charcoal`, 600 weight
- **Lists:** 20px left padding, 3px between items, item font-size inherits body

---

## Typographic rules

- **Headlines are ALWAYS mixed case.** Never uppercase.
- **Labels are ALWAYS uppercase.** JetBrains Mono, letter-spaced.
- **Body is ALWAYS Inter.** Never a serif. Never monospace.
- **Mono is ALWAYS JetBrains Mono.** Never Courier, Menlo, Monaco as the primary — they're fallbacks.
- **Use typographic quotes and dashes.** `&mdash;`, `&rsquo;`, `&ldquo;`/`&rdquo;` — not `--`, `'`, `"`.
- **No ALL CAPS in body text.** Caps are reserved for mono labels.
- **No underlines for emphasis.** Use `<strong>` (which renders white / charcoal at 600 weight).
- **Italics are fine for book/publication titles and quoted emphasis** — used sparingly.
