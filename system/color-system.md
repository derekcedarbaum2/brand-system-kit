# Color System

All color tokens for all surfaces. For CSS variable blocks ready to paste, see `tokens-screen.md` and `tokens-print.md`.

## Screen / presentation palette (dark)

### Backgrounds

| Token | Hex | CSS var | Usage |
|---|---|---|---|
| Background | `#14201F` | `--bg` | Slide background (default), footer bar |
| BG2 | `#1A2625` | `--bg2` | Slide section background (content area) |
| Card | `#20302E` | `--card` | Card backgrounds, insight boxes, bio panels |
| Border | `#2A3A38` | `--border` | Card borders, dividers, stage separators |
| White | `#FFFFFF` | `--white` | Headlines, strong text, emphasis |

### Text

| Token | Hex | CSS var | Usage |
|---|---|---|---|
| Accent | `#9FC7CD` | `--accent` | Card left borders, bullet markers, separator lines, before/after labels, stage top borders |
| Body | `#E6E9E7` | `--body` | Body text, insight text, pull quotes |
| Muted | `#8A9290` | `--muted` | Paragraph text, list items, secondary content |
| Dim | `#6B7D80` | `--dim` | Labels, source citations, footer text, monospace UI (nudged from `#3E5C8A` for WCAG AA; canonical value in `<your-profile>/tokens.json`) |

### Glow

| Token | Value | CSS var | Usage |
|---|---|---|---|
| Glow | `rgba(208,216,232,0.06)` | `--glow` | Card glow variant (`box-shadow`) |

### Application rules (screen)

- **70%** deep black backgrounds (`--bg`, `--bg2`)
- **20%** card surfaces and borders
- **10%** accent — used sparingly on left borders, top borders, bullet markers, separators
- **No brand color.** System is intentionally neutral/silvery. Emphasis comes from weight and whitespace, not color.

---

## Print — Dark Mode (one-pagers, sales collateral)

```css
:root {
  --bg-deep:        #14201F;
  --bg-page:        #1A2625;
  --bg-card:        #1F2C2A;
  --border:         #2C3C3A;
  --accent:         #9FC7CD;   /* silvery — same family as presentation accent */
  --text-primary:   #ffffff;
  --text-body:      #E6E9E7;
  --text-secondary: rgba(180,195,220,0.7);
  --text-dim:       rgba(180,195,220,0.5);
  --text-label:     #8A9290;
}
```

### Application (print dark)

- **70%** near-black backgrounds (`--bg-page`, `--bg-deep`)
- **20%** card surfaces and borders
- **10%** accent on stat card top borders, callout left borders, section labels

---

## Print — Light Mode (meeting summaries, internal docs)

```css
:root {
  --charcoal:       #1C1C1C;
  --text-body:      #333333;
  --text-secondary: #666666;
  --accent:         #3E5C8A;
  --accent-light:   #9FC7CD;
  --border:         #E5E5E5;
  --bg:             #FFFFFF;
  --bg-card:        #F0EEE8;
  --teal:           #2A7D8A;
}
```

### Application (print light)

- **80%** white background — clean, professional
- **15%** light-gray cards and borders
- **5%** accent on section bars, CTA table borders, time bars

Special table borders:
- **CTA table:** 2px solid `--accent` border, `#E9EEEE` header background
- **Decision table:** 2px solid `--teal` border, `#E6EEF0` header background

---

## Print — Document Mode (PRDs, strategy briefs, long-form)

```css
:root {
  --charcoal:       #1C1C1C;
  --text-body:      #333333;
  --text-secondary: #666666;
  --accent:         #3E5C8A;
  --accent-light:   #9FC7CD;
  --border:         #E5E5E5;
  --bg:             #FFFFFF;
  --teal:           #2A7D8A;
  --emphasis:       #9A2D2D;   /* reserved — decisive figures only, never decorative */
}
```

**Emphasis rule:** `--emphasis` is used for exactly one decisive figure per major section, maximum. Example: "**$2.4M in wasted annual spend**". Never for decoration, borders, or headings.

---

## Cross-mode quick comparison

| Property | Presentation | Print (Dark) | Print (Light/Meeting) | Document (PRD) |
|---|---|---|---|---|
| Background | `#14201F` / `#1A2625` | `#14201F` / `#1A2625` | `#FFFFFF` | `#FFFFFF` |
| Card bg | `#20302E` | `#1F2C2A` | `#F0EEE8` | (none — no cards) |
| Accent | `#9FC7CD` | `#9FC7CD` | `#3E5C8A` | `#3E5C8A` |
| Body text | `#8A9290` | `#E6E9E7` | `#333333` | `#333333` |
| Border radius | 10px | 6px | 6px | (no containers) |
| Callouts / cards | yes | yes | yes | **no** |

Key notes:
- Print-dark uses slightly lighter card backgrounds (`#1F2C2A` vs screen's `#20302E`) for better contrast at print resolution
- Print-dark uses 6px border-radius (sharper at small physical size) vs 10px in presentations
- Light mode inverts the entire palette for formal / internal documents
- Document mode strips ALL containers from body content — prose only, full width, argument-first
- Print body text is brighter than presentation muted text (needs to be readable on paper)

## What never uses color

- Hero slides (no gradients, no tinted backgrounds)
- Body paragraphs (only inline `<strong>` for emphasis — never colored spans)
- Section dividers (use the `--accent` bar only, never colored blocks)
- Bullets (dash markers in `--accent`, never colored icons)
