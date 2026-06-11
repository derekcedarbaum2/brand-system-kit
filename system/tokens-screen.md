# Tokens: Screen Mode

Token usage for dark-background HTML output: decks, dashboards, dark-mode web pages. Dashboards are screen-mode surfaces, same tokens as any other screen output.

> **Values come from the profile.** The binding source of truth for any brand is its `profiles/<name>/tokens.json` and the `brand.css` generated from it. Read this file for *which roles to use where* and *medium-specific guidance*, not for literal colors.

For philosophy and rationale see `identity.md`. For the full role list and application rules see `color-system.md`.

## CSS variables

Don't hand-write a `:root` block. Generate it from the profile and link the result:

```bash
node tooling/build-tokens.mjs profiles/<name>/tokens.json profiles/<name>/brand.css
```

The generated `brand.css` defines every color role plus the component classes. The shipped restraint demo (`profiles/graphite/brand.css`) is the kit's dark screen palette: near-black `--bg`, `--bg-card` a step lighter, silvery `--accent`, white `--text-primary`.

## Base styles

```css
html, body {
  -webkit-font-smoothing: antialiased;
  background: var(--bg);
  color: var(--text-body);
  font-family: var(--font-sans);
}
```

## Deck runtime (reveal.js, if that's your renderer)

The patterns below assume an HTML deck. The config is for reveal.js **if that's what renders your decks**. The kit ships documents, not a deck runtime.

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

### CDN links (reveal.js decks only)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css">
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
```

Swap the font links for whatever your profile's `fontFamily` tokens name.

## Navigation controls

- Controls layout: `edges`
- Progress bar: 2px height, `--accent` color
- Slide number: mono (`--font-mono`), 9px, `--text-dim`, transparent bg, right-aligned at 90px

## Build animations

Use reveal.js `class="fragment"` on elements for progressive build-in. Default fade transition.

- Add `.fragment` to each major content block for progressive reveal
- Cards in a `.g2` or `.g3` work well as individual fragments
- Insight boxes work well as the final fragment on a slide
- The `.label` and `h2` should **not** be fragments; they anchor the slide
- Fragments advance on click / arrow, same as slide transitions

## What NOT to do in screen mode

- Don't add animations beyond subtle fade fragments
- Don't use gradients or hero images
- Don't introduce additional colors; the palette is final
- Don't add box-shadows. A `1px solid var(--border)` is the depth cue
- Don't change slide dimensions. 1280×720 is the contract

See `anti-patterns.md` for the full list.
