# Color System

Color is defined by **role**, not by raw hex. Each profile's `tokens.json` binds a hex to every role; the tooling generates the CSS and checks contrast from there. This file describes the roles and how they're applied — never the literal values (those live in `profiles/<name>/tokens.json`).

## The roles

| Token | Role |
|---|---|
| `--bg` | Page background |
| `--bg-card` | Card / panel surface |
| `--bg-dark` | The one dark surface (header/footer, or a dark accent panel on a light page) |
| `--text-primary` | Headlines, strong text |
| `--text-body` | Body copy |
| `--text-secondary` | Secondary copy, metadata |
| `--text-dim` | De-emphasized small labels, footers |
| `--text-on-dark` | Body text on `--bg-dark` |
| `--border` | Hairline borders, dividers, rules |
| `--accent` | Primary accent — links, section bars, stat tops |
| `--accent-2` | Secondary accent — data viz series 2, alt callouts |
| `--accent-on-dark` | Accent with enough contrast on `--bg-dark` |
| `--emphasis` | One decisive figure per section, maximum. Never decorative. |

## Two registers, same roles

The roles don't change between brands — the **values** do, and that choice is the register (see `identity.md`):

- **Restraint** (e.g. the `graphite` demo): near-black `--bg`, a single neutral/silvery `--accent`, no second brand color. The palette stays neutral and recedes.
- **Warmth** (e.g. the `northwind` demo): light `--bg`, an editorial `--accent` + `--accent-2`. The palette carries an accent and reads as deliberate.

Both are valid. The kit takes no position on *which* — only that the values are consistent, enforced, and accessible.

## Application

- Most of a surface is `--bg`; a minority is `--bg-card` + `--border`; accents are a small fraction. (Each profile records its own ratio under `ratio` in `tokens.json`.)
- **No gradients.** Flat fills only. (`lint.mjs` flags `linear-gradient`/`radial-gradient`.)
- `--emphasis` appears at most once per section, on a single number or word the reader should remember.
- Don't hand-pick a hex in an artifact — reference a token. `lint.mjs` flags off-token hex against the profile palette.

## Accessibility

Every text/large pairing must pass WCAG AA — computed, not eyeballed:

```
node tooling/contrast-check.mjs profiles/<name>
```

See `accessibility.md` for the thresholds.
