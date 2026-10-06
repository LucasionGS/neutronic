import { forwardRef, useId, type ReactNode } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../Button/Button";

/** Props for {@link Switch}. Accepts all Base UI `Switch.Root` props such as `checked` and `onCheckedChange`. */
export interface SwitchProps extends Omit<BaseSwitch.Root.Props, "className" | "render" | "children"> {
  /** Text shown next to the switch. Clicking it toggles the switch. Without it, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  /** `"end"` puts the label after the switch; `"start"` puts it first and pushes the switch to the far edge, like a settings row. Defaults to `"end"`. */
  labelPosition?: "start" | "end";
  /** Defaults to `"md"`. */
  size?: ControlSize;
  className?: string;
}

/**
 * An on/off toggle with a square track and sliding thumb.
 *
 * @example <Switch label="Auto-deploy" description="Build on every push to main" defaultChecked />
 */
export const Switch = forwardRef<HTMLElement, SwitchProps>(function Switch(
  { label, description, labelPosition = "end", size = "md", disabled, className, ...rest },
  ref,
) {
  const descriptionId = useId();
  const hasText = label != null || description != null;

  const control = (
    <BaseSwitch.Root
      ref={ref}
      className={cx("nt-switch nt-focus", !hasText && className)}
      data-size={size}
      disabled={disabled}
      aria-describedby={description != null ? descriptionId : undefined}
      {...rest}
    >
      <BaseSwitch.Thumb className="nt-switch-thumb" />
    </BaseSwitch.Root>
  );

  if (!hasText) return control;

  return (
    <label
      className={cx("nt-choice", className)}
      data-label-position={labelPosition}
      data-disabled={disabled || undefined}
    >
      {control}
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
