# @ionnet/neutronic

Framework-agnostic core of the Neutronic design system: typed design tokens, base styles and the CSS for every component.

## Features

- Design tokens defined in TypeScript and shipped as:
  - CSS custom properties (`--nt-color-accent`, `--nt-space-4`, …)
  - JSON, for use from other languages
  - typed `var()` references (`vars.color.accent`)
- Dark and light themes, dark by default. Any element can switch its subtree with `data-nt-theme`.
- Component CSS driven by `nt-*` classes and data attributes, so any framework can render it.
- IBM Plex Sans and Mono bundled through `@fontsource`.

## Installation

```sh
npm install @ionnet/neutronic
```

## Usage

```ts
import "@ionnet/neutronic/styles.css";
```

Use `@ionnet/neutronic/styles-no-fonts.css` if you load the fonts yourself, or `@ionnet/neutronic/tokens.css` for the
variables alone.

```html
<button class="nt-button nt-focus" data-variant="primary">Deploy</button>
```

```ts
import { applyTheme, vars, tokens } from "@ionnet/neutronic";

applyTheme("light");
element.style.color = vars.color.textMuted;
```

For React components, see [`@ionnet/neutronic-react`](https://www.npmjs.com/package/@ionnet/neutronic-react).
