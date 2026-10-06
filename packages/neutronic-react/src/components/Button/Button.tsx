import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "../../utils/cx";

/** Visual emphasis of a {@link Button}. */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

/** Size scale shared by controls. */
export type ControlSize = "sm" | "md" | "lg";

/** Props for {@link Button}. Accepts all native `<button>` attributes. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defaults to `"secondary"`, which renders side brackets instead of a full border. */
  variant?: ButtonVariant;
  /** Defaults to `"md"`. */
  size?: ControlSize;
  /** Renders a square button. Provide an `aria-label`, since there is no visible text. */
  iconOnly?: boolean;
}

/** A clickable action. Renders a native `<button>` styled by the `nt-button` class. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", iconOnly, type = "button", className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx("nt-button nt-focus", className)}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      {...rest}
    />
  );
});
