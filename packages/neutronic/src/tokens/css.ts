import { THEME_ATTRIBUTE } from "../theme";
import { isThemedValue, isTokenValue, type TokenTree, type TokenValue } from "./types";

/** Options for {@link toCss}. */
export interface ToCssOptions {
  /** Custom property prefix. Defaults to `"nt"`. */
  prefix?: string;
  /** Attribute used to select a theme. Defaults to {@link THEME_ATTRIBUTE}. */
  attribute?: string;
}

const kebab = (segment: string) => segment.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

/**
 * Builds the custom property name for a token path.
 *
 * @example tokenVarName(["color", "textMuted"]) // "--nt-color-text-muted"
 */
export function tokenVarName(path: readonly string[], prefix = "nt"): string {
  return `--${[prefix, ...path].map(kebab).join("-")}`;
}

/** Visits every leaf in a token tree with its path. */
export function walkTokens(
  tree: TokenTree,
  visit: (path: readonly string[], value: TokenValue) => void,
  path: readonly string[] = [],
): void {
  for (const [key, node] of Object.entries(tree)) {
    const next = [...path, key];
    if (isTokenValue(node)) visit(next, node);
    else walkTokens(node, visit, next);
  }
}

/**
 * Serializes a token tree to CSS custom properties.
 *
 * Static tokens go on `:root`. Themed tokens are emitted for the dark theme on `:root` (dark-first)
 * and for each `[data-nt-theme]` value, so any element can switch the theme of its subtree.
 */
export function toCss(tree: TokenTree, { prefix = "nt", attribute = THEME_ATTRIBUTE }: ToCssOptions = {}): string {
  const base: string[] = [];
  const dark: string[] = [];
  const light: string[] = [];

  walkTokens(tree, (path, value) => {
    const name = tokenVarName(path, prefix);
    if (isThemedValue(value)) {
      dark.push(`  ${name}: ${value.dark};`);
      light.push(`  ${name}: ${value.light};`);
    } else {
      base.push(`  ${name}: ${value};`);
    }
  });

  const block = (selector: string, scheme: string, lines: string[]) =>
    `${selector} {\n  color-scheme: ${scheme};\n${lines.join("\n")}\n}`;

  return [
    `:root {\n${base.join("\n")}\n}`,
    block(`:root,\n[${attribute}="dark"]`, "dark", dark),
    block(`[${attribute}="light"]`, "light", light),
  ].join("\n\n");
}
