import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";

/** Props for {@link Panel}. */
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Draws accent corner brackets. Defaults to `true`. */
  bracket?: boolean;
  /** Inner spacing of the header, body and footer. Defaults to `"md"`. */
  padding?: "none" | "sm" | "md";
}

/** Props for {@link PanelHeader}. */
export interface PanelHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  /** Controls placed at the right end of the header, such as buttons or a menu. */
  actions?: ReactNode;
}

const PanelRoot = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { bracket = true, padding = "md", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("nt-panel", bracket && "nt-bracket", className)}
      data-padding={padding}
      {...rest}
    />
  );
});

/** The top section of a {@link Panel}, with a title, description and actions. */
export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(function PanelHeader(
  { title, description, actions, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx("nt-panel-header", className)} {...rest}>
      <div>
        {title != null && <h3 className="nt-panel-title">{title}</h3>}
        {description != null && <p className="nt-panel-description">{description}</p>}
        {children}
      </div>
      {actions != null && <div className="nt-panel-actions">{actions}</div>}
    </div>
  );
});

/** The main content area of a {@link Panel}. */
export const PanelBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function PanelBody(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx("nt-panel-body", className)} {...rest} />;
});

/** A right-aligned row of actions at the bottom of a {@link Panel}. */
export const PanelFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function PanelFooter(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx("nt-panel-footer", className)} {...rest} />;
});

/**
 * A bordered surface for grouping related content. Use `Panel.Header`, `Panel.Body` and `Panel.Footer` inside it.
 *
 * @example
 * <Panel>
 *   <Panel.Header title="Nodes" actions={<Button size="sm">Add</Button>} />
 *   <Panel.Body>…</Panel.Body>
 * </Panel>
 */
export const Panel = Object.assign(PanelRoot, {
  Header: PanelHeader,
  Body: PanelBody,
  Footer: PanelFooter,
});
