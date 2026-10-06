import { useState } from "react";
import { Radio, RadioGroup } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "radio-group",
  title: "Radio group",
  group: "Forms",
  order: 2,
  description: "A set of mutually exclusive choices. The selected radio shows a filled square.",
};

const STORAGE = [
  { value: "ssd", label: "SSD", description: "Fastest. 0.12 per GB-month." },
  { value: "hdd", label: "HDD", description: "Cheapest. Best for cold backups." },
  { value: "nvme", label: "NVMe", description: "Lowest latency. Available in eu-west-2 only." },
];

function Controlled() {
  const [tier, setTier] = useState("standard");
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <RadioGroup label="Support tier" value={tier} onValueChange={setTier} orientation="horizontal">
        <Radio value="basic" label="Basic" />
        <Radio value="standard" label="Standard" />
        <Radio value="critical" label="Critical" />
      </RadioGroup>
      <span className="nt-label">Selected: {tier}</span>
    </div>
  );
}

export default function RadioGroupPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="From options"
          code={`<RadioGroup
  label="Storage"
  description="Applies to new volumes only."
  defaultValue="ssd"
  options={[
    { value: "ssd", label: "SSD", description: "Fastest. 0.12 per GB-month." },
    { value: "hdd", label: "HDD", description: "Cheapest. Best for cold backups." },
    { value: "nvme", label: "NVMe", description: "Lowest latency. Available in eu-west-2 only." },
  ]}
/>`}
        >
          <RadioGroup label="Storage" description="Applies to new volumes only." defaultValue="ssd" options={STORAGE} />
        </Example>

        <Example
          stack
          title="Children, horizontal and controlled"
          code={`const [tier, setTier] = useState("standard");

<RadioGroup label="Support tier" value={tier} onValueChange={setTier} orientation="horizontal">
  <Radio value="basic" label="Basic" />
  <Radio value="standard" label="Standard" />
  <Radio value="critical" label="Critical" />
</RadioGroup>`}
        >
          <Controlled />
        </Example>

        <Example stack title="Disabled options">
          <RadioGroup
            label="Instance size"
            defaultValue="m"
            options={[
              { value: "s", label: "Small · 2 vCPU" },
              { value: "m", label: "Medium · 4 vCPU" },
              { value: "l", label: "Large · 16 vCPU", disabled: true, description: "Quota reached." },
            ]}
          />
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="RadioGroup"
          rows={[
            { name: "label", type: "ReactNode", description: "Visible group label and accessible name." },
            { name: "description", type: "ReactNode", description: "Helper text under the label." },
            { name: "options", type: "RadioOption[]", description: "Choices to render: { value, label, description?, disabled? }." },
            { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Stack or wrap the choices." },
            { name: "value", type: "string", description: "Controlled selected value." },
            { name: "defaultValue", type: "string", description: "Initial value when uncontrolled." },
            { name: "onValueChange", type: "(value: string, details) => void", description: "Called when the selection changes." },
            { name: "disabled / required / name", type: "boolean / boolean / string", description: "Form integration." },
          ]}
        />
        <PropsTable
          title="Radio"
          rows={[
            { name: "value", type: "string", description: "Value selected in the group when chosen." },
            { name: "label", type: "ReactNode", description: "Text next to the radio. Without it, pass aria-label." },
            { name: "description", type: "ReactNode", description: "Secondary text under the label." },
            { name: "disabled", type: "boolean", default: "false", description: "Prevents choosing this option." },
          ]}
        />
      </Section>
    </Page>
  );
}
