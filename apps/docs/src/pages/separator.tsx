import { Button, Separator, Stack } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "separator",
  title: "Separator",
  group: "Layout",
  description: "A thin rule that divides content, with an optional label.",
};

export default function SeparatorPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Horizontal"
          code={`<Separator />
<Separator label="Advanced" />
<Separator strong />`}
        >
          <Stack gap="4" style={{ maxWidth: 480 }}>
            <span>Primary region: eu-west-2</span>
            <Separator />
            <span>Failover region: us-east-1</span>
            <Separator label="Advanced" />
            <span>Custom scheduler rules</span>
            <Separator strong />
          </Stack>
        </Example>

        <Example title="Vertical" code={`<Stack direction="row" align="center" gap="3">
  <Button variant="ghost" size="sm">Logs</Button>
  <Separator orientation="vertical" />
  <Button variant="ghost" size="sm">Metrics</Button>
</Stack>`}>
          <Stack direction="row" align="center" gap="3" style={{ height: 28 }}>
            <Button variant="ghost" size="sm">Logs</Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="sm">Metrics</Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="sm">Traces</Button>
          </Stack>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the rule." },
            { name: "label", type: "ReactNode", description: "Centered text on a horizontal separator." },
            { name: "strong", type: "boolean", default: "false", description: "Uses the stronger border color." },
          ]}
        />
      </Section>
    </Page>
  );
}
