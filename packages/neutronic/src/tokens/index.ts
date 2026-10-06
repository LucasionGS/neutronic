import { color } from "./color";
import { bracket, font, leading, motion, radius, shadow, size, space, text, tracking, weight, z } from "./scale";
import type { TokenTree } from "./types";
import { createVars } from "./vars";

/** The complete Neutronic token tree. This is the single source of truth for generated CSS and JSON. */
export const tokens = {
  color,
  font,
  text,
  weight,
  leading,
  tracking,
  space,
  size,
  radius,
  bracket,
  motion,
  shadow,
  z,
} as const satisfies TokenTree;

/** Type of {@link tokens}. */
export type Tokens = typeof tokens;

/**
 * Typed `var()` references for every token, for use in inline styles and CSS-in-JS.
 *
 * @example style={{ color: vars.color.textMuted, padding: vars.space[4] }}
 */
export const vars = createVars(tokens);

export * from "./types";
export * from "./css";
export * from "./vars";
