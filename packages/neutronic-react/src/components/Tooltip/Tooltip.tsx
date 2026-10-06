import type { ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cx } from "../../utils/cx";

type Side = NonNullable<BaseTooltip.Positioner.Props["side"]>;
type Align = NonNullable<BaseTooltip.Positioner.Props["align"]>;

/** Props for {@link TooltipProvider}. */
export interface TooltipProviderProps {
  children: ReactNode;
  /** Milliseconds before a tooltip opens on hover. Defaults to `500`. */
  delay?: number;
  /** Milliseconds before a tooltip closes after the pointer leaves. */
  closeDelay?: number;
  /** Window in milliseconds during which moving to another trigger opens its tooltip instantly. Defaults to `400`. */
  timeout?: number;
}

/** Props for {@link Tooltip}. */
export interface TooltipProps {
  /** The tooltip text. Keep it short; tooltips are not for interactive content. */
  content: ReactNode;
  /** A single element that accepts a ref, such as a {@link Button}. */
  children: ReactElement;
  /** Side of the trigger to open on. Defaults to `"top"`. */
  side?: Side;
  /** Alignment against the trigger. Defaults to `"center"`. */
  align?: Align;
  /** Gap between trigger and tooltip in pixels. Defaults to `6`. */
  sideOffset?: number;
  /** Milliseconds before opening on hover. Overrides the provider. */
  delay?: number;
  /** Milliseconds before closing after the pointer leaves. Overrides the provider. */
  closeDelay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Class name for the tooltip popup. */
  className?: string;
}

/** Shares hover delays between tooltips so moving across a toolbar feels instant. Place it near the app root. */
export function TooltipProvider({ children, delay = 500, closeDelay, timeout }: TooltipProviderProps) {
  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay} timeout={timeout}>
      {children}
    </BaseTooltip.Provider>
  );
}

/**
 * A short label that appears when the child element is hovered or focused.
 *
 * @example
 * <Tooltip content="Restart node">
 *   <Button iconOnly aria-label="Restart"><Icon icon={RotateCw} /></Button>
 * </Tooltip>
 */
export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delay,
  closeDelay,
  disabled,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: TooltipProps) {
  return (
    <BaseTooltip.Root
      disabled={disabled}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange ? (next) => onOpenChange(next) : undefined}
    >
      <BaseTooltip.Trigger render={children} delay={delay} closeDelay={closeDelay} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className="nt-tooltip-positioner" side={side} align={align} sideOffset={sideOffset}>
          <BaseTooltip.Popup className={cx("nt-tooltip", className)}>{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
