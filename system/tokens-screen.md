# Tokens — Screen Mode

CSS variables for all dark-bg HTML output: reveal.js presentations, dashboards, dark-mode web pages.

For philosophy and rationale see `identity.md`. For the full palette and application rules see `color-system.md`.

## CSS variables

Paste at the top of any screen-mode stylesheet:

```css
:root {
  /* Backgrounds */
  --bg:       #14201F;             /* deepest black — slide bg, footer */
  --bg2:      #1A2625;             /* slide section bg */
  --card:     #20302E;             /* cards, insights, bios */
  --border:   #2A3A38;             /* dividers, card borders */

  /* Text */
  --white:    #FFFFFF;             /* headlines, strong */
  --accent:   #9FC7CD;             /* silvery — borders, bullets, separators */
  --body:     #E6E9E7;             /* body text, pull quotes */
  --muted:    #8A9290;             /* paragraphs, list items */
  --dim:      #3E5C8A;             /* labels, sources, footer */

  /* Effect */
  --glow:     rgba(208,216,232,0.06);
}
```

## Base styles

```css
html, body {
  -webkit-font-smoothing: antialiased;
  background: var(--bg);
  color: var(--body);
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

Use `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/brand reference/starter-template.html` as the starting deck skeleton. It includes these tokens and base styles, plus all component classes pre-defined.

## Navigation controls

- Controls layout: `edges`
- Progress bar: 2px height, `--accent` color
- Slide number: JetBrains Mono, 9px, `--dim`, transparent bg, right-aligned at 90px

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
- Don't add box-shadows beyond the `--glow` variant (`.card-glow`)
- Don't change slide dimensions — 1280×720 is the contract

See `anti-patterns.md` for the full list.
