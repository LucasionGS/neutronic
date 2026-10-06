import { Button, Icon, Input, Textarea } from "@ionnet/neutronic-react";
import { Search } from "@ionnet/neutronic-react/icons";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "input",
  title: "Input & Textarea",
  group: "Forms",
  order: 0,
  description: "Text fields with the label set inside the box as a mono prefix.",
};

export default function InputPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Inline prefix"
          description="The label doubles as the accessible name, so clicking it focuses the input."
          code={`<Input label="Host" defaultValue="10.0.4.21" />
<Input label="Port" defaultValue="8443" suffix="tcp" />`}
        >
          <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
            <Input label="Host" defaultValue="10.0.4.21" />
            <Input label="Port" defaultValue="8443" suffix="tcp" />
          </div>
        </Example>

        <Example
          stack
          title="Icon, no label"
          code={`<Input aria-label="Search" icon={<Icon icon={Search} size="sm" />} placeholder="Search nodes" />`}
        >
          <div style={{ maxWidth: 360 }}>
            <Input aria-label="Search" icon={<Icon icon={Search} size="sm" />} placeholder="Search nodes" />
          </div>
        </Example>

        <Example
          stack
          title="Description and error"
          code={`<Input label="Cluster" defaultValue="eu-west-2" description="Region where new nodes start." />
<Input label="Replicas" defaultValue="0" error="Must be at least 1." />`}
        >
          <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
            <Input label="Cluster" defaultValue="eu-west-2" description="Region where new nodes start." />
            <Input label="Replicas" defaultValue="0" error="Must be at least 1." />
          </div>
        </Example>

        <Example stack title="Sizes and disabled">
          <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
            <Input size="sm" label="Small" placeholder="28px" />
            <Input label="Medium" placeholder="32px" />
            <Input size="lg" label="Large" placeholder="40px" />
            <Input label="Disabled" defaultValue="read-only" disabled />
          </div>
        </Example>

        <Example stack title="Textarea" code={`<Textarea label="Release notes" rows={4} />`}>
          <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
            <Textarea label="Release notes" rows={4} defaultValue="Fixes a race in the scheduler when nodes rejoin." />
            <div>
              <Button variant="primary">Publish</Button>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Input"
          rows={[
            { name: "label", type: "ReactNode", description: "Inline prefix and accessible label. Without it, pass aria-label." },
            { name: "description", type: "ReactNode", description: "Helper text below the box." },
            { name: "error", type: "ReactNode", description: "Marks the field invalid and shows the message." },
            { name: "icon", type: "ReactNode", description: "Leading icon inside the box." },
            { name: "suffix", type: "ReactNode", description: "Trailing content such as a unit." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height: 28, 32 or 40px." },
            { name: "...rest", type: "InputHTMLAttributes", description: "All native input attributes." },
          ]}
        />
        <PropsTable
          title="Textarea"
          rows={[
            { name: "label", type: "ReactNode", description: "Header strip inside the box." },
            { name: "description / error", type: "ReactNode", description: "Same as Input." },
            { name: "...rest", type: "TextareaHTMLAttributes", description: "All native textarea attributes." },
          ]}
        />
      </Section>
    </Page>
  );
}
