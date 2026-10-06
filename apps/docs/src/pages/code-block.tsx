import { CodeBlock } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "code-block",
  title: "Code block",
  group: "Data display",
  description: "Preformatted source with a file header, line numbers and a copy button.",
};

const CONFIG = `import { defineConfig } from "@ionnet/reactor";

export default defineConfig({
  name: "reactor-core",
  region: "eu-west-2",
  replicas: 3,
  resources: { cpu: "2", memory: "4Gi" },
  probes: { readiness: "/healthz", interval: "10s" },
});`;

export default function CodeBlockPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          stack
          title="With header and line numbers"
          code={`<CodeBlock filename="reactor.config.ts" language="ts" showLineNumbers code={source} />`}
        >
          <CodeBlock filename="reactor.config.ts" language="ts" showLineNumbers code={CONFIG} />
        </Example>

        <Example stack title="Minimal" description="Without a header, the copy button floats in the corner." code={`<CodeBlock code="pnpm add @ionnet/neutronic @ionnet/neutronic-react" />`}>
          <CodeBlock code="pnpm add @ionnet/neutronic @ionnet/neutronic-react" />
        </Example>

        <Example stack title="Bracketed" code={`<CodeBlock bracket language="bash" code={...} />`}>
          <CodeBlock
            bracket
            language="bash"
            code={`kubectl rollout status deploy/reactor-core -n prod\nkubectl logs -l app=reactor-core --since=10m`}
          />
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: "code", type: "string", description: "Source text. Leading and trailing blank lines are trimmed." },
            { name: "language", type: "string", description: "Language label in the header." },
            { name: "filename", type: "string", description: "File name in the header." },
            { name: "showLineNumbers", type: "boolean", default: "false", description: "Numbers each line." },
            { name: "copyable", type: "boolean", default: "true", description: "Shows the copy button." },
            { name: "bracket", type: "boolean", default: "false", description: "Draws accent corner brackets." },
          ]}
        />
      </Section>
    </Page>
  );
}
