import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cx } from "../../utils/cx";

/** Props for {@link Separator}. */
export interface SeparatorProps extends Omit<ComponentPropsWithoutRef<typeof BaseSeparator>, "className"> {
  /** Text centered on a horizontal separator, such as "or" or a section name. */
  label?: ReactNode;
  /** Uses the stronger border color. */
  strong?: boolean;
  className?: string;
}

/**
 * A thin rule that divides content. Horizontal by default; pass `orientation="vertical"` inside a row.
 *
 * @example <Separator label="Advanced" />
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { label, strong, orientation = "horizontal", className, ...rest },
  ref,
) {
  if (label != null && orientation === "horizontal") {
    return (
      <div ref={ref} className={cx("nt-separator-labeled", className)} role="separator" aria-orientation="horizontal">
        <span className="nt-separator" data-orientation="horizontal" data-strong={strong || undefined} />
        <span>{label}</span>
        <span className="nt-separator" data-orientation="horizontal" data-strong={strong || undefined} />
      </div>
    );
  }
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={cx("nt-separator", className)}
      data-strong={strong || undefined}
      {...rest}
    />
  );
});
