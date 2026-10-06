import { useState } from "react";
import { Checkbox } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "checkbox",
  title: "Checkbox",
  group: "Forms",
  order: 1,
  description: "A square box for turning an option on or off, with an indeterminate state for partial selections.",
};

const REGIONS = ["eu-west-2", "us-east-1", "ap-south-1"];

function SelectAll() {
  const [selected, setSelected] = useState<string[]>(["eu-west-2"]);
  const all = selected.length === REGIONS.length;
  const some = selected.length > 0 && !all;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Checkbox
        label="All regions"
        checked={all}
        indeterminate={some}
        onCheckedChange={(checked) => setSelected(checked ? REGIONS : [])}
      />
      <div style={{ display: "grid", gap: 8, paddingLeft: 24 }}>
        {REGIONS.map((region) => (
          <Checkbox
            key={region}
            label={region}
            checked={selected.includes(region)}
            onCheckedChange={(checked) =>
              setSelected((prev) => (checked ? [...prev, region] : prev.filter((r) => r !== region)))
            }
          />
        ))}
      </div>
      <span className="nt-label">Deploy to: {selected.length ? selected.join(", ") : "none"}</span>
    </div>
  );
}

export default function CheckboxPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="With label and description"
          code={`<Checkbox label="Email me when a build fails" defaultChecked />
<Checkbox
  label="Keep previous release"
  description="Lets you roll back instantly. Uses one extra node."
/>`}
        >
          <Checkbox label="Email me when a build fails" defaultChecked />
          <Checkbox label="Keep previous release" description="Lets you roll back instantly. Uses one extra node." />
        </Example>

        <Example
          stack
          title="Indeterminate"
          description="A parent checkbox shows a dash when only some of its children are selected."
          code={`const all = selected.length === regions.length;
const some = selected.length > 0 && !all;

<Checkbox
  label="All regions"
  checked={all}
  indeterminate={some}
  onCheckedChange={(checked) => setSelected(checked ? regions : [])}
/>`}
        >
          <SelectAll />
        </Example>

        <Example stack title="Disabled">
          <Checkbox label="Encrypt volumes at rest" defaultChecked disabled />
          <Checkbox label="Allow public access" disabled />
        </Example>

        <Example title="Without a label" code={`<Checkbox aria-label="Select node-a" />`}>
          <Checkbox aria-label="Select node-a" />
          <Checkbox aria-label="Select node-b" defaultChecked />
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", description: "Text next to the box. Without it, pass aria-label." },
            { name: "description", type: "ReactNode", description: "Secondary text under the label." },
            { name: "checked", type: "boolean", description: "Controlled checked state." },
            { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
            { name: "onCheckedChange", type: "(checked: boolean, details) => void", description: "Called when the box is toggled." },
            { name: "indeterminate", type: "boolean", default: "false", description: "Shows a dash for a partial selection." },
            { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
            { name: "name / value / required", type: "string / string / boolean", description: "Form integration." },
          ]}
        />
      </Section>
    </Page>
  );
}
