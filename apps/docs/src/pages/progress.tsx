import { useEffect, useState } from "react";
import { Button, Meter, Progress } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "progress",
  title: "Progress & Meter",
  group: "Feedback",
  description: "Progress tracks a task toward completion. Meter shows a measurement within a fixed range.",
};

function LiveProgress() {
  const [value, setValue] = useState(12);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 7))), 600);
    return () => clearInterval(id);
  }, [running]);
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Progress label="Uploading image · reactor-core:4822" value={value} showValue tone={value >= 100 ? "success" : "accent"} />
      <div>
        <Button size="sm" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Resume"}
        </Button>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Progress">
        <Example stack title="Determinate" code={`<Progress label="Uploading image" value={value} showValue />`}>
          <LiveProgress />
        </Example>

        <Example
          stack
          title="Indeterminate"
          description="Pass value={null} when the remaining time is unknown."
          code={`<Progress label="Waiting for node-c" value={null} />`}
        >
          <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
            <Progress label="Waiting for node-c" value={null} />
            <Progress aria-label="Syncing" value={null} size="sm" />
          </div>
        </Example>

        <Example stack title="Tones and sizes" code={`<Progress value={100} tone="success" size="sm" aria-label="Migrations" />`}>
          <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
            <Progress label="Migrations" value={100} tone="success" showValue />
            <Progress label="Retries used" value={70} tone="warning" showValue />
            <Progress label="Error budget spent" value={94} tone="danger" showValue size="sm" />
          </div>
        </Example>
      </Section>

      <Section title="Meter">
        <Example
          stack
          title="Automatic tone"
          description="Like the HTML meter element: low, high and optimum decide which range is good, so the color follows the value."
          code={`<Meter label="Disk · node-b" value={82} low={60} high={80} optimum={0} showValue />
<Meter label="Cache hit rate" value={93} low={50} high={85} optimum={100} showValue />`}
        >
          <div style={{ display: "grid", gap: 18, maxWidth: 420 }}>
            <Meter label="Disk · node-a" value={41} low={60} high={80} optimum={0} showValue />
            <Meter label="Disk · node-b" value={72} low={60} high={80} optimum={0} showValue />
            <Meter label="Disk · node-c" value={91} low={60} high={80} optimum={0} showValue />
            <Meter label="Cache hit rate" value={93} low={50} high={85} optimum={100} showValue />
          </div>
        </Example>

        <Example
          stack
          title="Custom range and format"
          code={`<Meter label="Memory" value={11.2} max={16} formatValue={(v) => \`\${v} / 16 GB\`} showValue />`}
        >
          <div style={{ display: "grid", gap: 18, maxWidth: 420 }}>
            <Meter label="Memory" value={11.2} max={16} formatValue={(v) => `${v} / 16 GB`} showValue />
            <Meter label="Queue depth" value={340} max={1000} formatValue={(v) => `${v} jobs`} showValue size="sm" />
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Progress"
          rows={[
            { name: "value", type: "number | null", description: "Current value. null makes it indeterminate." },
            { name: "min / max", type: "number", default: "0 / 100", description: "Range of the value." },
            { name: "label", type: "ReactNode", description: "Visible label and accessible name." },
            { name: "showValue", type: "boolean", default: "false", description: "Shows the formatted percentage." },
            { name: "tone", type: '"accent" | "success" | "warning" | "danger"', default: '"accent"', description: "Fill color." },
            { name: "size", type: '"sm" | "md"', default: '"md"', description: "Track thickness: 3px or 6px." },
            { name: "format", type: "Intl.NumberFormatOptions", description: "Formatting for the shown value." },
          ]}
        />
        <PropsTable
          title="Meter"
          rows={[
            { name: "value", type: "number", description: "Required. The measurement." },
            { name: "min / max", type: "number", default: "0 / 100", description: "Range of the value." },
            { name: "low / high / optimum", type: "number", description: "Thresholds that pick success, warning or danger." },
            { name: "tone", type: '"accent" | "success" | "warning" | "danger"', description: "Fixed color. Overrides thresholds." },
            { name: "formatValue", type: "(value, formatted) => ReactNode", description: "Custom value display." },
            { name: "label / showValue / size", type: "—", description: "Same as Progress." },
          ]}
        />
      </Section>
    </Page>
  );
}
