import { Button, Grid, Panel, Stack } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "layout",
  title: "Stack & Grid",
  group: "Layout",
  description: "Layout helpers that space children with the 4px spacing scale.",
};

const REGIONS = [
  ["eu-west-2", "3 nodes · 12.4k req/s"],
  ["us-east-1", "4 nodes · 18.1k req/s"],
  ["ap-south-1", "2 nodes · 3.9k req/s"],
  ["sa-east-1", "1 node · 0.8k req/s"],
];

export default function LayoutPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Stack">
        <Example
          title="Row"
          code={`<Stack direction="row" gap="2" justify="end">
  <Button>Cancel</Button>
  <Button variant="primary">Deploy</Button>
</Stack>`}
        >
          <Stack direction="row" gap="2" justify="end" style={{ width: "100%" }}>
            <Button>Cancel</Button>
            <Button variant="primary">Deploy</Button>
          </Stack>
        </Example>

        <Example
          title="Column"
          code={`<Stack gap="1">
  <strong>reactor-core</strong>
  <span>3 nodes · eu-west-2</span>
</Stack>`}
        >
          <Stack gap="1">
            <strong>reactor-core</strong>
            <span style={{ color: "var(--nt-color-text-muted)" }}>3 nodes · eu-west-2</span>
          </Stack>
        </Example>
      </Section>

      <Section title="Grid">
        <Example
          stack
          title="Responsive columns"
          description="minChildWidth fits as many columns as there is room for."
          code={`<Grid minChildWidth="200px" gap="4">
  {regions.map(([name, detail]) => (
    <Panel key={name}>…</Panel>
  ))}
</Grid>`}
        >
          <Grid minChildWidth="200px" gap="4">
            {REGIONS.map(([name, detail]) => (
              <Panel key={name} bracket={false}>
                <Panel.Header title={name} description={detail} />
              </Panel>
            ))}
          </Grid>
        </Example>

        <Example stack title="Fixed columns" code={`<Grid columns={3} gap="2">…</Grid>`}>
          <Grid columns={3} gap="2">
            {["p50 31ms", "p95 62ms", "p99 84ms"].map((stat) => (
              <div
                key={stat}
                style={{
                  padding: "var(--nt-space-3)",
                  border: "1px solid var(--nt-color-border-muted)",
                  fontFamily: "var(--nt-font-mono)",
                  fontSize: "var(--nt-text-sm)",
                }}
              >
                {stat}
              </div>
            ))}
          </Grid>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Stack"
          rows={[
            { name: "direction", type: '"row" | "column"', default: '"column"', description: "Main axis." },
            { name: "gap", type: '"0" | "1" | … | "16"', default: '"3"', description: "Spacing token; each step is 4px." },
            { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', description: "Cross-axis alignment." },
            { name: "justify", type: '"start" | "center" | "end" | "between" | "around" | "evenly"', description: "Main-axis distribution." },
            { name: "wrap", type: "boolean", default: "false", description: "Lets children wrap." },
            { name: "as", type: "ElementType", default: '"div"', description: "Element to render." },
          ]}
        />
        <PropsTable
          title="Grid"
          rows={[
            { name: "columns", type: "number", description: "Fixed number of equal columns." },
            { name: "minChildWidth", type: "string", description: "Auto-fills columns at least this wide. Wins over columns." },
            { name: "gap", type: '"0" | "1" | … | "16"', default: '"3"', description: "Spacing token between cells." },
            { name: "as", type: "ElementType", default: '"div"', description: "Element to render." },
          ]}
        />
      </Section>
    </Page>
  );
}
