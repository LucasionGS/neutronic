import type { TokenTree } from "./types";

/** Semantic color tokens. Every color is defined for both themes; dark is the primary design target. */
export const color = {
  /** Page background. */
  bg: { dark: "#08080b", light: "#ededf0" },
  /** Default surface for panels and cards. */
  surface: { dark: "#0e0e12", light: "#fafafc" },
  /** Surface that sits above `surface`, such as hovered rows and popovers. */
  surfaceRaised: { dark: "#15151b", light: "#ffffff" },
  /** Inset surface for inputs, tracks and wells. */
  sunken: { dark: "#030304", light: "#ffffff" },

  /** Default outline for controls and surfaces. */
  border: { dark: "#2e2e36", light: "#18181c" },
  /** Low-contrast dividers inside a surface. */
  borderMuted: { dark: "#202027", light: "#c9c9d1" },
  /** Emphasized outline for hover and active states. */
  borderStrong: { dark: "#4a4a55", light: "#000000" },

  /** Primary text. */
  text: { dark: "#f2f2f4", light: "#111114" },
  /** Secondary text such as labels and descriptions. */
  textMuted: { dark: "#91919c", light: "#585862" },
  /** Tertiary text such as placeholders and disabled labels. */
  textSubtle: { dark: "#62626c", light: "#8b8b95" },

  /** Brand accent used for primary actions, selection and focus. */
  accent: { dark: "oklch(0.74 0.16 288)", light: "oklch(0.52 0.21 285)" },
  /** Accent on hover or press. */
  accentHover: { dark: "oklch(0.80 0.13 288)", light: "oklch(0.46 0.21 285)" },
  /** Translucent accent for selected backgrounds. */
  accentSoft: { dark: "oklch(0.74 0.16 288 / 0.16)", light: "oklch(0.52 0.21 285 / 0.12)" },
  /** Text and icons placed on a solid `accent` background. */
  onAccent: { dark: "#130a26", light: "#ffffff" },

  success: { dark: "#6ee7a8", light: "#0a7a43" },
  successSoft: { dark: "rgb(110 231 168 / 0.14)", light: "rgb(10 122 67 / 0.1)" },
  warning: { dark: "#fbbf24", light: "#9a5b00" },
  warningSoft: { dark: "rgb(251 191 36 / 0.14)", light: "rgb(154 91 0 / 0.1)" },
  danger: { dark: "#ff6b74", light: "#c4202c" },
  dangerHover: { dark: "#ff8a91", light: "#a51722" },
  dangerSoft: { dark: "rgb(255 107 116 / 0.14)", light: "rgb(196 32 44 / 0.1)" },
  onDanger: { dark: "#1f0306", light: "#ffffff" },

  /** Background behind modal content. */
  scrim: { dark: "rgb(0 0 0 / 0.7)", light: "rgb(10 10 14 / 0.4)" },
} as const satisfies TokenTree;
