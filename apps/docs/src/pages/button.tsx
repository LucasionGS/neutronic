import { Button, Icon } from "@ionnet/neutronic-react";
import { Play, RotateCw, Trash2 } from "@ionnet/neutronic-react/icons";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "button",
  title: "Button",
  group: "Actions",
  description: "Triggers an action. Secondary buttons use side brackets instead of a full border.",
};

export default function ButtonPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          title="Variants"
          code={`<Button variant="primary">Deploy</Button>
<Button>Cancel</Button>
<Button variant="outline">Logs</Button>
<Button variant="ghost">Details</Button>
<Button variant="danger">Delete</Button>`}
        >
          <Button variant="primary">Deploy</Button>
          <Button>Cancel</Button>
          <Button variant="outline">Logs</Button>
          <Button variant="ghost">Details</Button>
          <Button variant="danger">Delete</Button>
        </Example>

        <Example title="Sizes" code={`<Button size="sm">Small</Button>\n<Button>Medium</Button>\n<Button size="lg">Large</Button>`}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
          <Button size="lg">Large</Button>
        </Example>

        <Example
          title="With icons"
          code={`<Button variant="primary"><Icon icon={Play} size="sm" />Run</Button>
<Button iconOnly aria-label="Restart"><Icon icon={RotateCw} /></Button>`}
        >
          <Button variant="primary">
            <Icon icon={Play} size="sm" />
            Run
          </Button>
          <Button>
            <Icon icon={RotateCw} size="sm" />
            Restart
          </Button>
          <Button iconOnly aria-label="Restart">
            <Icon icon={RotateCw} />
          </Button>
          <Button iconOnly variant="ghost" aria-label="Delete">
            <Icon icon={Trash2} />
          </Button>
        </Example>

        <Example title="Disabled">
          <Button variant="primary" disabled>Deploy</Button>
          <Button disabled>Cancel</Button>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "danger"', default: '"secondary"', description: "Visual emphasis." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and padding: 28, 32 or 40px." },
            { name: "iconOnly", type: "boolean", default: "false", description: "Square button for a single icon. Needs an aria-label." },
            { name: "...rest", type: "ButtonHTMLAttributes", description: "All native button attributes." },
          ]}
        />
      </Section>
    </Page>
  );
}
