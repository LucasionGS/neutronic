import { Icon } from "@ionnet/neutronic-react";
import {
  Activity,
  Bell,
  Box,
  Cpu,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Key,
  Network,
  Server,
  Settings,
  Shield,
  Terminal,
  Zap,
} from "@ionnet/neutronic-react/icons";
import { Code, Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "icons",
  title: "Icons",
  group: "Foundations",
  order: 4,
  description: "Lucide icons at a fixed 1.5px stroke, sized to sit with mono text.",
};

const SAMPLE = { Activity, Bell, Box, Cpu, Database, GitBranch, Globe, HardDrive, Key, Network, Server, Settings, Shield, Terminal, Zap };

export default function Icons() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example title="Sizes" code={`<Icon icon={Server} size="xs" />  // 12px\n<Icon icon={Server} size="lg" />  // 20px`}>
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <span key={size} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon icon={Server} size={size} />
              <span className="nt-label">{size}</span>
            </span>
          ))}
        </Example>
        <Example title="A few from the set">
          {Object.entries(SAMPLE).map(([name, glyph]) => (
            <span key={name} title={name} style={{ display: "inline-flex", padding: 8 }}>
              <Icon icon={glyph} size="lg" />
            </span>
          ))}
        </Example>
      </Section>

      <Section title="Usage">
        <p>
          Every Lucide icon is re-exported from <code>@ionnet/neutronic-react/icons</code>. Wrap it in{" "}
          <code>Icon</code> to get Neutronic's size and stroke defaults. Icons are hidden from screen readers unless you
          pass a <code>label</code>.
        </p>
        <Code>{`import { Icon } from "@ionnet/neutronic-react";
import { Server } from "@ionnet/neutronic-react/icons";

<Icon icon={Server} size="sm" />
<Icon icon={Server} label="Server online" />`}</Code>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "icon", type: "LucideIcon", description: "The icon component to render." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg" | number', default: '"md"', description: "12, 14, 16 or 20px, or any pixel value." },
            { name: "label", type: "string", description: "Accessible name. Omit for decorative icons." },
            { name: "strokeWidth", type: "number", default: "1.5", description: "Stroke width, kept constant across sizes." },
          ]}
        />
      </Section>
    </Page>
  );
}
