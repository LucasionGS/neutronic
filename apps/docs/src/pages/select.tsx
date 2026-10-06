import { useState } from "react";
import { Select } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "select",
  title: "Select",
  group: "Forms",
  order: 1,
  description: "Picks one value from a list, styled like Input with the label inside the box.",
};

const REGIONS = [
  { value: "eu-west-2", label: "eu-west-2 · London" },
  { value: "eu-central-1", label: "eu-central-1 · Frankfurt" },
  { value: "us-east-1", label: "us-east-1 · Virginia" },
  { value: "ap-southeast-1", label: "ap-southeast-1 · Singapore", disabled: true },
];

const INSTANCES = [
  {
    label: "General purpose",
    options: [
      { value: "g4.small", label: "g4.small · 2 vCPU" },
      { value: "g4.medium", label: "g4.medium · 4 vCPU" },
    ],
  },
  {
    label: "Compute optimized",
    options: [
      { value: "c6.large", label: "c6.large · 8 vCPU" },
      { value: "c6.xlarge", label: "c6.xlarge · 16 vCPU" },
    ],
  },
];

export default function SelectPage() {
  const [region, setRegion] = useState<string | null>("eu-west-2");
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Basic"
          code={`<Select
  label="Region"
  defaultValue="eu-west-2"
  options={[
    { value: "eu-west-2", label: "eu-west-2 · London" },
    { value: "us-east-1", label: "us-east-1 · Virginia" },
  ]}
/>`}
        >
          <div style={{ maxWidth: 360 }}>
            <Select label="Region" defaultValue="eu-west-2" options={REGIONS} />
          </div>
        </Example>

        <Example
          stack
          title="Controlled"
          description="The selected value lives in your state."
          code={`const [region, setRegion] = useState<string | null>("eu-west-2");

<Select label="Region" value={region} onValueChange={setRegion} options={regions} />`}
        >
          <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
            <Select label="Region" value={region} onValueChange={setRegion} options={REGIONS} />
            <span className="nt-label">value: {region ?? "null"}</span>
          </div>
        </Example>

        <Example
          stack
          title="Groups and placeholder"
          code={`<Select
  label="Instance"
  placeholder="Choose a size"
  options={[
    { label: "General purpose", options: [{ value: "g4.small", label: "g4.small · 2 vCPU" }] },
    { label: "Compute optimized", options: [{ value: "c6.large", label: "c6.large · 8 vCPU" }] },
  ]}
/>`}
        >
          <div style={{ maxWidth: 360 }}>
            <Select label="Instance" placeholder="Choose a size" options={INSTANCES} />
          </div>
        </Example>

        <Example
          stack
          title="Description, error, sizes and disabled"
          code={`<Select label="Region" options={regions} description="New nodes start here." />
<Select label="Region" options={regions} error="Pick a region to continue." />
<Select size="sm" label="Small" options={regions} />
<Select label="Locked" options={regions} defaultValue="us-east-1" disabled />`}
        >
          <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
            <Select label="Region" options={REGIONS} defaultValue="eu-central-1" description="New nodes start here." />
            <Select label="Region" options={REGIONS} placeholder="None" error="Pick a region to continue." />
            <Select size="sm" label="Small" options={REGIONS} defaultValue="eu-west-2" />
            <Select size="lg" label="Large" options={REGIONS} defaultValue="eu-west-2" />
            <Select label="Locked" options={REGIONS} defaultValue="us-east-1" disabled />
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "options", type: "Array<SelectOption<V> | SelectOptionGroup<V>>", description: "Choices; groups add section headings." },
            { name: "label", type: "ReactNode", description: "Inline prefix and accessible label. Without it, pass aria-label." },
            { name: "placeholder", type: "ReactNode", description: "Shown when nothing is selected." },
            { name: "value / defaultValue", type: "V | null", description: "Controlled or initial selection." },
            { name: "onValueChange", type: "(value: V | null) => void", description: "Called when the selection changes." },
            { name: "description", type: "ReactNode", description: "Helper text below the box." },
            { name: "error", type: "ReactNode", description: "Marks the field invalid and shows the message." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height: 28, 32 or 40px." },
            { name: "disabled / required / name", type: "boolean / boolean / string", description: "Form behavior." },
          ]}
        />
      </Section>
    </Page>
  );
}
