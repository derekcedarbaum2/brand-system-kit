# Tokens — Email Mode

Email clients butcher modern CSS. The ruleset is smaller, the fallbacks more aggressive. When in doubt, fewer styles, more inline.

## The rules

1. **Inline everything.** No `<style>` blocks for production email — most clients strip them. Inline every property on every element.
2. **Tables for layout.** Flexbox and grid don't work. Use `<table>` with `role="presentation"`.
3. **Web-safe fonts first, brand fonts as enhancement.** Outlook ignores Google Fonts.
4. **No custom properties / CSS variables.** Hex values only.
5. **Max width 600px.** Most email reading panes clip beyond this.

## Font stack

```
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

For monospace:
```
font-family: 'JetBrains Mono', 'Menlo', 'Consolas', monospace;
```

Inter loads where supported (Apple Mail, modern webmail). Falls back cleanly in Outlook.

## Color palette (hex-only, no vars)

Use the light-mode print palette — email is a white-background surface.

| Role | Hex |
|---|---|
| Charcoal headings | `#1C1C1C` |
| Body text | `#333333` |
| Secondary | `#666666` |
| Accent | `#3E5C8A` |
| Accent light | `#9FC7CD` |
| Border | `#E5E5E5` |
| Background | `#FFFFFF` |
| Card bg | `#F0EEE8` |

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
<a href="https://{{URL}}" style="color:#3E5C8A; text-decoration:underline;">link text</a>
```

Always include full URL — relative URLs break.

## Signature (plain text variant)

```
{{NAME}}
{{COMPANY}}
{{CONTACT}}
{{URL}}
```

## Signature (HTML variant)

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#333333; line-height:1.5;">
      <strong style="color:#1C1C1C; font-weight:600;">{{NAME}}</strong><br>
      <span style="color:#3E5C8A; font-family:'JetBrains Mono',Menlo,monospace; font-size:11px; text-transform:uppercase; letter-spacing:1.5px;">{{COMPANY}}</span><br>
      <a href="mailto:{{CONTACT}}" style="color:#3E5C8A;">{{CONTACT}}</a>&nbsp;&middot;&nbsp;
      <a href="https://{{URL}}" style="color:#3E5C8A;">{{URL}}</a>
    </td>
  </tr>
</table>
```

## What NOT to do in email

- Don't attach PDFs over 5MB — gmail cuts them off
- Don't rely on dark-mode styling — many clients force their own dark mode and break it
- Don't use SVG inline — Outlook won't render
- Don't use CSS animations, transforms, filters
- Don't use flexbox or CSS grid
- Don't set `border-radius` on anything Outlook will render — it ignores it (acceptable degradation)
- Don't use background images (most clients block them)
- Don't embed tracking pixels in outreach emails to enterprise prospects — many email systems flag them

## Minimum viable email

Most {{COMPANY}} email is plain text. That's fine — it's consistent with the brand's anti-decoration philosophy. Reserve HTML email for:

- Newsletter-style updates (infrequent)
- Proposal recap emails (where table-based structure helps)
- Event / webinar announcements

For everything else: plain text, one idea per paragraph, no signature images.
