import { useState } from "react";
import { Combobox } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "combobox",
  title: "Combobox",
  group: "Forms",
  order: 2,
  description: "A searchable select: type to filter the list, then pick an entry.",
};

const NODES = ["node-a", "node-b", "node-c", "edge-ams-1", "edge-ams-2", "edge-fra-1", "edge-lhr-1", "edge-sin-1"];

const SERVICES = [
  { value: 101, label: "api-gateway" },
  { value: 102, label: "auth" },
  { value: 103, label: "billing" },
  { value: 104, label: "ingest-worker" },
  { value: 105, label: "scheduler" },
  { value: 106, label: "search-indexer", disabled: true },
];

export default function ComboboxPage() {
  const [service, setService] = useState<number | null>(104);
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="String items"
          code={`<Combobox label="Node" placeholder="Search nodes" items={["node-a", "node-b", "edge-ams-1"]} />`}
        >
          <div style={{ maxWidth: 360 }}>
            <Combobox label="Node" placeholder="Search nodes" items={NODES} />
          </div>
        </Example>

        <Example
          stack
          title="Object items, controlled"
          description="Values can be any type. Filtering matches on label."
          code={`const [service, setService] = useState<number | null>(104);

<Combobox
  label="Service"
  items={[{ value: 101, label: "api-gateway" }, { value: 104, label: "ingest-worker" }]}
  value={service}
  onValueChange={setService}
/>`}
        >
          <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
            <Combobox label="Service" items={SERVICES} value={service} onValueChange={setService} />
            <span className="nt-label">value: {service ?? "null"}</span>
          </div>
        </Example>

        <Example
          stack
          title="Empty state, description and error"
          code={`<Combobox label="Node" items={nodes} emptyText="No node with that name" description="Type to filter." />
<Combobox label="Node" items={nodes} error="Select a node to drain." />`}
        >
          <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
            <Combobox label="Node" items={NODES} emptyText="No node with that name" description="Try typing “xyz”." />
            <Combobox label="Node" items={NODES} error="Select a node to drain." />
            <Combobox size="sm" label="Small" items={NODES} placeholder="28px" />
            <Combobox label="Disabled" items={NODES} defaultValue="node-a" disabled />
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "items", type: "Array<ComboboxItem<V> | string>", description: "Entries to search. Strings are value and label." },
            { name: "label", type: "ReactNode", description: "Inline prefix and accessible label. Without it, pass aria-label." },
            { name: "placeholder", type: "string", description: "Shown when the input is empty." },
            { name: "value / defaultValue", type: "V | null", description: "Controlled or initial selection." },
            { name: "onValueChange", type: "(value: V | null) => void", description: "Called when the selection changes." },
            { name: "emptyText", type: "ReactNode", default: '"No matches"', description: "Shown when nothing matches." },
            { name: "description / error", type: "ReactNode", description: "Same as Input." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height: 28, 32 or 40px." },
          ]}
        />
      </Section>
    </Page>
  );
}
