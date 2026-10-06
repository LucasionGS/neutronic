import { Tabs } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "tabs",
  title: "Tabs",
  group: "Navigation",
  description: "Switches between related views. An accent bar slides under the active tab.",
};

export default function TabsPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Underline"
          description="Use the arrow keys to move between tabs once one has focus."
          code={`<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
    <Tabs.Tab value="logs">Logs</Tabs.Tab>
    <Tabs.Tab value="settings" disabled>Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">…</Tabs.Panel>
  <Tabs.Panel value="metrics">…</Tabs.Panel>
  <Tabs.Panel value="logs">…</Tabs.Panel>
</Tabs.Root>`}
        >
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
              <Tabs.Tab value="logs">Logs</Tabs.Tab>
              <Tabs.Tab value="settings" disabled>
                Settings
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              reactor-core runs 3 nodes in eu-west-2. The last deploy finished 4 minutes ago.
            </Tabs.Panel>
            <Tabs.Panel value="metrics">Throughput 12.4k req/s · p99 latency 84ms · error rate 0.02%.</Tabs.Panel>
            <Tabs.Panel value="logs">No warnings in the last 24 hours.</Tabs.Panel>
          </Tabs.Root>
        </Example>

        <Example
          stack
          title="Boxed"
          code={`<Tabs.Root variant="boxed" defaultValue="1h">
  <Tabs.List>
    <Tabs.Tab value="1h">1h</Tabs.Tab>
    <Tabs.Tab value="24h">24h</Tabs.Tab>
    <Tabs.Tab value="7d">7d</Tabs.Tab>
  </Tabs.List>
</Tabs.Root>`}
        >
          <Tabs.Root variant="boxed" defaultValue="1h">
            <Tabs.List>
              <Tabs.Tab value="1h">1h</Tabs.Tab>
              <Tabs.Tab value="24h">24h</Tabs.Tab>
              <Tabs.Tab value="7d">7d</Tabs.Tab>
              <Tabs.Tab value="30d">30d</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="1h">Showing the last hour of samples.</Tabs.Panel>
            <Tabs.Panel value="24h">Showing the last 24 hours, averaged per minute.</Tabs.Panel>
            <Tabs.Panel value="7d">Showing the last 7 days, averaged per hour.</Tabs.Panel>
            <Tabs.Panel value="30d">Showing the last 30 days, averaged per day.</Tabs.Panel>
          </Tabs.Root>
        </Example>

        <Example
          stack
          title="Vertical"
          code={`<Tabs.Root orientation="vertical" defaultValue="general">…</Tabs.Root>`}
        >
          <Tabs.Root orientation="vertical" defaultValue="general">
            <Tabs.List>
              <Tabs.Tab value="general">General</Tabs.Tab>
              <Tabs.Tab value="domains">Domains</Tabs.Tab>
              <Tabs.Tab value="env">Env vars</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="general">Name, region and runtime for this project.</Tabs.Panel>
            <Tabs.Panel value="domains">api.neutronic.dev points at the production deployment.</Tabs.Panel>
            <Tabs.Panel value="env">12 variables, 3 of them secret.</Tabs.Panel>
          </Tabs.Root>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Tabs.Root"
          rows={[
            { name: "defaultValue", type: "any", default: "0", description: "Active tab when uncontrolled." },
            { name: "value", type: "any", description: "Active tab when controlled." },
            { name: "onValueChange", type: "(value) => void", description: "Called when the active tab changes." },
            { name: "variant", type: '"underline" | "boxed"', default: '"underline"', description: "Indicator style." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction and arrow-key axis." },
          ]}
        />
        <PropsTable
          title="Tabs.Tab"
          rows={[
            { name: "value", type: "any", description: "Links the tab to the panel with the same value." },
            { name: "disabled", type: "boolean", default: "false", description: "Skips the tab and blocks activation." },
          ]}
        />
        <PropsTable
          title="Tabs.Panel"
          rows={[
            { name: "value", type: "any", description: "The tab value this panel belongs to." },
            { name: "keepMounted", type: "boolean", default: "false", description: "Keeps the panel in the DOM while hidden." },
          ]}
        />
      </Section>
    </Page>
  );
}
