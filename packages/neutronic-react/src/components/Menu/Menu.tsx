import { forwardRef, type ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check, ChevronRight } from "lucide-react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";

type Side = NonNullable<BaseMenu.Positioner.Props["side"]>;
type Align = NonNullable<BaseMenu.Positioner.Props["align"]>;

/** Props for {@link MenuContent}. */
export interface MenuContentProps extends Omit<BaseMenu.Popup.Props, "className"> {
  /** Side of the trigger to open on. Defaults to `"bottom"`, or `"inline-end"` inside a submenu. */
  side?: Side;
  /** Alignment against the trigger. Defaults to `"start"`. */
  align?: Align;
  /** Gap between trigger and menu in pixels. Defaults to `4`. */
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}

/** Props for {@link MenuItem}. */
export interface MenuItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  /** Icon shown in the leading column. */
  icon?: ReactNode;
  /** Keyboard shortcut hint shown at the trailing edge, such as `"⌘K"`. */
  shortcut?: ReactNode;
  /** Colors the item as destructive. */
  danger?: boolean;
  className?: string;
}

/** Props for {@link MenuCheckboxItem}. */
export interface MenuCheckboxItemProps extends Omit<BaseMenu.CheckboxItem.Props, "className"> {
  shortcut?: ReactNode;
  className?: string;
}

/** Props for {@link MenuRadioItem}. */
export interface MenuRadioItemProps extends Omit<BaseMenu.RadioItem.Props, "className"> {
  shortcut?: ReactNode;
  className?: string;
}

/** Props for {@link MenuSubmenuTrigger}. */
export interface MenuSubmenuTriggerProps extends Omit<BaseMenu.SubmenuTrigger.Props, "className"> {
  icon?: ReactNode;
  className?: string;
}

/** The floating list of a menu. Renders the portal, positioner and popup in one part. */
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  { side, align = "start", sideOffset = 4, alignOffset, className, ...rest },
  ref,
) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="nt-popup-positioner nt-bracket"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BaseMenu.Popup ref={ref} className={cx("nt-popup nt-menu", className)} {...rest} />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
});

/** An action in a menu. */
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { icon, shortcut, danger, className, children, ...rest },
  ref,
) {
  return (
    <BaseMenu.Item ref={ref} className={cx("nt-popup-item nt-menu-item", className)} data-danger={danger || undefined} {...rest}>
      {icon != null && <span className="nt-menu-icon">{icon}</span>}
      {children}
      {shortcut != null && <span className="nt-popup-item-shortcut">{shortcut}</span>}
    </BaseMenu.Item>
  );
});

/** A menu item that toggles an on/off setting and shows a check when on. */
export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(function MenuCheckboxItem(
  { shortcut, className, children, ...rest },
  ref,
) {
  return (
    <BaseMenu.CheckboxItem ref={ref} className={cx("nt-popup-item nt-menu-item", className)} {...rest}>
      <BaseMenu.CheckboxItemIndicator className="nt-popup-item-indicator">
        <Icon icon={Check} size="sm" />
      </BaseMenu.CheckboxItemIndicator>
      {children}
      {shortcut != null && <span className="nt-popup-item-shortcut">{shortcut}</span>}
    </BaseMenu.CheckboxItem>
  );
});

/** A menu item that picks one value inside a {@link MenuRadioGroup}. */
export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(function MenuRadioItem(
  { shortcut, className, children, ...rest },
  ref,
) {
  return (
    <BaseMenu.RadioItem ref={ref} className={cx("nt-popup-item nt-menu-item", className)} {...rest}>
      <BaseMenu.RadioItemIndicator className="nt-popup-item-indicator">
        <span className="nt-menu-radio-mark" />
      </BaseMenu.RadioItemIndicator>
      {children}
      {shortcut != null && <span className="nt-popup-item-shortcut">{shortcut}</span>}
    </BaseMenu.RadioItem>
  );
});

/** A menu item that opens a nested {@link MenuSubmenu}. */
export const MenuSubmenuTrigger = forwardRef<HTMLDivElement, MenuSubmenuTriggerProps>(function MenuSubmenuTrigger(
  { icon, className, children, ...rest },
  ref,
) {
  return (
    <BaseMenu.SubmenuTrigger ref={ref} className={cx("nt-popup-item nt-menu-item", className)} {...rest}>
      {icon != null && <span className="nt-menu-icon">{icon}</span>}
      {children}
      <span className="nt-menu-submenu-arrow">
        <Icon icon={ChevronRight} size="sm" />
      </span>
    </BaseMenu.SubmenuTrigger>
  );
});

/** A divider between groups of menu items. */
export const MenuSeparator = forwardRef<HTMLDivElement, Omit<BaseMenu.Separator.Props, "className"> & { className?: string }>(
  function MenuSeparator({ className, ...rest }, ref) {
    return <BaseMenu.Separator ref={ref} className={cx("nt-popup-separator", className)} {...rest} />;
  },
);

/** A small heading for a {@link MenuGroup} or {@link MenuRadioGroup}. */
export const MenuLabel = forwardRef<HTMLDivElement, Omit<BaseMenu.GroupLabel.Props, "className"> & { className?: string }>(
  function MenuLabel({ className, ...rest }, ref) {
    return <BaseMenu.GroupLabel ref={ref} className={cx("nt-popup-label", className)} {...rest} />;
  },
);

/** The menu state container. Accepts Base UI `Menu.Root` props such as `open` and `onOpenChange`. */
export const MenuRoot = BaseMenu.Root;

/** The element that opens the menu. Pass `render={<Button />}` to use a Neutronic button. */
export const MenuTrigger = BaseMenu.Trigger;

/** Groups related items; label it with {@link MenuLabel}. */
export const MenuGroup = BaseMenu.Group;

/** Groups {@link MenuRadioItem}s that share one selected `value`. */
export const MenuRadioGroup = BaseMenu.RadioGroup;

/** Wraps a {@link MenuSubmenuTrigger} and a nested {@link MenuContent}. */
export const MenuSubmenu = BaseMenu.SubmenuRoot;

/**
 * A list of actions that opens from a trigger, with full keyboard navigation.
 *
 * @example
 * <Menu.Root>
 *   <Menu.Trigger render={<Button />}>Actions</Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.Item shortcut="⌘R">Restart</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item danger>Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu.Root>
 */
export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Group: MenuGroup,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Submenu: MenuSubmenu,
  SubmenuTrigger: MenuSubmenuTrigger,
};
