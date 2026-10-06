import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";

/** Props for `Accordion.Root`. */
export interface AccordionRootProps extends Omit<ComponentPropsWithoutRef<typeof BaseAccordion.Root>, "className"> {
  className?: string;
}

/** Props for `Accordion.Item`. */
export interface AccordionItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAccordion.Item>, "className" | "title"> {
  /** Text or content of the clickable header row. */
  title: ReactNode;
  className?: string;
}

/** Holds a set of collapsible sections. Pass `multiple` to let more than one stay open. */
export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
  { className, ...rest },
  ref,
) {
  return <BaseAccordion.Root ref={ref} className={cx("nt-accordion", className)} {...rest} />;
});

/** One collapsible section. Renders its own header, trigger and animated panel around `children`. */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { title, className, children, ...rest },
  ref,
) {
  return (
    <BaseAccordion.Item ref={ref} className={cx("nt-accordion-item", className)} {...rest}>
      <BaseAccordion.Header className="nt-accordion-header">
        <BaseAccordion.Trigger className="nt-accordion-trigger nt-focus">
          {title}
          <Icon icon={ChevronDown} size="sm" className="nt-accordion-chevron" />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="nt-accordion-panel">
        <div className="nt-accordion-content">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
});

/**
 * Stacked sections that expand and collapse.
 *
 * @example
 * <Accordion.Root defaultValue={["limits"]}>
 *   <Accordion.Item value="limits" title="Resource limits">…</Accordion.Item>
 *   <Accordion.Item value="probes" title="Health probes">…</Accordion.Item>
 * </Accordion.Root>
 */
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
};
