# Tokens — Screen Mode

CSS variables for all dark-bg HTML output: reveal.js presentations, dashboards, dark-mode web pages.

> **The hex values in this file are illustrative.** The binding source of truth for any brand is its `profiles/<name>/tokens.json` and the `brand.css` generated from it. Read this file for *which roles to use where* and *medium-specific guidance* — not for the literal colors.

For philosophy and rationale see `identity.md`. For the full palette and application rules see `color-system.md`.

## CSS variables

Paste at the top of any screen-mode stylesheet:

```css
:root {
  /* Backgrounds */
  --bg:       #14201F;             /* deepest black — slide bg, footer */
  --bg-card:      #1A2625;             /* slide section bg */
  --bg-card:     #20302E;             /* cards, insights, bios */
  --border:   #2A3A38;             /* dividers, card borders */

  /* Text */
  --text-primary:    #FFFFFF;             /* headlines, strong */
  --accent:   #9FC7CD;             /* silvery — borders, bullets, separators */
  --text-body:     #E6E9E7;             /* body text, pull quotes */
  --text-secondary:    #8A9290;             /* paragraphs, list items */
  --text-dim:      #3E5C8A;             /* labels, sources, footer */

  /* Effect */
}
```

## Base styles

```css
html, body {
  -webkit-font-smoothing: antialiased;
  background: var(--bg);
  color: var(--text-body);
  font-family: 'Inter', -apple-system, sans-serif;
}
```

## Reveal.js config

```js
Reveal.initialize({
  hash: true,
  slideNumber: true,
  progress: true,
  controls: true,
  controlsLayout: 'edges',
  transition: 'fade',
  transitionSpeed: 'fast',
  width: 1280,
  height: 720,
  margin: 0,
  minScale: 0.2,
  maxScale: 2.0,
  backgroundTransition: 'fade'
});
```

## CDN links

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css">
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
```

## Starter template

Use a profile's generated `brand.css` (e.g. `profiles/northwind/brand.css`) as the stylesheet for a deck skeleton — it defines these tokens plus the component classes. Generate it with `tooling/build-tokens.mjs`.

## Navigation controls

- Controls layout: `edges`
- Progress bar: 2px height, `--accent` color
- Slide number: JetBrains Mono, 9px, `--text-dim`, transparent bg, right-aligned at 90px

## Build animations

Use reveal.js `class="fragment"` on elements for progressive build-in. Default fade transition.

- Add `.fragment` to each major content block for progressive reveal
- Cards in a `.g2` or `.g3` work well as individual fragments
- Insight boxes work well as the final fragment on a slide
- The `.label` and `h2` should **not** be fragments — they anchor the slide
- Fragments advance on click / arrow, same as slide transitions

## What NOT to do in screen mode

- Don't add animations beyond subtle fade fragments
- Don't use gradients or hero images
- Don't introduce additional colors — the palette is final
- Don't add box-shadows — a `1px solid var(--border)` is the depth cue
- Don't change slide dimensions — 1280×720 is the contract

See `anti-patterns.md` for the full list.
