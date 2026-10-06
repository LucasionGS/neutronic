import { Button, Panel } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "panel",
  title: "Panel",
  group: "Layout",
  description: "A bordered surface for grouping content, marked with the corner-bracket motif.",
};

export default function PanelPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Header, body and footer"
          code={`<Panel>
  <Panel.Header title="reactor-core" description="3 nodes · eu-west-2" actions={<Button size="sm">Scale</Button>} />
  <Panel.Body>…</Panel.Body>
  <Panel.Footer>
    <Button>Cancel</Button>
    <Button variant="primary">Apply</Button>
  </Panel.Footer>
</Panel>`}
        >
          <Panel style={{ maxWidth: 480 }}>
            <Panel.Header
              title="reactor-core"
              description="3 nodes · eu-west-2"
              actions={<Button size="sm">Scale</Button>}
            />
            <Panel.Body>
              Throughput is steady at 12.4k req/s. The last deploy finished 4 minutes ago without errors.
            </Panel.Body>
            <Panel.Footer>
              <Button>Cancel</Button>
              <Button variant="primary">Apply</Button>
            </Panel.Footer>
          </Panel>
        </Example>

        <Example title="Without brackets" code={`<Panel bracket={false}>…</Panel>`}>
          <Panel bracket={false} style={{ maxWidth: 480 }}>
            <Panel.Body>A plain surface for nested or secondary content.</Panel.Body>
          </Panel>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Panel"
          rows={[
            { name: "bracket", type: "boolean", default: "true", description: "Draws accent corner brackets." },
            { name: "padding", type: '"none" | "sm" | "md"', default: '"md"', description: "Inner spacing of the sections." },
          ]}
        />
        <PropsTable
          title="Panel.Header"
          rows={[
            { name: "title", type: "ReactNode", description: "Heading text, set in mono." },
            { name: "description", type: "ReactNode", description: "Secondary line under the title." },
            { name: "actions", type: "ReactNode", description: "Controls aligned to the right." },
          ]}
        />
      </Section>
    </Page>
  );
}
