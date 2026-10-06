import { useState } from "react";
import { Icon, SegmentedControl } from "@ionnet/neutronic-react";
import { LayoutGrid, List, Rows3 } from "@ionnet/neutronic-react/icons";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "segmented-control",
  title: "Segmented control",
  group: "Forms",
  order: 5,
  description: "A row of mutually exclusive segments for switching between a few modes or views.",
};

const ENVIRONMENTS = [
  { value: "dev", label: "Dev" },
  { value: "staging", label: "Staging" },
  { value: "prod", label: "Prod" },
];

function Controlled() {
  const [range, setRange] = useState("24h");
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <SegmentedControl
        aria-label="Time range"
        value={range}
        onValueChange={setRange}
        options={[
          { value: "1h", label: "1h" },
          { value: "24h", label: "24h" },
          { value: "7d", label: "7d" },
          { value: "30d", label: "30d" },
        ]}
      />
      <span className="nt-label">Showing metrics for the last {range}</span>
    </div>
  );
}

export default function SegmentedControlPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          title="Basic"
          code={`<SegmentedControl
  aria-label="Environment"
  defaultValue="staging"
  options={[
    { value: "dev", label: "Dev" },
    { value: "staging", label: "Staging" },
    { value: "prod", label: "Prod" },
  ]}
/>`}
        >
          <SegmentedControl aria-label="Environment" defaultValue="staging" options={ENVIRONMENTS} />
        </Example>

        <Example
          stack
          title="Controlled"
          code={`const [range, setRange] = useState("24h");

<SegmentedControl aria-label="Time range" value={range} onValueChange={setRange} options={…} />`}
        >
          <Controlled />
        </Example>

        <Example
          title="With icons"
          code={`<SegmentedControl
  aria-label="Layout"
  options={[
    { value: "grid", label: "Grid", icon: <Icon icon={LayoutGrid} size="sm" /> },
    { value: "list", label: "List", icon: <Icon icon={List} size="sm" /> },
  ]}
/>`}
        >
          <SegmentedControl
            aria-label="Layout"
            options={[
              { value: "grid", label: "Grid", icon: <Icon icon={LayoutGrid} size="sm" /> },
              { value: "list", label: "List", icon: <Icon icon={List} size="sm" /> },
              { value: "rows", label: "Rows", icon: <Icon icon={Rows3} size="sm" /> },
            ]}
          />
          <SegmentedControl
            aria-label="Layout, icons only"
            options={[
              { value: "grid", label: null, icon: <Icon icon={LayoutGrid} size="sm" />, "aria-label": "Grid" },
              { value: "list", label: null, icon: <Icon icon={List} size="sm" />, "aria-label": "List" },
              { value: "rows", label: null, icon: <Icon icon={Rows3} size="sm" />, "aria-label": "Rows" },
            ]}
          />
        </Example>

        <Example stack title="Sizes, full width and disabled">
          <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
            <SegmentedControl size="sm" aria-label="Small" options={ENVIRONMENTS} />
            <SegmentedControl aria-label="Medium" options={ENVIRONMENTS} />
            <SegmentedControl size="lg" aria-label="Large" options={ENVIRONMENTS} />
            <SegmentedControl fullWidth aria-label="Full width" defaultValue="prod" options={ENVIRONMENTS} />
            <SegmentedControl
              aria-label="With a disabled segment"
              options={[...ENVIRONMENTS.slice(0, 2), { value: "prod", label: "Prod", disabled: true }]}
            />
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "options", type: "SegmentedOption[]", description: "{ value, label, icon?, disabled?, aria-label? } for each segment." },
            { name: "value", type: "string", description: "Controlled selected value." },
            { name: "defaultValue", type: "string", default: "first option", description: "Initial value when uncontrolled." },
            { name: "onValueChange", type: "(value: string) => void", description: "Called with the new value. Segments cannot be deselected." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height: 28, 32 or 40px." },
            { name: "fullWidth", type: "boolean", default: "false", description: "Stretches segments to fill the container." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables every segment." },
            { name: "aria-label", type: "string", description: "Accessible name for the group." },
          ]}
        />
      </Section>
    </Page>
  );
}
