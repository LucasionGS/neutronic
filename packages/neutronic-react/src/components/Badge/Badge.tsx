import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

/** Semantic color of a {@link Badge}. */
export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

/** Fill treatment of a {@link Badge}. */
export type BadgeAppearance = "soft" | "outline" | "solid";

/** Props for {@link Badge}. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Defaults to `"neutral"`. */
  variant?: BadgeVariant;
  /** Defaults to `"soft"`. */
  appearance?: BadgeAppearance;
  /** Adds a leading status dot. */
  dot?: boolean;
  /** Defaults to `"md"`. */
  size?: "sm" | "md";
}

/**
 * A compact status label.
 *
 * @example <Badge variant="success" dot>Online</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "neutral", appearance = "soft", dot, size = "md", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("nt-badge", className)}
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      {...rest}
    >
      {dot && <span className="nt-badge-dot" aria-hidden="true" />}
      {children}
    </span>
  );
});
