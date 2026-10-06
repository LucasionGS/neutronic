import { useMemo, useState } from "react";
import { Table, type SortDirection } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "table",
  title: "Table",
  group: "Data display",
  description: "A dense data table with sortable columns and row selection.",
};

interface Node {
  name: string;
  region: string;
  status: "healthy" | "degraded" | "offline";
  cpu: number;
  memory: number;
  uptime: string;
}

const NODES: Node[] = [
  { name: "node-a", region: "eu-west-2", status: "healthy", cpu: 42, memory: 61, uptime: "14d 03h" },
  { name: "node-b", region: "eu-west-2", status: "healthy", cpu: 37, memory: 55, uptime: "14d 03h" },
  { name: "node-c", region: "us-east-1", status: "degraded", cpu: 91, memory: 88, uptime: "2d 11h" },
  { name: "node-d", region: "us-east-1", status: "healthy", cpu: 18, memory: 32, uptime: "9d 20h" },
  { name: "node-e", region: "ap-south-1", status: "offline", cpu: 0, memory: 0, uptime: "0h" },
];

const STATUS_COLOR: Record<Node["status"], string> = {
  healthy: "var(--nt-color-success)",
  degraded: "var(--nt-color-warning)",
  offline: "var(--nt-color-danger)",
};

type SortKey = "name" | "cpu" | "memory";

function Status({ status }: { status: Node["status"] }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 6, height: 6, background: STATUS_COLOR[status] }} />
      {status}
    </span>
  );
}

function NodeTable() {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDirection }>({ key: "cpu", dir: "desc" });
  const [selected, setSelected] = useState<string | null>("node-c");

  const rows = useMemo(() => {
    if (!sort.dir) return NODES;
    const sign = sort.dir === "asc" ? 1 : -1;
    return [...NODES].sort((a, b) => {
      const x = a[sort.key];
      const y = b[sort.key];
      return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y))) * sign;
    });
  }, [sort]);

  const onSort = (key: SortKey) => () =>
    setSort((s) => ({ key, dir: s.key !== key ? "asc" : s.dir === "asc" ? "desc" : s.dir === "desc" ? null : "asc" }));
  const dir = (key: SortKey) => (sort.key === key ? sort.dir : null);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head sortable sortDirection={dir("name")} onSort={onSort("name")}>
            Node
          </Table.Head>
          <Table.Head>Region</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head numeric sortable sortDirection={dir("cpu")} onSort={onSort("cpu")}>
            CPU
          </Table.Head>
          <Table.Head numeric sortable sortDirection={dir("memory")} onSort={onSort("memory")}>
            Memory
          </Table.Head>
          <Table.Head numeric>Uptime</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((node) => (
          <Table.Row
            key={node.name}
            selected={selected === node.name}
            onClick={() => setSelected((s) => (s === node.name ? null : node.name))}
            style={{ cursor: "pointer" }}
          >
            <Table.Cell>{node.name}</Table.Cell>
            <Table.Cell>{node.region}</Table.Cell>
            <Table.Cell>
              <Status status={node.status} />
            </Table.Cell>
            <Table.Cell numeric>{node.cpu}%</Table.Cell>
            <Table.Cell numeric>{node.memory}%</Table.Cell>
            <Table.Cell numeric>{node.uptime}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default function TablePage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Sortable and selectable"
          description="Click a header to cycle ascending, descending and unsorted. Click a row to select it."
          code={`<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head sortable sortDirection={dir("name")} onSort={onSort("name")}>Node</Table.Head>
      <Table.Head numeric sortable sortDirection={dir("cpu")} onSort={onSort("cpu")}>CPU</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {rows.map((node) => (
      <Table.Row key={node.name} selected={selected === node.name} onClick={() => setSelected(node.name)}>
        <Table.Cell>{node.name}</Table.Cell>
        <Table.Cell numeric>{node.cpu}%</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`}
        >
          <NodeTable />
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Table"
          rows={[
            { name: "wrapperClassName", type: "string", description: "Class for the horizontally scrolling wrapper." },
            { name: "...rest", type: "TableHTMLAttributes", description: "Applied to the <table> element." },
          ]}
        />
        <PropsTable
          title="Table.Row"
          rows={[{ name: "selected", type: "boolean", default: "false", description: "Accent fill and corner brackets; sets aria-selected." }]}
        />
        <PropsTable
          title="Table.Head"
          rows={[
            { name: "sortable", type: "boolean", default: "false", description: "Renders the header as a sort button." },
            { name: "sortDirection", type: '"asc" | "desc" | null', default: "null", description: "Current order; drives the icon and aria-sort." },
            { name: "onSort", type: "() => void", description: "Called when the header is clicked." },
            { name: "numeric", type: "boolean", default: "false", description: "Right-aligns the header." },
          ]}
        />
        <PropsTable
          title="Table.Cell"
          rows={[{ name: "numeric", type: "boolean", default: "false", description: "Right-aligned mono figures." }]}
        />
      </Section>
    </Page>
  );
}
