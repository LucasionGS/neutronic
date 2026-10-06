# Conventions

## Layering

- **Tokens** live in `packages/neutronic/src/tokens/*.ts` as typed objects. A leaf is either a static string or
  `{ dark, light }`. `scripts/build-tokens.ts` turns them into CSS custom properties (`--nt-<path>`) and JSON.
  Never hand-edit `src/generated`.
- **Component CSS** lives in `packages/neutronic/src/styles/components/<name>.css`, so every framework package
  renders identically. It only references `--nt-*` variables, never literal colors.
- **Framework packages** (`neutronic-react`, later others) add behavior, state and accessibility, and output the
  class names and data attributes the CSS expects.

## Styling

- Class names are prefixed `nt-`. Component parts are `nt-<component>-<part>`.
- State and variants go through data attributes (`data-variant`, `data-size`, `data-checked`, `data-highlighted`,
  …), mostly the ones Base UI already sets.
- Private per-component variables use the `--_name` form.
- Default control height is `--nt-size-control-md` (32px). `sm` and `lg` are 28px and 40px.
- Interface text (buttons, tabs, field prefixes, headings) uses IBM Plex Mono in normal case. Body text uses Plex Sans.

## The bracket motif

| Class | Effect | Pseudo-element |
| --- | --- | --- |
| `nt-focus` | Corner brackets on keyboard focus | `::after` |
| `nt-focus-within` | Same, when a descendant has focus | `::after` |
| `nt-bracket` | Permanent brackets (panels, overlays, selection) | `::before` |

Don't use the reserved pseudo-element on an element that carries one of these classes. `data-bracket="sm"` gives
the small 1px variant used for selected items.

## Theming

Dark is the default. Set `data-nt-theme="light"` or `"dark"` on any element to theme its subtree.
`ThemeProvider` does this on `<html>` and persists the choice.

## React components

- Ergonomic props for common cases (`<Select options label />`). Use compound namespaces (`Menu.Item`,
  `Dialog.Content`) where composition is the point.
- Every exported symbol has a JSDoc comment. Don't add comments anywhere else.
- Wrap single elements with `forwardRef`, merge classes with `cx`, and export the props interface.

## Docs

Every file in `apps/docs/src/pages/*.tsx` exports `meta` (slug, title, group, description) and a default
component. It is picked up automatically. Use `Page`, `Section`, `Example` and `PropsTable` from `src/docs/Page`.
