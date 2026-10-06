import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "../../utils/cx";

/** Visual style of a {@link Tabs} set. */
export type TabsVariant = "underline" | "boxed";

/** Props for `Tabs.Root`. */
export interface TabsRootProps extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Root>, "className"> {
  /** `"underline"` slides an accent bar under the active tab; `"boxed"` fills it inside a framed track. Defaults to `"underline"`. */
  variant?: TabsVariant;
  className?: string;
}

/** Props for `Tabs.List`. */
export interface TabsListProps extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.List>, "className"> {
  className?: string;
}

/** Props for `Tabs.Tab`. */
export interface TabsTabProps extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Tab>, "className"> {
  className?: string;
}

/** Props for `Tabs.Panel`. */
export interface TabsPanelProps extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Panel>, "className"> {
  className?: string;
}

/** Groups a tab list with its panels and tracks which tab is active. */
export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
  { variant = "underline", className, ...rest },
  ref,
) {
  return <BaseTabs.Root ref={ref} className={cx("nt-tabs", className)} data-variant={variant} {...rest} />;
});

/** The row of tabs. Renders the sliding active-tab indicator after its children. */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, ...rest },
  ref,
) {
  return (
    <BaseTabs.List ref={ref} className={cx("nt-tabs-list", className)} {...rest}>
      {children}
      <BaseTabs.Indicator className="nt-tabs-indicator" />
    </BaseTabs.List>
  );
});

/** A single tab. Its `value` links it to the `Tabs.Panel` with the same value. */
export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(function TabsTab({ className, ...rest }, ref) {
  return <BaseTabs.Tab ref={ref} className={cx("nt-tabs-tab nt-focus", className)} {...rest} />;
});

/** Content shown while the tab with the same `value` is active. */
export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel({ className, ...rest }, ref) {
  return <BaseTabs.Panel ref={ref} className={cx("nt-tabs-panel", className)} {...rest} />;
});

/**
 * Switches between related views. Arrow keys move between tabs.
 *
 * @example
 * <Tabs.Root defaultValue="overview">
 *   <Tabs.List>
 *     <Tabs.Tab value="overview">Overview</Tabs.Tab>
 *     <Tabs.Tab value="logs">Logs</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panel value="overview">…</Tabs.Panel>
 *   <Tabs.Panel value="logs">…</Tabs.Panel>
 * </Tabs.Root>
 */
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};
