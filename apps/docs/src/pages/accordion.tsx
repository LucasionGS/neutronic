import { Accordion } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "accordion",
  title: "Accordion",
  group: "Layout",
  description: "Stacked sections that expand and collapse to reveal detail.",
};

export default function AccordionPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="Single"
          description="Opening one section closes the others."
          code={`<Accordion.Root defaultValue={["limits"]}>
  <Accordion.Item value="limits" title="Resource limits">…</Accordion.Item>
  <Accordion.Item value="probes" title="Health probes">…</Accordion.Item>
  <Accordion.Item value="rollout" title="Rollout strategy">…</Accordion.Item>
</Accordion.Root>`}
        >
          <div style={{ maxWidth: 560 }}>
            <Accordion.Root defaultValue={["limits"]}>
              <Accordion.Item value="limits" title="Resource limits">
                Each replica may use up to 2 vCPU and 4 GiB of memory. Pods over the memory limit are restarted.
              </Accordion.Item>
              <Accordion.Item value="probes" title="Health probes">
                The readiness probe calls /healthz every 10 seconds and marks a pod unready after 3 failures.
              </Accordion.Item>
              <Accordion.Item value="rollout" title="Rollout strategy">
                Rolling update with at most 1 unavailable replica and 1 surge replica.
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </Example>

        <Example
          stack
          title="Multiple"
          code={`<Accordion.Root multiple defaultValue={["dns", "tls"]}>…</Accordion.Root>`}
        >
          <div style={{ maxWidth: 560 }}>
            <Accordion.Root multiple defaultValue={["dns", "tls"]}>
              <Accordion.Item value="dns" title="DNS">
                api.neutronic.dev resolves to the eu-west-2 load balancer.
              </Accordion.Item>
              <Accordion.Item value="tls" title="TLS certificate">
                Issued by Let's Encrypt. Renews automatically 30 days before expiry.
              </Accordion.Item>
              <Accordion.Item value="legacy" title="Legacy endpoints" disabled>
                Disabled for this project.
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Accordion.Root"
          rows={[
            { name: "defaultValue", type: "any[]", description: "Values of the items open initially." },
            { name: "value", type: "any[]", description: "Open items when controlled." },
            { name: "onValueChange", type: "(value: any[]) => void", description: "Called when items open or close." },
            { name: "multiple", type: "boolean", default: "false", description: "Allows several items to be open at once." },
            { name: "disabled", type: "boolean", default: "false", description: "Disables every item." },
          ]}
        />
        <PropsTable
          title="Accordion.Item"
          rows={[
            { name: "title", type: "ReactNode", description: "Content of the header button." },
            { name: "value", type: "any", description: "Identifies the item. Defaults to a generated id." },
            { name: "disabled", type: "boolean", default: "false", description: "Prevents the item from toggling." },
            { name: "children", type: "ReactNode", description: "Panel content." },
          ]}
        />
      </Section>
    </Page>
  );
}
