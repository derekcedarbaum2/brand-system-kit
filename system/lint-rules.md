# Lint Rules

Machine-testable compliance checklist. Every branded output should be checked against these before shipping.

**MUST rules** are hard failures — block the ship.
**SHOULD rules** are soft failures — fix unless there's a specific reason not to.

---

## Voice & copy

### MUST

- [ ] No banned words: leverage (verb), synergy, cutting-edge, bleeding-edge, best-in-class, industry-leading, robust, seamless, holistic, paradigm, disruptive, disruption, empower, unlock value, digital transformation, stakeholder alignment, north star
- [ ] **Company name / tagline / contact / URL** match the **active profile** (`<your-profile>/`, `<your-profile>/`, `<your-profile>/`) — these are profile constants, not universal. The executable linter reads them from the profile's `tokens.json` (`lint` group). Never hard-code one venture's identity as a universal rule.
- [ ] No foreign brand name leaking into another brand's artifact (one profile's company name appearing in a different profile's deliverable)

### SHOULD

- [ ] Headlines are assertions, not descriptions
- [ ] Every slide / page answers "so what?"
- [ ] Numbers are concrete — not "significant" or "many"
- [ ] Claims have source attribution inline

---

## Typography

### MUST

- [ ] Headlines in Inter, mixed case (NOT uppercase)
- [ ] Labels in JetBrains Mono, UPPERCASE, letter-spaced
- [ ] Body in Inter
- [ ] Mono in JetBrains Mono (fallbacks acceptable: Menlo, Consolas)
- [ ] No underlines for emphasis in body copy
- [ ] Typographic quotes / dashes (`&mdash;`, `&rsquo;`, `&ldquo;`/`&rdquo;`) — not straight quotes or double-hyphens in body

### SHOULD

- [ ] H2 uses -1px to -2px letter-spacing
- [ ] Body line-height between 1.6 and 1.7
- [ ] No more than 3 levels of heading hierarchy on a single surface

---

## Color

### MUST

- [ ] No blue gradients
- [ ] No hero images with color overlays
- [ ] Palette limited to defined tokens (see `color-system.md`)
- [ ] `--emphasis` red used maximum once per section (document mode only)
- [ ] No rainbow color sequences in data viz

### SHOULD

- [ ] 70/20/10 ratio honored (bg / card / accent)
- [ ] No more than 4 series in any chart
- [ ] Source citations in `--dim` or `rgba(80,90,112,0.4)`

---

## Layout

### MUST

- [ ] Presentation slides 1280×720, never a different dimension
- [ ] One `.g2` OR one `.g3` grid per slide — never both
- [ ] One insight box per slide, maximum
- [ ] Document mode: NO `.callout`, `.card`, `.insight-box`, or bordered containers around body prose
- [ ] Document mode: NO `max-width: 7in` or any narrow reading column
- [ ] Print: min 0.55in side margins (0.85in for document mode)

### SHOULD

- [ ] Stat blocks inside cards (not floating)
- [ ] 3-5 question cards max per slide
- [ ] 3-5 timeline items max per slide
- [ ] 5-6 rows max per slide-embedded table
- [ ] Pull quotes and bullet lists don't appear on the same slide

---

## Components

### MUST

- [ ] Cards: `10px border-radius` on screen, `6px` on print
- [ ] Footer on every page (print) or every slide (screen)
- [ ] Cover slide uses `--bg` (deepest), not `--bg2`
- [ ] Bio cards use `.card-a` left-border variant
- [ ] CTA slide centered with specific next step (not "contact us")

### SHOULD

- [ ] Separator (`.sep`) used for major section breaks, not overused
- [ ] Source citations under the card they cite, not in a bulk sources section
- [ ] Insight box uses left-border accent, not top-border

---

## Motion

### MUST

- [ ] Reveal.js transition: `fade` only (no slide, concave, cube)
- [ ] `prefers-reduced-motion` respected
- [ ] No parallax, scroll-linked animations, or typewriter effects

### SHOULD

- [ ] One or two fragments per slide, not every element
- [ ] Label and h2 are never fragments

---

## Imagery

### MUST

- [ ] No stock photos
- [ ] No AI-generated imagery as decoration
- [ ] No decorative icons (lightbulbs, gears, rockets)
- [ ] No patterns / textures / noise overlays as backgrounds

### SHOULD

- [ ] Screenshots have 1px `--border` and brand-appropriate border-radius
- [ ] Portraits (if used) are consistent in crop and treatment
- [ ] Architecture diagrams use brand palette only

---

## Accessibility

### MUST

- [ ] Body text contrast ≥ 4.5:1 (AA)
- [ ] Large text / headlines contrast ≥ 3:1 (AA)
- [ ] Every `<img>` has alt text
- [ ] Every interactive element has a visible focus state
- [ ] No information conveyed by color alone
- [ ] Real semantic HTML (`<h1>`, `<button>`, `<a>`) — not styled divs

### SHOULD

- [ ] Critical copy (headlines, CTAs, nav) hits AAA contrast (7:1)
- [ ] `prefers-reduced-motion` handled

---

## Metadata / frontmatter (markdown artifacts)

### MUST

- [ ] YAML frontmatter present on all vault `.md` files
- [ ] Required fields: `title`, `type`, `status`, `classification`, `created`, `updated`
- [ ] Dates in ISO format (`YYYY-MM-DD`)

### SHOULD

- [ ] `author`, `tags`, `product`, `related` filled in where applicable
- [ ] Wiki-links to related vault files
- [ ] `status` honestly represents the state (not always "draft")

---

## How to run the lint

Manually: read through the list, check each rule against the artifact.

Automated (future): a script that parses HTML / markdown and flags MUST violations. Until that exists, the `/qa-loop` skill's QA criteria overlap with the SHOULD list for most artifacts.

## When a MUST fails

Do not ship. Fix the violation. If the rule genuinely doesn't apply to this artifact (e.g., the logo audit for a tweet), note it in a comment in the file and move on — don't silently skip.

## When a SHOULD fails

Fix unless there's a specific reason documented in the artifact or the PR comments. "It looked better the other way" is not a reason. "The client requested this specific divergence" is.
