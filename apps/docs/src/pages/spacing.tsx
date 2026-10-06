import { tokens, vars } from "@ionnet/neutronic";
import { Code, Page, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "spacing",
  title: "Spacing & sizing",
  group: "Foundations",
  order: 3,
  description: "A 4px spacing grid, three control heights and the corner-bracket geometry.",
};

const SPACE = Object.keys(tokens.space) as Array<keyof typeof tokens.space>;

export default function Spacing() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Space">
        <div style={{ display: "grid", gap: 8 }}>
          {SPACE.map((key) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", gap: 16 }}>
              <span className="nt-label">
                space-{key} · {tokens.space[key]}
              </span>
              <span style={{ height: 10, width: vars.space[key], background: vars.color.accent }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Control heights">
        <p>Buttons, inputs, selects and segmented controls share these heights. The default is 32px.</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} style={{ display: "grid", gap: 6, justifyItems: "center" }}>
              <span
                style={{
                  width: 64,
                  height: vars.size.control[size],
                  border: `1px solid ${vars.color.border}`,
                  background: vars.color.sunken,
                }}
              />
              <span className="nt-label">
                {size} · {tokens.size.control[size]}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Corner brackets">
        <p>
          The bracket motif marks focus, panels, overlays and selection. Add <code>nt-focus</code> to a focusable
          element, <code>nt-focus-within</code> to a wrapper, or <code>nt-bracket</code> for permanent brackets.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div className="nt-bracket" style={{ padding: 16, border: `1px solid ${vars.color.border}`, background: vars.color.surface }}>
            nt-bracket
          </div>
          <div className="nt-bracket" data-bracket="sm" style={{ padding: 16, background: vars.color.accentSoft }}>
            data-bracket="sm"
          </div>
        </div>
        <Code>{`<div class="nt-panel nt-bracket">…</div>
<button class="nt-button nt-focus">…</button>`}</Code>
      </Section>
    </Page>
  );
}
