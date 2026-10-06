import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes } from "react";
import { vars, type tokens } from "@ionnet/neutronic";
import { cx } from "../../utils/cx";

/** A spacing token key, mapped to `var(--nt-space-N)` (multiples of 4px). */
export type SpaceToken = keyof typeof tokens.space;

/** Cross-axis alignment for {@link Stack}. */
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";

/** Main-axis distribution for {@link Stack}. */
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

/** Props for {@link Stack}. */
export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Defaults to `"column"`. */
  direction?: "row" | "column";
  /** Space between children. Defaults to `"3"` (12px). */
  gap?: SpaceToken;
  align?: StackAlign;
  justify?: StackJustify;
  /** Lets children wrap onto new lines. */
  wrap?: boolean;
  /** Element to render. Defaults to `"div"`. */
  as?: ElementType;
}

/** Props for {@link Grid}. */
export interface GridProps extends HTMLAttributes<HTMLElement> {
  /** A fixed number of equal columns. */
  columns?: number;
  /** Fits as many columns as possible, each at least this wide (e.g. `"200px"`). Takes precedence over `columns`. */
  minChildWidth?: string;
  /** Space between cells. Defaults to `"3"` (12px). */
  gap?: SpaceToken;
  /** Element to render. Defaults to `"div"`. */
  as?: ElementType;
}

const ALIGN: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const JUSTIFY: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

type LayoutStyle = CSSProperties & Record<`--nt-${string}`, string | undefined>;

/**
 * Lays children out in a row or column with token-based spacing.
 *
 * @example
 * <Stack direction="row" gap="2" align="center">
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Deploy</Button>
 * </Stack>
 */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { direction = "column", gap = "3", align, justify, wrap, as: Component = "div", className, style, ...rest },
  ref,
) {
  const layout: LayoutStyle = {
    "--nt-stack-direction": direction,
    "--nt-stack-gap": vars.space[gap],
    "--nt-stack-align": align && ALIGN[align],
    "--nt-stack-justify": justify && JUSTIFY[justify],
    "--nt-stack-wrap": wrap ? "wrap" : undefined,
    ...style,
  };
  return <Component ref={ref} className={cx("nt-stack", className)} style={layout} {...rest} />;
});

/**
 * Arranges children in equal columns, either a fixed count or as many as fit.
 *
 * @example <Grid minChildWidth="220px" gap="4">{cards}</Grid>
 */
export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { columns, minChildWidth, gap = "3", as: Component = "div", className, style, ...rest },
  ref,
) {
  const template = minChildWidth
    ? `repeat(auto-fill, minmax(min(${minChildWidth}, 100%), 1fr))`
    : columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : undefined;
  const layout: LayoutStyle = {
    "--nt-grid-columns": template,
    "--nt-grid-gap": vars.space[gap],
    ...style,
  };
  return <Component ref={ref} className={cx("nt-grid", className)} style={layout} {...rest} />;
});
