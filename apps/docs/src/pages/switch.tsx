import { useState } from "react";
import { Panel, Switch } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "switch",
  title: "Switch",
  group: "Forms",
  order: 3,
  description: "An on/off toggle that takes effect immediately, with a square track and sliding thumb.",
};

function SettingsRows() {
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  return (
    <Panel style={{ maxWidth: 440 }}>
      <Panel.Header title="reactor-core" description={autoDeploy ? "Deploys on every push" : "Manual deploys only"} />
      <Panel.Body style={{ display: "grid", gap: 16 }}>
        <Switch
          labelPosition="start"
          label="Auto-deploy"
          description="Build on every push to main."
          checked={autoDeploy}
          onCheckedChange={setAutoDeploy}
        />
        <Switch
          labelPosition="start"
          label="Maintenance mode"
          description="Returns 503 to all traffic."
          checked={maintenance}
          onCheckedChange={setMaintenance}
        />
      </Panel.Body>
    </Panel>
  );
}

export default function SwitchPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example stack title="Basic" code={`<Switch label="Auto-deploy" defaultChecked />`}>
          <Switch label="Auto-deploy" defaultChecked />
          <Switch label="Verbose logging" />
        </Example>

        <Example
          stack
          title="Settings rows"
          description="With labelPosition=&quot;start&quot; the label comes first and the switch sits at the far edge."
          code={`<Switch
  labelPosition="start"
  label="Auto-deploy"
  description="Build on every push to main."
  checked={autoDeploy}
  onCheckedChange={setAutoDeploy}
/>`}
        >
          <SettingsRows />
        </Example>

        <Example title="Sizes" code={`<Switch size="sm" aria-label="Small" />\n<Switch aria-label="Medium" />\n<Switch size="lg" aria-label="Large" />`}>
          <Switch size="sm" aria-label="Small" defaultChecked />
          <Switch aria-label="Medium" defaultChecked />
          <Switch size="lg" aria-label="Large" defaultChecked />
        </Example>

        <Example stack title="Disabled">
          <Switch label="Spot instances" defaultChecked disabled />
          <Switch label="GPU nodes" disabled />
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", description: "Text next to the switch. Without it, pass aria-label." },
            { name: "description", type: "ReactNode", description: "Secondary text under the label." },
            { name: "labelPosition", type: '"start" | "end"', default: '"end"', description: "Label after the switch, or first with the switch at the far edge." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track size: 28, 36 or 44px wide." },
            { name: "checked", type: "boolean", description: "Controlled state." },
            { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
            { name: "onCheckedChange", type: "(checked: boolean, details) => void", description: "Called when toggled." },
            { name: "disabled / name / required", type: "boolean / string / boolean", description: "Form integration." },
          ]}
        />
      </Section>
    </Page>
  );
}
