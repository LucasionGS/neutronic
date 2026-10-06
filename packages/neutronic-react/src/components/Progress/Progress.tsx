import { forwardRef, type ReactNode } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../../utils/cx";

/** Color of a progress or meter fill. */
export type ProgressTone = "accent" | "success" | "warning" | "danger";

/** Props for {@link Progress}. */
export interface ProgressProps extends Omit<BaseProgress.Root.Props, "className" | "children" | "render"> {
  /** Visible label above the track, also used as the accessible name. */
  label?: ReactNode;
  /** Shows the formatted value at the end of the header. */
  showValue?: boolean;
  /** Track thickness. Defaults to `"md"`. */
  size?: "sm" | "md";
  /** Fill color. Defaults to `"accent"`. */
  tone?: ProgressTone;
  className?: string;
}

/** Props for {@link Meter}. */
export interface MeterProps extends Omit<BaseMeter.Root.Props, "className" | "children" | "render"> {
  /** Visible label above the track, also used as the accessible name. */
  label?: ReactNode;
  /** Shows the formatted value at the end of the header. */
  showValue?: boolean;
  /** Custom display for the value, e.g. `(value) => \`${value} GB\``. */
  formatValue?: (value: number, formatted: string) => ReactNode;
  /** Upper bound of the low range. Used with `high` and `optimum` to pick a tone automatically. */
  low?: number;
  /** Lower bound of the high range. */
  high?: number;
  /** The ideal value. Its position relative to `low` and `high` decides which range is good. */
  optimum?: number;
  /** Fixed fill color. Overrides the tone derived from `low`, `high` and `optimum`. */
  tone?: ProgressTone;
  /** Track thickness. Defaults to `"md"`. */
  size?: "sm" | "md";
  className?: string;
}

type Region = "low" | "mid" | "high";

const regionOf = (value: number, low: number, high: number): Region =>
  value < low ? "low" : value > high ? "high" : "mid";

/**
 * Picks a tone the way the HTML `<meter>` element does: the region containing `optimum` is good (success),
 * an adjacent region is suboptimal (warning) and the far region is bad (danger).
 */
export function meterTone(
  value: number,
  { min = 0, max = 100, low, high, optimum }: Pick<MeterProps, "min" | "max" | "low" | "high" | "optimum">,
): ProgressTone {
  if (low == null && high == null) return "accent";
  const lo = low ?? min;
  const hi = high ?? max;
  const current = regionOf(value, lo, hi);
  const best = regionOf(optimum ?? (min + max) / 2, lo, hi);
  if (current === best) return "success";
  if (best === "mid" || current === "mid") return "warning";
  return "danger";
}

/**
 * Shows task completion. Pass `value={null}` for an indeterminate sweep.
 *
 * @example <Progress label="Uploading image" value={42} showValue />
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { label, showValue, size = "md", tone = "accent", className, ...rest },
  ref,
) {
  return (
    <BaseProgress.Root ref={ref} className={cx("nt-progress", className)} data-size={size} data-tone={tone} {...rest}>
      {(label != null || showValue) && (
        <div className="nt-progress-header">
          {label != null && <BaseProgress.Label className="nt-progress-label">{label}</BaseProgress.Label>}
          {showValue && <BaseProgress.Value className="nt-progress-value" />}
        </div>
      )}
      <BaseProgress.Track className="nt-progress-track">
        <BaseProgress.Indicator className="nt-progress-indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
});

/**
 * Shows a measurement within a known range, such as disk usage or CPU load.
 *
 * @example <Meter label="Disk" value={82} low={60} high={80} optimum={0} showValue />
 */
export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  { label, showValue, formatValue, low, high, optimum, tone, size = "md", className, ...rest },
  ref,
) {
  const resolvedTone = tone ?? meterTone(rest.value, { min: rest.min, max: rest.max, low, high, optimum });
  return (
    <BaseMeter.Root
      ref={ref}
      className={cx("nt-progress nt-meter", className)}
      data-size={size}
      data-tone={resolvedTone}
      {...rest}
    >
      {(label != null || showValue) && (
        <div className="nt-progress-header">
          {label != null && <BaseMeter.Label className="nt-progress-label">{label}</BaseMeter.Label>}
          {showValue && (
            <BaseMeter.Value className="nt-progress-value">
              {formatValue ? (formatted, value) => formatValue(value, formatted) : null}
            </BaseMeter.Value>
          )}
        </div>
      )}
      <BaseMeter.Track className="nt-progress-track">
        <BaseMeter.Indicator className="nt-progress-indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
});
