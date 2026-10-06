import { Button, Input, Popover } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "popover",
  title: "Popover",
  group: "Overlays",
  description: "A floating panel anchored to a trigger, for details, quick edits or settings.",
};

export default function PopoverPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          title="Details"
          code={`<Popover.Root>
  <Popover.Trigger render={<Button />}>node-b</Popover.Trigger>
  <Popover.Content title="node-b" description="Healthy · eu-west-2 · 9ms p50">
    Last heartbeat 2 seconds ago. Running 14 workloads.
  </Popover.Content>
</Popover.Root>`}
        >
          <Popover.Root>
            <Popover.Trigger render={<Button />}>node-b</Popover.Trigger>
            <Popover.Content title="node-b" description="Healthy · eu-west-2 · 9ms p50">
              Last heartbeat 2 seconds ago. Running 14 workloads across 3 namespaces.
            </Popover.Content>
          </Popover.Root>
        </Example>

        <Example
          title="Quick edit"
          description="Focus moves into the panel when it opens and returns to the trigger when it closes."
          code={`<Popover.Root>
  <Popover.Trigger render={<Button variant="primary" />}>Scale</Popover.Trigger>
  <Popover.Content title="Scale reactor-core" side="right" align="start">
    <Input label="Replicas" defaultValue="3" />
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <Popover.Close render={<Button size="sm" />}>Cancel</Popover.Close>
      <Popover.Close render={<Button size="sm" variant="primary" />}>Apply</Popover.Close>
    </div>
  </Popover.Content>
</Popover.Root>`}
        >
          <Popover.Root>
            <Popover.Trigger render={<Button variant="primary" />}>Scale</Popover.Trigger>
            <Popover.Content title="Scale reactor-core" side="right" align="start">
              <Input label="Replicas" defaultValue="3" />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Popover.Close render={<Button size="sm" />}>Cancel</Popover.Close>
                <Popover.Close render={<Button size="sm" variant="primary" />}>Apply</Popover.Close>
              </div>
            </Popover.Content>
          </Popover.Root>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Popover.Content"
          rows={[
            { name: "title", type: "ReactNode", description: "Heading; also the accessible name." },
            { name: "description", type: "ReactNode", description: "Supporting text under the title." },
            { name: "side", type: '"top" | "bottom" | "left" | "right" | …', default: '"bottom"', description: "Side of the trigger to open on." },
            { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger." },
            { name: "sideOffset", type: "number", default: "6", description: "Gap from the trigger in pixels." },
          ]}
        />
        <PropsTable
          title="Other parts"
          rows={[
            { name: "Popover.Root", type: "Base UI Popover.Root", description: "State container: open, onOpenChange, modal." },
            { name: "Popover.Trigger", type: "Base UI Popover.Trigger", description: "Use render={<Button />}. Supports openOnHover." },
            { name: "Popover.Close", type: "Base UI Popover.Close", description: "Closes the popover when clicked." },
          ]}
        />
      </Section>
    </Page>
  );
}
