import { forwardRef, useId, type ReactNode } from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cx } from "../../utils/cx";

/** One choice in a {@link RadioGroup} built from the `options` prop. */
export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

/** Props for {@link Radio}. */
export interface RadioProps extends Omit<BaseRadio.Root.Props, "className" | "render" | "children" | "value"> {
  /** Value selected in the parent group when this radio is chosen. */
  value: string;
  /** Text shown next to the radio. Without it, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  className?: string;
}

/** Props for {@link RadioGroup}. */
export interface RadioGroupProps
  extends Omit<BaseRadioGroup.Props<string>, "className" | "render" | "children" | "onValueChange"> {
  /** Visible group label. Also used as the group's accessible name. */
  label?: ReactNode;
  /** Helper text under the group label. */
  description?: ReactNode;
  /** Choices to render. Alternatively pass `<Radio>` children. */
  options?: RadioOption[];
  /** Stacks choices vertically or lays them out in a wrapping row. Defaults to `"vertical"`. */
  orientation?: "vertical" | "horizontal";
  /** Called with the newly selected value. */
  onValueChange?: (value: string, eventDetails: BaseRadioGroup.ChangeEventDetails) => void;
  children?: ReactNode;
  className?: string;
}

/**
 * A single option within a {@link RadioGroup}.
 *
 * @example <Radio value="ssd" label="SSD" description="Fastest, highest cost." />
 */
export const Radio = forwardRef<HTMLElement, RadioProps>(function Radio(
  { label, description, disabled, className, ...rest },
  ref,
) {
  const descriptionId = useId();
  const hasText = label != null || description != null;

  const dot = (
    <BaseRadio.Root
      ref={ref}
      className={cx("nt-radio nt-focus", !hasText && className)}
      disabled={disabled}
      aria-describedby={description != null ? descriptionId : undefined}
      {...rest}
    >
      <BaseRadio.Indicator className="nt-radio-indicator" keepMounted />
    </BaseRadio.Root>
  );

  if (!hasText) return dot;

  return (
    <label className={cx("nt-choice", className)} data-disabled={disabled || undefined}>
      {dot}
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

/**
 * A set of mutually exclusive choices with an optional group label.
 *
 * @example
 * <RadioGroup
 *   label="Storage"
 *   defaultValue="ssd"
 *   options={[{ value: "ssd", label: "SSD" }, { value: "hdd", label: "HDD" }]}
 * />
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { label, description, options, orientation = "vertical", className, children, ...rest },
  ref,
) {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <div className={cx("nt-radio-field", className)}>
      {label != null && (
        <div id={labelId} className="nt-label">
          {label}
        </div>
      )}
      {description != null && (
        <p id={descriptionId} className="nt-field-description">
          {description}
        </p>
      )}
      <BaseRadioGroup<string>
        ref={ref}
        className="nt-radio-group"
        data-orientation={orientation}
        aria-labelledby={label != null ? labelId : undefined}
        aria-describedby={description != null ? descriptionId : undefined}
        aria-orientation={orientation}
        {...rest}
      >
        {options?.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
          />
        ))}
        {children}
      </BaseRadioGroup>
    </div>
  );
});
