import { useState } from "react";
import { Button, Icon, Menu } from "@ionnet/neutronic-react";
import { Copy, Download, MoreHorizontal, Pause, RotateCw, Trash2 } from "@ionnet/neutronic-react/icons";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "menu",
  title: "Menu",
  group: "Overlays",
  description: "A list of actions that opens from a button, with keyboard navigation and nested menus.",
};

export default function MenuPage() {
  const [showLogs, setShowLogs] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  const [sort, setSort] = useState("name");

  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          title="Actions"
          code={`<Menu.Root>
  <Menu.Trigger render={<Button />}>Actions</Menu.Trigger>
  <Menu.Content>
    <Menu.Item icon={<Icon icon={RotateCw} size="sm" />} shortcut="⌘R">Restart</Menu.Item>
    <Menu.Item icon={<Icon icon={Pause} size="sm" />}>Drain</Menu.Item>
    <Menu.Separator />
    <Menu.Item danger icon={<Icon icon={Trash2} size="sm" />}>Delete node</Menu.Item>
  </Menu.Content>
</Menu.Root>`}
        >
          <Menu.Root>
            <Menu.Trigger render={<Button />}>Actions</Menu.Trigger>
            <Menu.Content>
              <Menu.Item icon={<Icon icon={RotateCw} size="sm" />} shortcut="⌘R">
                Restart
              </Menu.Item>
              <Menu.Item icon={<Icon icon={Pause} size="sm" />}>Drain</Menu.Item>
              <Menu.Item icon={<Icon icon={Copy} size="sm" />} shortcut="⌘C">
                Copy node ID
              </Menu.Item>
              <Menu.Item icon={<Icon icon={Download} size="sm" />} disabled>
                Download logs
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item danger icon={<Icon icon={Trash2} size="sm" />}>
                Delete node
              </Menu.Item>
            </Menu.Content>
          </Menu.Root>

          <Menu.Root>
            <Menu.Trigger render={<Button iconOnly variant="ghost" aria-label="More options" />}>
              <Icon icon={MoreHorizontal} />
            </Menu.Trigger>
            <Menu.Content align="end">
              <Menu.Item>Rename</Menu.Item>
              <Menu.Item>Duplicate</Menu.Item>
              <Menu.Submenu>
                <Menu.SubmenuTrigger>Move to</Menu.SubmenuTrigger>
                <Menu.Content>
                  <Menu.Item>eu-west-2</Menu.Item>
                  <Menu.Item>eu-central-1</Menu.Item>
                  <Menu.Item>us-east-1</Menu.Item>
                </Menu.Content>
              </Menu.Submenu>
            </Menu.Content>
          </Menu.Root>
        </Example>

        <Example
          title="Checkbox and radio items"
          description="Checkbox and radio items keep the menu open, so several settings can be changed in one go."
          code={`<Menu.Root>
  <Menu.Trigger render={<Button />}>View</Menu.Trigger>
  <Menu.Content>
    <Menu.Group>
      <Menu.Label>Panels</Menu.Label>
      <Menu.CheckboxItem checked={showLogs} onCheckedChange={setShowLogs}>Logs</Menu.CheckboxItem>
    </Menu.Group>
    <Menu.Separator />
    <Menu.RadioGroup value={sort} onValueChange={setSort}>
      <Menu.Label>Sort by</Menu.Label>
      <Menu.RadioItem value="name">Name</Menu.RadioItem>
      <Menu.RadioItem value="latency">Latency</Menu.RadioItem>
    </Menu.RadioGroup>
  </Menu.Content>
</Menu.Root>`}
        >
          <Menu.Root>
            <Menu.Trigger render={<Button />}>View</Menu.Trigger>
            <Menu.Content>
              <Menu.Group>
                <Menu.Label>Panels</Menu.Label>
                <Menu.CheckboxItem checked={showLogs} onCheckedChange={setShowLogs} closeOnClick={false}>
                  Logs
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={showMetrics} onCheckedChange={setShowMetrics} closeOnClick={false}>
                  Metrics
                </Menu.CheckboxItem>
              </Menu.Group>
              <Menu.Separator />
              <Menu.RadioGroup value={sort} onValueChange={setSort}>
                <Menu.Label>Sort by</Menu.Label>
                <Menu.RadioItem value="name" closeOnClick={false}>
                  Name
                </Menu.RadioItem>
                <Menu.RadioItem value="latency" closeOnClick={false}>
                  Latency
                </Menu.RadioItem>
                <Menu.RadioItem value="uptime" closeOnClick={false}>
                  Uptime
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Content>
          </Menu.Root>
          <span className="nt-label">
            logs: {String(showLogs)} · metrics: {String(showMetrics)} · sort: {sort}
          </span>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Menu.Content"
          rows={[
            { name: "side", type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"', default: '"bottom"', description: "Side of the trigger to open on." },
            { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alignment against the trigger." },
            { name: "sideOffset", type: "number", default: "4", description: "Gap from the trigger in pixels." },
          ]}
        />
        <PropsTable
          title="Menu.Item"
          rows={[
            { name: "icon", type: "ReactNode", description: "Icon in the leading column." },
            { name: "shortcut", type: "ReactNode", description: "Shortcut hint at the trailing edge." },
            { name: "danger", type: "boolean", default: "false", description: "Destructive styling." },
            { name: "onClick / disabled / closeOnClick", type: "Base UI Menu.Item props", description: "Behavior." },
          ]}
        />
        <PropsTable
          title="Other parts"
          rows={[
            { name: "Menu.Root", type: "Base UI Menu.Root", description: "State container: open, onOpenChange, modal." },
            { name: "Menu.Trigger", type: "Base UI Menu.Trigger", description: "Use render={<Button />} for a Neutronic button." },
            { name: "Menu.CheckboxItem", type: "checked, onCheckedChange, shortcut", description: "Toggles a setting." },
            { name: "Menu.RadioGroup / RadioItem", type: "value, onValueChange / value", description: "Picks one option." },
            { name: "Menu.Group / Label / Separator", type: "—", description: "Structure and headings." },
            { name: "Menu.Submenu / SubmenuTrigger", type: "—", description: "Nests a Menu.Content inside the menu." },
          ]}
        />
      </Section>
    </Page>
  );
}
