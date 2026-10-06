import type { TokenTree } from "./types";

/** Font families. Neutronic does not load fonts itself; include IBM Plex Sans and Mono in your app. */
export const font = {
  sans: '"IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
} as const satisfies TokenTree;

/** Font sizes. The base UI size is `md` (14px). */
export const text = {
  "2xs": "0.6875rem",
  xs: "0.75rem",
  sm: "0.8125rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
} as const satisfies TokenTree;

export const weight = {
  regular: "400",
  medium: "500",
  semibold: "600",
} as const satisfies TokenTree;

export const leading = {
  tight: "1.2",
  normal: "1.5",
} as const satisfies TokenTree;

/** Letter spacing. `label` is used for uppercase mono labels. */
export const tracking = {
  tight: "-0.01em",
  normal: "0",
  label: "0.08em",
} as const satisfies TokenTree;

/** Spacing on a 4px grid. Keys are multiples of 4px. */
export const space = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
} as const satisfies TokenTree;

/** Fixed component dimensions. */
export const size = {
  control: {
    sm: "1.75rem",
    md: "2rem",
    lg: "2.5rem",
  },
} as const satisfies TokenTree;

/** Corner radii. Sharp by default; raise `control` and `surface` to soften the whole system. */
export const radius = {
  control: "0",
  surface: "0",
  full: "9999px",
} as const satisfies TokenTree;

/** Geometry of the corner-bracket motif used for focus, panels, overlays and selection. */
export const bracket = {
  /** Length of each bracket arm. */
  size: "8px",
  /** Length of each bracket arm on large surfaces such as panels and dialogs. */
  sizeLg: "10px",
  /** Stroke thickness of the bracket. */
  width: "2px",
  /** Gap between a focused element and its focus brackets. */
  focusOffset: "4px",
} as const satisfies TokenTree;

export const motion = {
  duration: {
    fast: "100ms",
    normal: "180ms",
    slow: "280ms",
  },
  ease: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const satisfies TokenTree;

export const shadow = {
  /** Elevation for floating layers such as menus, popovers and dialogs. */
  overlay: {
    dark: "0 0 0 1px rgb(0 0 0 / 0.6), 0 12px 32px rgb(0 0 0 / 0.6)",
    light: "0 12px 32px rgb(10 10 14 / 0.14)",
  },
} as const satisfies TokenTree;

/** Stacking order for layered UI. */
export const z = {
  dropdown: "1000",
  sticky: "1100",
  overlay: "1200",
  modal: "1300",
  toast: "1400",
  tooltip: "1500",
} as const satisfies TokenTree;
