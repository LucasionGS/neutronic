import { forwardRef, type ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cx } from "../../utils/cx";

type Side = NonNullable<BasePopover.Positioner.Props["side"]>;
type Align = NonNullable<BasePopover.Positioner.Props["align"]>;

/** Props for {@link PopoverContent}. */
export interface PopoverContentProps extends Omit<BasePopover.Popup.Props, "className" | "title"> {
  /** Heading at the top of the popover, also used as its accessible name. */
  title?: ReactNode;
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Side of the trigger to open on. Defaults to `"bottom"`. */
  side?: Side;
  /** Alignment against the trigger. Defaults to `"center"`. */
  align?: Align;
  /** Gap between trigger and popover in pixels. Defaults to `6`. */
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}

/** The floating panel of a popover. Renders the portal, positioner and popup in one part. */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { title, description, side = "bottom", align = "center", sideOffset = 6, alignOffset, className, children, ...rest },
  ref,
) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="nt-popup-positioner nt-bracket"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BasePopover.Popup ref={ref} className={cx("nt-popup nt-popover", className)} {...rest}>
          {title != null && <BasePopover.Title className="nt-popover-title">{title}</BasePopover.Title>}
          {description != null && (
            <BasePopover.Description className="nt-popover-description">{description}</BasePopover.Description>
          )}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
});

/** The popover state container. Accepts Base UI `Popover.Root` props such as `open` and `onOpenChange`. */
export const PopoverRoot = BasePopover.Root;

/** The element that toggles the popover. Pass `render={<Button />}` to use a Neutronic button. */
export const PopoverTrigger = BasePopover.Trigger;

/** Closes the popover when clicked. Pass `render={<Button />}` to use a Neutronic button. */
export const PopoverClose = BasePopover.Close;

/**
 * A floating panel anchored to a trigger, for short forms, details or settings.
 *
 * @example
 * <Popover.Root>
 *   <Popover.Trigger render={<Button />}>Details</Popover.Trigger>
 *   <Popover.Content title="node-b" description="Healthy · 9ms">…</Popover.Content>
 * </Popover.Root>
 */
export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
};
