import { forwardRef, useState, type ReactNode } from "react";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../Button/Button";

/** One segment of a {@link SegmentedControl}. */
export interface SegmentedOption {
  value: string;
  label: ReactNode;
  /** Icon placed before the label. */
  icon?: ReactNode;
  disabled?: boolean;
  /** Accessible name, required when the segment only shows an icon. */
  "aria-label"?: string;
}

/** Props for {@link SegmentedControl}. */
export interface SegmentedControlProps {
  options: SegmentedOption[];
  /** Selected value when controlled. */
  value?: string;
  /** Initially selected value when uncontrolled. Defaults to the first option. */
  defaultValue?: string;
  /** Called with the newly selected value. A segment cannot be deselected. */
  onValueChange?: (value: string) => void;
  /** Defaults to `"md"`. */
  size?: ControlSize;
  /** Stretches segments to fill the container width. */
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * A row of mutually exclusive segments for switching between a few views or modes.
 *
 * @example
 * <SegmentedControl
 *   aria-label="Environment"
 *   defaultValue="staging"
 *   options={[{ value: "dev", label: "Dev" }, { value: "staging", label: "Staging" }, { value: "prod", label: "Prod" }]}
 * />
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { options, value, defaultValue, onValueChange, size = "md", fullWidth, disabled, className, ...aria },
  ref,
) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;

  return (
    <ToggleGroup
      ref={ref}
      className={cx("nt-segmented", className)}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-disabled={disabled || undefined}
      value={current === undefined ? [] : [current]}
      onValueChange={(next) => {
        const selected = next[0];
        if (selected === undefined) return;
        if (value === undefined) setInner(selected);
        onValueChange?.(selected);
      }}
      disabled={disabled}
      {...aria}
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          aria-label={option["aria-label"]}
          className="nt-segment nt-focus"
        >
          {option.icon}
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
});
