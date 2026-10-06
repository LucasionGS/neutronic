# Neutronic

A sharp, technical design system: typed design tokens, framework-agnostic CSS and React components.

| Package | Contents |
| --- | --- |
| [`@ionnet/neutronic`](packages/neutronic) | Tokens (TS source → CSS variables + JSON), base styles, component CSS, theme helpers. No framework dependency. |
| [`@ionnet/neutronic-react`](packages/neutronic-react) | React components built on [Base UI](https://base-ui.com), `ThemeProvider`, `Icon` (Lucide). |
| [`apps/docs`](apps/docs) | The documentation site and live playground. |

## Development

```sh
pnpm install
pnpm dev        # token watcher + docs site on http://localhost:5199
pnpm typecheck
```

Editing anything under `packages/*/src` hot-reloads the docs site. Token changes in
`packages/neutronic/src/tokens` regenerate `src/generated/tokens.css` and `tokens.json` automatically.

## Using it

```tsx
import "@ionnet/neutronic/styles.css";
import { NeutronicProvider, Button } from "@ionnet/neutronic-react";

<NeutronicProvider>
  <Button variant="primary">Deploy</Button>
</NeutronicProvider>;
```

Without React, include the CSS and use the class names directly, e.g. `<button class="nt-button nt-focus" data-variant="primary">`.

See [CONVENTIONS.md](CONVENTIONS.md) for how components are structured.
