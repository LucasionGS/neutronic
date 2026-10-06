import { tokens, tokenVarName } from "@ionnet/neutronic";
import { useTheme } from "@ionnet/neutronic-react";
import { Code, Page, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "colors",
  title: "Colors",
  group: "Foundations",
  order: 1,
  description: "Semantic color tokens with tuned values for the dark and light themes.",
};

const GROUPS: Array<[string, Array<keyof typeof tokens.color>]> = [
  ["Surfaces", ["bg", "surface", "surfaceRaised", "sunken", "scrim"]],
  ["Borders", ["border", "borderMuted", "borderStrong"]],
  ["Text", ["text", "textMuted", "textSubtle"]],
  ["Accent", ["accent", "accentHover", "accentSoft", "onAccent"]],
  ["Status", ["success", "successSoft", "warning", "warningSoft", "danger", "dangerHover", "dangerSoft", "onDanger"]],
];

export default function Colors() {
  const { resolved } = useTheme();
  return (
    <Page title={meta.title} description={meta.description}>
      {GROUPS.map(([group, names]) => (
        <Section key={group} title={group}>
          <div className="docs-swatches">
            {names.map((name) => {
              const cssVar = tokenVarName(["color", name]);
              return (
                <div className="docs-swatch" key={name}>
                  <div className="docs-swatch-chip" style={{ background: `var(${cssVar})` }} />
                  <div className="docs-swatch-name">{name}</div>
                  <div className="docs-swatch-meta">{cssVar}</div>
                  <div className="docs-swatch-meta">{tokens.color[name][resolved]}</div>
                </div>
              );
            })}
          </div>
        </Section>
      ))}
      <Section title="Usage">
        <Code>{`/* CSS */
.my-panel { background: var(--nt-color-surface); }

// TypeScript
import { vars } from "@ionnet/neutronic";
<div style={{ color: vars.color.textMuted }} />`}</Code>
      </Section>
    </Page>
  );
}
