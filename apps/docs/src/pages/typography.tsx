import { tokens, vars } from "@ionnet/neutronic";
import { Code, Page, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "typography",
  title: "Typography",
  group: "Foundations",
  order: 2,
  description: "IBM Plex Sans for reading, IBM Plex Mono for interface text, on a 14px base.",
};

const SIZES = Object.keys(tokens.text) as Array<keyof typeof tokens.text>;

export default function Typography() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Families">
        <div className="docs-grid">
          <div className="docs-card">
            <span>--nt-font-sans</span>
            <div style={{ fontFamily: vars.font.sans, fontSize: vars.text["2xl"] }}>IBM Plex Sans</div>
            <span>Body text, descriptions, control labels.</span>
          </div>
          <div className="docs-card">
            <span>--nt-font-mono</span>
            <div style={{ fontFamily: vars.font.mono, fontSize: vars.text["2xl"] }}>IBM Plex Mono</div>
            <span>Buttons, tabs, headings, field prefixes, data.</span>
          </div>
        </div>
      </Section>

      <Section title="Scale">
        <div style={{ display: "grid", gap: 14 }}>
          {SIZES.map((size) => (
            <div key={size} style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "baseline", gap: 16 }}>
              <span className="nt-label">
                {size} · {tokens.text[size]}
              </span>
              <span style={{ fontSize: vars.text[size] }}>Reactor core output is nominal</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Labels">
        <p>
          Small interface labels use mono at the <code>xs</code> size, in normal case. Apply the <code>nt-label</code>{" "}
          class to get this treatment anywhere.
        </p>
        <Code>{`<span class="nt-label">Build minutes</span>`}</Code>
      </Section>
    </Page>
  );
}
