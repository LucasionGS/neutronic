import { Button, Icon, Tooltip, TooltipProvider } from "@ionnet/neutronic-react";
import { Pause, Play, RotateCw, Trash2 } from "@ionnet/neutronic-react/icons";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "tooltip",
  title: "Tooltip",
  group: "Overlays",
  description: "A short label shown when an element is hovered or focused. Ideal for icon-only buttons.",
};

export default function TooltipPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <TooltipProvider>
        <Section title="Examples">
          <Example
            title="Toolbar"
            description="Inside a TooltipProvider, moving between triggers opens the next tooltip instantly."
            code={`<TooltipProvider>
  <Tooltip content="Start">
    <Button iconOnly aria-label="Start"><Icon icon={Play} /></Button>
  </Tooltip>
  <Tooltip content="Restart · ⌘R">
    <Button iconOnly aria-label="Restart"><Icon icon={RotateCw} /></Button>
  </Tooltip>
</TooltipProvider>`}
          >
            <Tooltip content="Start">
              <Button iconOnly aria-label="Start">
                <Icon icon={Play} />
              </Button>
            </Tooltip>
            <Tooltip content="Pause">
              <Button iconOnly aria-label="Pause">
                <Icon icon={Pause} />
              </Button>
            </Tooltip>
            <Tooltip content="Restart · ⌘R">
              <Button iconOnly aria-label="Restart">
                <Icon icon={RotateCw} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete node">
              <Button iconOnly variant="ghost" aria-label="Delete node">
                <Icon icon={Trash2} />
              </Button>
            </Tooltip>
          </Example>

          <Example
            title="Sides"
            code={`<Tooltip content="Opens below" side="bottom">
  <Button>Bottom</Button>
</Tooltip>`}
          >
            <Tooltip content="Opens above" side="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip content="Opens to the right" side="right">
              <Button>Right</Button>
            </Tooltip>
            <Tooltip content="Opens below" side="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content="Opens to the left" side="left">
              <Button>Left</Button>
            </Tooltip>
          </Example>
        </Section>
      </TooltipProvider>

      <Section title="Props">
        <PropsTable
          title="Tooltip"
          rows={[
            { name: "content", type: "ReactNode", description: "Tooltip text. Keep it short and non-interactive." },
            { name: "children", type: "ReactElement", description: "One element that accepts a ref, such as a Button." },
            { name: "side", type: '"top" | "bottom" | "left" | "right" | …', default: '"top"', description: "Side of the trigger to open on." },
            { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger." },
            { name: "delay / closeDelay", type: "number", description: "Override the provider's hover delays." },
            { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open) => void", description: "Control visibility." },
            { name: "disabled", type: "boolean", default: "false", description: "Stops the tooltip from opening." },
          ]}
        />
        <PropsTable
          title="TooltipProvider"
          rows={[
            { name: "delay", type: "number", default: "500", description: "Milliseconds before opening on hover." },
            { name: "closeDelay", type: "number", description: "Milliseconds before closing." },
            { name: "timeout", type: "number", default: "400", description: "Window in which the next tooltip opens instantly." },
          ]}
        />
      </Section>
    </Page>
  );
}
