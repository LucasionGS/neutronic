import { Badge, type BadgeVariant } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "badge",
  title: "Badge",
  group: "Data display",
  description: "Compact labels for status, counts and categories.",
};

const VARIANTS: BadgeVariant[] = ["neutral", "accent", "success", "warning", "danger"];

export default function BadgePage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example stack title="Variants and appearances" code={`<Badge variant="success">healthy</Badge>
<Badge variant="success" appearance="outline">healthy</Badge>
<Badge variant="success" appearance="solid">healthy</Badge>`}>
          {(["soft", "outline", "solid"] as const).map((appearance) => (
            <div key={appearance} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {VARIANTS.map((variant) => (
                <Badge key={variant} variant={variant} appearance={appearance}>
                  {variant}
                </Badge>
              ))}
            </div>
          ))}
        </Example>

        <Example title="Status dots" code={`<Badge variant="success" dot>Online</Badge>`}>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Degraded</Badge>
          <Badge variant="danger" dot>Down</Badge>
          <Badge dot>Paused</Badge>
        </Example>

        <Example title="Sizes" code={`<Badge size="sm">v2.4.1</Badge>`}>
          <Badge size="sm" variant="accent">v2.4.1</Badge>
          <Badge variant="accent">v2.4.1</Badge>
          <Badge size="sm">eu-west-2</Badge>
          <Badge>eu-west-2</Badge>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "variant", type: '"neutral" | "accent" | "success" | "warning" | "danger"', default: '"neutral"', description: "Semantic color." },
            { name: "appearance", type: '"soft" | "outline" | "solid"', default: '"soft"', description: "Fill treatment." },
            { name: "dot", type: "boolean", default: "false", description: "Adds a leading status square." },
            { name: "size", type: '"sm" | "md"', default: '"md"', description: "Height: 18 or 22px." },
          ]}
        />
      </Section>
    </Page>
  );
}
