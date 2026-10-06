import { useState } from "react";
import { Slider } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "slider",
  title: "Slider",
  group: "Forms",
  order: 4,
  description: "Picks a number or a range by dragging a square thumb along a thin track.",
};

function Controlled() {
  const [cpu, setCpu] = useState(60);
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <Slider
        label="CPU limit"
        showValue
        formatValue={(v) => `${v}%`}
        value={cpu}
        onValueChange={(v) => setCpu(v as number)}
      />
      <span className="nt-label">{cpu > 80 ? "Nodes may throttle under load." : "Headroom available."}</span>
    </div>
  );
}

export default function SliderPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Label and value"
          code={`<Slider label="Replicas" showValue min={1} max={12} defaultValue={3} />`}
        >
          <div style={{ maxWidth: 360 }}>
            <Slider label="Replicas" showValue min={1} max={12} defaultValue={3} />
          </div>
        </Example>

        <Example
          stack
          title="Controlled with formatting"
          code={`const [cpu, setCpu] = useState(60);

<Slider
  label="CPU limit"
  showValue
  formatValue={(v) => \`\${v}%\`}
  value={cpu}
  onValueChange={(v) => setCpu(v as number)}
/>`}
        >
          <Controlled />
        </Example>

        <Example
          stack
          title="Range"
          description="Pass an array to get one thumb per value."
          code={`<Slider label="Autoscale bounds" showValue min={0} max={50} defaultValue={[4, 20]} formatValue={(v) => \`\${v} nodes\`} />`}
        >
          <div style={{ maxWidth: 360 }}>
            <Slider
              label="Autoscale bounds"
              showValue
              min={0}
              max={50}
              defaultValue={[4, 20]}
              formatValue={(v) => `${v} nodes`}
            />
          </div>
        </Example>

        <Example stack title="Sizes, steps and disabled">
          <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
            <Slider size="sm" aria-label="Small" defaultValue={30} />
            <Slider label="Log retention (days)" showValue step={7} min={7} max={91} defaultValue={28} />
            <Slider size="lg" aria-label="Large" defaultValue={70} />
            <Slider label="Locked" showValue defaultValue={40} disabled />
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", description: "Visible label above the track. Without it, pass aria-label." },
            { name: "showValue", type: "boolean", default: "false", description: "Shows the current value in mono at the right." },
            { name: "formatValue", type: "(value: number) => ReactNode", description: "Formats each value in the readout." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Thumb and track size." },
            { name: "value", type: "number | number[]", description: "Controlled value. An array makes a range." },
            { name: "defaultValue", type: "number | number[]", description: "Initial value when uncontrolled." },
            { name: "onValueChange", type: "(value: number | number[], details) => void", description: "Called while dragging." },
            { name: "onValueCommitted", type: "(value: number | number[], details) => void", description: "Called when dragging ends." },
            { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Bounds and granularity." },
            { name: "disabled / orientation", type: 'boolean / "horizontal" | "vertical"', description: "Interaction and direction." },
          ]}
        />
      </Section>
    </Page>
  );
}
