/** A concrete color scheme that styles can be resolved against. */
export type ResolvedTheme = "light" | "dark";

/** A user-facing theme preference; `"system"` follows the OS setting. */
export type ThemeMode = ResolvedTheme | "system";

/** The attribute Neutronic reads to decide which token set is active. */
export const THEME_ATTRIBUTE = "data-nt-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Returns the OS-preferred theme, defaulting to `"light"` outside the browser. */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/** Resolves a theme preference to the concrete theme that should be rendered. */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

/**
 * Applies a theme to an element by setting {@link THEME_ATTRIBUTE}.
 *
 * @param mode - The preference to apply; `"system"` is resolved immediately.
 * @param target - The element to theme. Defaults to `document.documentElement`.
 * @returns The theme that was applied.
 */
export function applyTheme(mode: ThemeMode, target?: HTMLElement): ResolvedTheme {
  const resolved = resolveTheme(mode);
  (target ?? document.documentElement).setAttribute(THEME_ATTRIBUTE, resolved);
  return resolved;
}

/**
 * Subscribes to OS color-scheme changes.
 *
 * @returns A function that removes the listener.
 */
export function watchSystemTheme(callback: (theme: ResolvedTheme) => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const query = window.matchMedia(DARK_QUERY);
  const listener = (event: MediaQueryListEvent) => callback(event.matches ? "dark" : "light");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
