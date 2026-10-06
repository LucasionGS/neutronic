import { Code, Page, Section } from "../docs/Page";
import { getPages, type PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "overview",
  title: "Overview",
  group: "Foundations",
  order: 0,
  description: "A sharp, technical design system with typed tokens, framework-agnostic CSS and React components.",
};

export default function Overview() {
  const components = getPages().filter((p) => p.group !== "Foundations");
  return (
    <Page title="Neutronic" description={meta.description}>
      <Section title="Packages">
        <p>
          <code>@ionnet/neutronic</code> holds the tokens, base styles and all component CSS. It has no framework
          dependency. <code>@ionnet/neutronic-react</code> adds React components with state, keyboard support and
          accessibility, built on Base UI.
        </p>
        <Code>{`pnpm add @ionnet/neutronic @ionnet/neutronic-react`}</Code>
      </Section>

      <Section title="Setup">
        <Code>{`import "@ionnet/neutronic/styles.css";
import { NeutronicProvider, Button } from "@ionnet/neutronic-react";

export function App() {
  return (
    <NeutronicProvider>
      <Button variant="primary">Deploy</Button>
    </NeutronicProvider>
  );
}`}</Code>
        <p>
          <code>styles.css</code> includes IBM Plex Sans and Mono. Import <code>styles-no-fonts.css</code> instead if
          you load the fonts yourself.
        </p>
      </Section>

      <Section title="Components">
        <div className="docs-grid">
          {components.map((p) => (
            <a key={p.slug} className="docs-card" href={`#/${p.slug}`}>
              <strong>{p.title}</strong>
              <span>{p.description}</span>
            </a>
          ))}
        </div>
      </Section>
    </Page>
  );
}
