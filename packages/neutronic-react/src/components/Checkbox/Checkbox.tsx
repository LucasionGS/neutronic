import { forwardRef, useId, type ReactNode } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";

/** Props for {@link Checkbox}. Accepts all Base UI `Checkbox.Root` props such as `checked` and `onCheckedChange`. */
export interface CheckboxProps extends Omit<BaseCheckbox.Root.Props, "className" | "render" | "children"> {
  /** Text shown next to the box. Clicking it toggles the checkbox. Without it, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  className?: string;
}

/**
 * A square checkbox with an optional label and description. Supports an indeterminate state.
 *
 * @example <Checkbox label="Email me when a build fails" defaultChecked />
 */
export const Checkbox = forwardRef<HTMLElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate, disabled, className, ...rest },
  ref,
) {
  const descriptionId = useId();
  const hasText = label != null || description != null;

  const box = (
    <BaseCheckbox.Root
      ref={ref}
      className={cx("nt-checkbox nt-focus", !hasText && className)}
      indeterminate={indeterminate}
      disabled={disabled}
      aria-describedby={description != null ? descriptionId : undefined}
      {...rest}
    >
      <BaseCheckbox.Indicator className="nt-checkbox-indicator">
        <Icon icon={indeterminate ? Minus : Check} size={12} strokeWidth={2.5} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!hasText) return box;

  return (
    <label className={cx("nt-choice", className)} data-disabled={disabled || undefined}>
      {box}
      <span className="nt-choice-text">
        {label != null && <span className="nt-choice-label">{label}</span>}
        {description != null && (
          <span id={descriptionId} className="nt-choice-description">
            {description}
          </span>
        )}
      </span>
    </label>
  );
});
