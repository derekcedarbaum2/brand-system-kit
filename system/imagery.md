# Imagery

**The default answer is: don't.**

{{COMPANY}} is a text-and-structure brand. The absence of imagery IS the brand. Every other AI consultancy has hero shots, abstract gradients, and stock photos of diverse professionals pointing at screens. We don't.

If you're reaching for an image, ask first: does the content need it, or am I filling space?

---

## When imagery is allowed

Rare cases where an image earns its place:

### 1. Screenshots of working software

**Allowed.** Showing the tool actually doing the work is proof. Use real screenshots (with PII blurred or replaced). Never mock-up a UI that doesn't exist.

Treatment:
- 1px border in `--border`
- 10px border-radius (screen) / 6px (print)
- No drop shadow
- No "laptop frame" — just the screen

### 2. Architecture / flow diagrams

**Allowed** if they clarify something text can't. Use draw.io MCP to generate — keep to the brand palette:
- Background: transparent or `--bg-page`
- Lines / borders: `--accent`
- Text: `--body` / `--muted`
- No other colors

### 3. Charts and data viz

See `data-viz.md` — those are technically images, but they're arguments, not decoration.

### 4. The logo

Only place the logo belongs. See `logo-assets.md`.

### 5. Portraits for bios

Reluctantly allowed. If used:
- Standard headshot, plain background
- Black-and-white or desaturated
- Same size / crop across team
- Circular or square — not irregular cutouts

---

## What's banned

- **Stock photos.** No "diverse team around laptop," no "handshake," no "rocket launching," no "woman looking thoughtfully out window."
- **Hero gradients.** No blue-to-purple, no any-to-any. The brand is near-black. Gradients signal SaaS generic.
- **Abstract AI imagery.** No neural network visualizations, no "digital brain" shots, no circuits-and-light aesthetics.
- **Decorative icons.** No lightbulbs for "ideas," no gears for "process," no rockets for "growth." Text is sufficient.
- **Illustration.** No custom illustrations, no cartoon characters, no "friendly robot" mascots.
- **Patterns / textures.** No noise overlays, no dot grids as backgrounds, no subtle textures.
- **Photographic backgrounds.** No images behind text, period.

---

## If imagery sneaks in against these rules

Kill it. Ask whether the content is strong enough to stand without the image. If yes, ship without. If no, the content needs to be stronger — not the image bigger.

The brand's confidence comes from the refusal to decorate.

---

## Imagery and social / marketing

Social posts are text-first. When an image IS posted (rare):

- Screenshots of the tool or working output
- Data charts made in the brand palette
- One well-chosen quote rendered as a text card in brand tokens

Never:
- Generic AI imagery from Unsplash or stock sites
- AI-generated illustrations (ironic given the work)
- Templated social graphics with overlaid text and brand logo (that's every other AI consultancy's playbook)
