import type { LucideIcon, LucideProps } from "lucide-react";
import { cx } from "../../utils/cx";

const SIZES = { xs: 12, sm: 14, md: 16, lg: 20 } as const;

/** Named icon sizes in pixels: `xs` 12, `sm` 14, `md` 16, `lg` 20. */
export type IconSize = keyof typeof SIZES;

/** Props for {@link Icon}. */
export interface IconProps extends Omit<LucideProps, "ref" | "size"> {
  /** Any icon from `@ionnet/neutronic-react/icons` (Lucide). */
  icon: LucideIcon;
  /** Named size or pixel value. Defaults to `"md"`. */
  size?: IconSize | number;
  /** Accessible name. When omitted, the icon is hidden from assistive technology. */
  label?: string;
}

/**
 * Renders a Lucide icon with Neutronic's stroke weight and sizing.
 *
 * @example <Icon icon={Search} size="sm" />
 */
export function Icon({ icon: Glyph, size = "md", label, strokeWidth = 1.5, className, ...rest }: IconProps) {
  const pixels = typeof size === "number" ? size : SIZES[size];
  return (
    <Glyph
      size={pixels}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
      className={cx("nt-icon", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      {...rest}
    />
  );
}
