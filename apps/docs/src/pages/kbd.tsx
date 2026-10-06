import { Kbd } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "kbd",
  title: "Kbd",
  group: "Data display",
  description: "Shows keyboard keys and shortcuts.",
};

const SHORTCUTS: Array<[string, string[]]> = [
  ["Open command palette", ["⌘", "K"]],
  ["Restart selected node", ["Shift", "R"]],
  ["Jump to notifications", ["F6"]],
  ["Close dialog", ["Esc"]],
];

export default function KbdPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example title="Single keys" code={`<Kbd>Esc</Kbd>\n<Kbd>Enter</Kbd>`}>
          <Kbd>Esc</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd size="sm">Tab</Kbd>
        </Example>

        <Example title="Combinations" code={`<Kbd keys={["⌘", "K"]} />\n<Kbd keys={["Ctrl", "Shift", "P"]} separator="" />`}>
          <Kbd keys={["⌘", "K"]} />
          <Kbd keys={["Ctrl", "Shift", "P"]} />
          <Kbd keys={["Ctrl", "Shift", "P"]} separator="" />
        </Example>

        <Example stack title="In context">
          <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
            {SHORTCUTS.map(([label, keys]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "var(--nt-text-sm)" }}>
                <span>{label}</span>
                <Kbd keys={keys} size="sm" />
              </div>
            ))}
          </div>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "keys", type: "ReactNode[]", description: "Renders a combination. Overrides children." },
            { name: "separator", type: "ReactNode", default: '"+"', description: "Shown between keys." },
            { name: "size", type: '"sm" | "md"', default: '"md"', description: "Height: 18 or 22px." },
          ]}
        />
      </Section>
    </Page>
  );
}
