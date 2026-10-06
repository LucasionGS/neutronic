/** A token value that differs between the dark and light themes. */
export interface ThemedValue {
  readonly dark: string;
  readonly light: string;
}

/** A token leaf: either a static CSS value or a per-theme value. */
export type TokenValue = string | ThemedValue;

/** A nested group of tokens. Each path through the tree becomes one CSS custom property. */
export interface TokenTree {
  readonly [key: string]: TokenValue | TokenTree;
}

/** Returns `true` if `value` is a {@link ThemedValue} leaf rather than a nested group. */
export function isThemedValue(value: unknown): value is ThemedValue {
  if (typeof value !== "object" || value === null) return false;
  const keys = Object.keys(value);
  return (
    keys.length === 2 &&
    typeof (value as ThemedValue).dark === "string" &&
    typeof (value as ThemedValue).light === "string"
  );
}

/** Returns `true` if `value` is a leaf token rather than a nested group. */
export function isTokenValue(value: unknown): value is TokenValue {
  return typeof value === "string" || isThemedValue(value);
}
