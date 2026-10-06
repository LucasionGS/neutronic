import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";

/** Props for {@link Kbd}. */
export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Renders a key combination, e.g. `["Ctrl", "K"]`. Takes precedence over `children`. */
  keys?: ReactNode[];
  /** Shown between keys of a combination. Defaults to `"+"`. */
  separator?: ReactNode;
  /** Defaults to `"md"`. */
  size?: "sm" | "md";
}

/**
 * A keyboard key or shortcut hint.
 *
 * @example
 * <Kbd>Esc</Kbd>
 * <Kbd keys={["⌘", "K"]} />
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { keys, separator = "+", size = "md", className, children, ...rest },
  ref,
) {
  if (!keys) {
    return (
      <kbd ref={ref} className={cx("nt-kbd", className)} data-size={size} {...rest}>
        {children}
      </kbd>
    );
  }
  return (
    <kbd ref={ref} className={cx("nt-kbd-combo", className)} data-size={size} {...rest}>
      {keys.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span className="nt-kbd-separator" aria-hidden="true">
              {separator}
            </span>
          )}
          <kbd className="nt-kbd" data-size={size}>
            {key}
          </kbd>
        </Fragment>
      ))}
    </kbd>
  );
});
