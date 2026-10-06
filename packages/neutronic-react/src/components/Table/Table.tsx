import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";

/** Current sort order of a column, or `null` when unsorted. */
export type SortDirection = "asc" | "desc" | null;

/** Props for {@link Table}. The props apply to the `<table>`; the scroll wrapper takes `wrapperClassName`. */
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Class name for the scrolling wrapper around the table. */
  wrapperClassName?: string;
}

/** Props for `Table.Row`. */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlights the row with an accent fill and corner brackets. Sets `aria-selected`. */
  selected?: boolean;
}

/** Props for `Table.Head`. */
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Renders the header as a button that calls `onSort`. */
  sortable?: boolean;
  /** Current sort order of this column. */
  sortDirection?: SortDirection;
  /** Called when a sortable header is clicked. The parent decides the next direction. */
  onSort?: () => void;
  /** Right-aligns the header to match numeric cells. */
  numeric?: boolean;
}

/** Props for `Table.Cell`. */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-aligns the value in mono with tabular figures. */
  numeric?: boolean;
}

const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { wrapperClassName, className, ...rest },
  ref,
) {
  return (
    <div className={cx("nt-table-wrap", wrapperClassName)}>
      <table ref={ref} className={cx("nt-table", className)} {...rest} />
    </div>
  );
});

/** The `<thead>` section of a {@link Table}. */
export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...rest }, ref) {
    return <thead ref={ref} className={cx("nt-table-header", className)} {...rest} />;
  },
);

/** The `<tbody>` section of a {@link Table}. */
export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...rest }, ref) {
    return <tbody ref={ref} className={cx("nt-table-body", className)} {...rest} />;
  },
);

/** A table row. Pass `selected` to mark it with the selection highlight. */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { selected, className, ...rest },
  ref,
) {
  return (
    <tr
      ref={ref}
      className={cx("nt-table-row", className)}
      data-selected={selected || undefined}
      aria-selected={selected}
      {...rest}
    />
  );
});

/** A column header. With `sortable`, it renders a button and reports its order through `aria-sort`. */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { sortable, sortDirection = null, onSort, numeric, scope = "col", className, children, ...rest },
  ref,
) {
  const glyph = sortDirection === "asc" ? ArrowUp : sortDirection === "desc" ? ArrowDown : ChevronsUpDown;
  return (
    <th
      ref={ref}
      scope={scope}
      className={cx("nt-table-head", className)}
      data-numeric={numeric || undefined}
      aria-sort={sortable ? (sortDirection ? ARIA_SORT[sortDirection] : "none") : undefined}
      {...rest}
    >
      {sortable ? (
        <button type="button" className="nt-table-sort nt-focus" onClick={onSort}>
          {children}
          <Icon icon={glyph} size="xs" className="nt-table-sort-icon" />
        </button>
      ) : (
        children
      )}
    </th>
  );
});

/** A data cell. Pass `numeric` for right-aligned mono figures. */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { numeric, className, ...rest },
  ref,
) {
  return <td ref={ref} className={cx("nt-table-cell", className)} data-numeric={numeric || undefined} {...rest} />;
});

/**
 * A dense data table that scrolls horizontally when it overflows.
 * Compose it with `Table.Header`, `Table.Body`, `Table.Row`, `Table.Head` and `Table.Cell`.
 *
 * @example
 * <Table>
 *   <Table.Header>
 *     <Table.Row><Table.Head>Node</Table.Head><Table.Head numeric>CPU</Table.Head></Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row><Table.Cell>node-a</Table.Cell><Table.Cell numeric>42%</Table.Cell></Table.Row>
 *   </Table.Body>
 * </Table>
 */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});
