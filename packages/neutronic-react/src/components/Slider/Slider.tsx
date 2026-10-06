import { Fragment, forwardRef, type ReactNode } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../Button/Button";

/** Props for {@link Slider}. Pass an array as `value` or `defaultValue` for a range with one thumb per entry. */
export interface SliderProps extends Omit<BaseSlider.Root.Props, "className" | "render" | "children"> {
  /** Visible label above the track. Without it, pass `aria-label`, which is applied to each thumb. */
  label?: ReactNode;
  /** Shows the current value at the right end of the header. */
  showValue?: boolean;
  /** Formats each value for the readout. Defaults to the locale-formatted number. */
  formatValue?: (value: number) => ReactNode;
  /** Defaults to `"md"`. */
  size?: ControlSize;
  className?: string;
}

/**
 * A draggable control for picking a number or a range.
 *
 * @example <Slider label="Replicas" showValue min={1} max={12} defaultValue={3} />
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  { label, showValue, formatValue, size = "md", className, value, defaultValue, "aria-label": ariaLabel, ...rest },
  ref,
) {
  const initial = value ?? defaultValue;
  const thumbCount = Array.isArray(initial) ? initial.length : 1;

  return (
    <BaseSlider.Root
      ref={ref}
      className={cx("nt-slider", className)}
      data-size={size}
      value={value}
      defaultValue={defaultValue}
      {...rest}
    >
      {(label != null || showValue) && (
        <div className="nt-slider-header">
          {label != null && <BaseSlider.Label className="nt-label">{label}</BaseSlider.Label>}
          {showValue && (
            <BaseSlider.Value className="nt-slider-value">
              {(formatted, values) =>
                values.map((v, i) => (
                  <Fragment key={i}>
                    {i > 0 && " – "}
                    {formatValue ? formatValue(v) : formatted[i]}
                  </Fragment>
                ))
              }
            </BaseSlider.Value>
          )}
        </div>
      )}
      <BaseSlider.Control className="nt-slider-control">
        <BaseSlider.Track className="nt-slider-track">
          <BaseSlider.Indicator className="nt-slider-indicator" />
          {Array.from({ length: thumbCount }, (_, i) => (
            <BaseSlider.Thumb key={i} index={i} className="nt-slider-thumb nt-focus-within" aria-label={ariaLabel} />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
});
