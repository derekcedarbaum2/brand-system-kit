# Tokens: Email Mode

Email clients butcher modern CSS. The ruleset is smaller, the fallbacks more aggressive. When in doubt, fewer styles, more inline.

## The rules

1. **Inline everything.** No `<style>` blocks for production email; most clients strip them. Inline every property on every element.
2. **Tables for layout.** Flexbox and grid don't work. Use `<table>` with `role="presentation"`.
3. **Web-safe fonts first, brand fonts as enhancement.** Outlook ignores Google Fonts.
4. **No custom properties / CSS variables.** Hex values only; copy the literal values out of your profile's `tokens.json`.
5. **Max width 600px.** Most email reading panes clip beyond this.

## Font stack

Lead with your profile's `sans` token, then web-safe fallbacks:

```
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

For monospace (your profile's `mono` token first):
```
font-family: 'JetBrains Mono', 'Menlo', 'Consolas', monospace;
```

The brand font loads where supported (Apple Mail, modern webmail) and falls back cleanly in Outlook.

## Color palette (hex-only, no vars)

Email is a light-background surface, so copy the literal hexes from a light-register profile's `tokens.json` (e.g. Northwind). The roles:

| Email element | Token to copy from `tokens.json` |
|---|---|
| Headings | `text-primary` |
| Body text | `text-body` |
| Secondary | `text-secondary` |
| Links / accent | `accent` |
| Secondary accent | `accent-2` |
| Border | `border` |
| Background | `bg` |
| Card bg | `bg-card` |

Because the values are pasted, re-check the email whenever the profile's tokens change. `lint.mjs` still catches drift: any pasted hex that no longer matches the palette warns as off-token.

## Type scale

| Element | Size | Weight |
|---|---|---|
| H1 (subject-style hed) | 22px | 800 |
| H2 | 16px | 700 |
| Body | 14px | 400 |
| Fine print | 11px | 400 |

Line height: 1.6 for body, 1.3 for headings.

## Links

```html
<a href="https://{{URL}}" style="color:#1F6E7A; text-decoration:underline;">link text</a>
```

(`#1F6E7A` is Northwind's `accent`; substitute your profile's value.) Always include the full URL; relative URLs break.

## Signature (plain text variant)

```
{{NAME}}
{{BRAND}}
{{CONTACT}}
{{URL}}
```

`{{BRAND}}`, `{{CONTACT}}`, and `{{URL}}` come from the profile's `lint` group in `tokens.json` (`company-name`, `contact`, `url`).

## Signature (HTML variant)

Hexes below are Northwind's `text-body`, `text-primary`, and `accent`; substitute your profile's values.

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#353B3A; line-height:1.5;">
      <strong style="color:#161A19; font-weight:600;">{{NAME}}</strong><br>
      <span style="color:#1F6E7A; font-family:'JetBrains Mono',Menlo,monospace; font-size:11px; text-transform:uppercase; letter-spacing:1.5px;">{{BRAND}}</span><br>
      <a href="mailto:{{CONTACT}}" style="color:#1F6E7A;">{{CONTACT}}</a>&nbsp;&middot;&nbsp;
      <a href="https://{{URL}}" style="color:#1F6E7A;">{{URL}}</a>
    </td>
  </tr>
</table>
```

## What NOT to do in email

- Don't attach PDFs over 5MB; gmail cuts them off
- Don't rely on dark-mode styling; many clients force their own dark mode and break it
- Don't use SVG inline; Outlook won't render
- Don't use CSS animations, transforms, filters
- Don't use flexbox or CSS grid
- Don't set `border-radius` on anything Outlook will render; it ignores it (acceptable degradation)
- Don't use background images (most clients block them)
- Don't embed tracking pixels; many email systems flag them

## Minimum viable email

Most email under this system is plain text. That's fine; it's consistent with the anti-decoration philosophy. Reserve HTML email for:

- Newsletter-style updates (infrequent)
- Proposal recap emails (where table-based structure helps)
- Event / webinar announcements

For everything else: plain text, one idea per paragraph, no signature images.
