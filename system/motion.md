# Motion

Animation is restrained by default. Like color, motion is easy to overuse; when it's everywhere, it cheapens the work. When used with intention, it directs attention.

## Default posture

**No motion unless it serves the argument.**

- Static deliverables (one-pagers, meeting summaries, PRDs, emails): zero animation
- Presentations: subtle fragment fade-ins only
- Website: page-level transitions OK; no element-level motion by default

---

## Deck runtime (reveal.js, if that's your renderer)

The fragment and transition rules below assume an HTML deck. The config is for reveal.js **if that's what renders your decks**. The kit ships documents, not a deck runtime.

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

**The only transition we use: `fade`.** Fast speed. Never slide, concave, cube, zoom, or the other reveal.js defaults.

## Fragments (progressive reveal)

Use `class="fragment"` on elements to build them in as the presenter clicks.

**When to use fragments:**
- Cards in a `.g2` or `.g3` grid, one per click
- The insight box below a card grid, appearing as the synthesis
- Individual bullets in a list, rarely; usually the whole list appears at once
- A single revelation moment, e.g. the final stat on a before/after

**When NOT to use fragments:**
- The `.label` at the top of a slide; this anchors context, always visible
- The `h2` headline; sets the frame, always visible
- Every single element on a slide; that's just padding out the deck

**Default posture on fragments:** one or two per slide, max. Every element being a fragment means none of them are.

## Fragment effects (reveal.js)

Keep to `.fragment` (default fade). Avoid:
- `fragment fade-up` / `fade-down` / `fade-left` / `fade-right`: directional motion is noise
- `fragment grow` / `shrink`: size change reads as a gimmick
- `fragment highlight-red` / `highlight-current-red`: red is reserved for `--emphasis` figures, never decorative motion
- `fragment strike`: rare but acceptable for "before / after" rhetorical setup

## CSS transitions (for web / non-reveal surfaces)

For hover states, link underlines, button feedback:

```css
transition: all 150ms cubic-bezier(0.25, 0.1, 0.25, 1);
```

- **Duration:** 120–180ms for hover feedback. 200–280ms for content reveals.
- **Easing:** standard ease-out curves. Never bounce, never spring, never anything that calls attention to itself.
- **What transitions:** color / opacity only. Never layout properties (`width`, `height`, `padding`) on user interaction; that causes reflow and visual noise.

## Animation durations

| Purpose | Duration |
|---|---|
| Hover state | 120–180ms |
| Content reveal | 200–280ms |
| Slide transition (fade) | Reveal.js "fast" = 200ms |
| Page-level transition | 280–400ms |
| Loading state (spinner) | 1000ms loop |

Anything longer is slow. Anything shorter feels broken.

## Banned motion

- Parallax scrolling
- Scroll-linked animations ("reveal on scroll")
- Hover tilts (3D transforms)
- Autoplay video in the hero
- Animated gradient backgrounds
- Particle systems / floating dots
- Typewriter effects on headlines
- Any motion that can't be disabled by `prefers-reduced-motion`

## Reduced motion

Always respect user preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In reveal.js, set `transition: 'none'` in the config when user has reduced motion preference (requires a small JS detection hook).

## The motion litmus test

Before adding an animation, ask: **does this help the reader understand something faster?**

- If yes: add it, keep it short, keep it subtle.
- If no: cut it.

Motion added just to feel dynamic only distracts.
