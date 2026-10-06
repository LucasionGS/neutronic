import { useState } from "react";
import { AlertDialog, Button, Dialog, Input } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "dialog",
  title: "Dialog",
  group: "Overlays",
  description: "Modal windows for focused tasks and confirmations. Focus stays inside until they close.",
};

function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [replicas, setReplicas] = useState("3");
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open controlled
      </Button>
      <span style={{ fontFamily: "var(--nt-font-mono)", fontSize: "var(--nt-text-xs)", color: "var(--nt-color-text-muted)" }}>
        replicas = {replicas}
      </span>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content title="Set replicas" size="sm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Dialog.Body>
              <Input label="Replicas" type="number" min={1} value={replicas} onChange={(e) => setReplicas(e.target.value)} />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close>Cancel</Dialog.Close>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default function DialogPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example
          title="Basic"
          code={`<Dialog.Root>
  <Dialog.Trigger variant="primary">Scale cluster</Dialog.Trigger>
  <Dialog.Content title="Scale reactor-core" description="Changes roll out to all three regions.">
    <Dialog.Body>
      <Input label="Nodes" defaultValue="6" />
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>Cancel</Dialog.Close>
      <Dialog.Close variant="primary">Apply</Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`}
        >
          <Dialog.Root>
            <Dialog.Trigger variant="primary">Scale cluster</Dialog.Trigger>
            <Dialog.Content title="Scale reactor-core" description="Changes roll out to all three regions.">
              <Dialog.Body>
                <div style={{ display: "grid", gap: 12 }}>
                  <Input label="Nodes" defaultValue="6" />
                  <Input label="Max surge" defaultValue="25" suffix="%" />
                </div>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close>Cancel</Dialog.Close>
                <Dialog.Close variant="primary">Apply</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </Example>

        <Example
          title="Sizes"
          description="sm is 24rem, md 32rem and lg 44rem wide. Long content scrolls inside the body."
          code={`<Dialog.Content size="lg" title="Deploy log">…</Dialog.Content>`}
        >
          {(["sm", "md", "lg"] as const).map((size) => (
            <Dialog.Root key={size}>
              <Dialog.Trigger>Open {size}</Dialog.Trigger>
              <Dialog.Content size={size} title={`Deploy log · ${size}`} description="Build 4821 on main">
                <Dialog.Body>
                  <pre style={{ margin: 0, fontFamily: "var(--nt-font-mono)", fontSize: "var(--nt-text-xs)", whiteSpace: "pre-wrap" }}>
                    {Array.from({ length: 24 }, (_, i) => `[12:04:${String(i).padStart(2, "0")}] step ${i + 1}/24 ok`).join("\n")}
                  </pre>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close>Close</Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          ))}
        </Example>

        <Example
          title="Controlled"
          description="Use open and onOpenChange to open the dialog from anywhere and close it after a form submits."
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open controlled</Button>
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Content title="Set replicas" size="sm">
    <form onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>…</form>
  </Dialog.Content>
</Dialog.Root>`}
        >
          <ControlledDialog />
        </Example>

        <Example
          title="Alert dialog"
          description="For destructive actions. It has no close button and does not dismiss on outside clicks."
          code={`<AlertDialog.Root>
  <AlertDialog.Trigger variant="danger">Drain node</AlertDialog.Trigger>
  <AlertDialog.Content title="Drain node-b?" description="Running jobs move to other nodes. This takes about 2 minutes.">
    <AlertDialog.Footer>
      <AlertDialog.Close>Cancel</AlertDialog.Close>
      <AlertDialog.Close variant="danger">Drain node</AlertDialog.Close>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>`}
        >
          <AlertDialog.Root>
            <AlertDialog.Trigger variant="danger">Drain node</AlertDialog.Trigger>
            <AlertDialog.Content
              title="Drain node-b?"
              description="Running jobs move to other nodes. This takes about 2 minutes."
            >
              <AlertDialog.Footer>
                <AlertDialog.Close>Cancel</AlertDialog.Close>
                <AlertDialog.Close variant="danger">Drain node</AlertDialog.Close>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Dialog.Root"
          rows={[
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when uncontrolled." },
            { name: "onOpenChange", type: "(open: boolean, details) => void", description: "Called when the dialog opens or closes." },
            { name: "modal", type: "boolean | \"trap-focus\"", default: "true", description: "Locks scrolling and outside interaction." },
          ]}
        />
        <PropsTable
          title="Dialog.Content"
          rows={[
            { name: "title", type: "ReactNode", description: "Heading and accessible name." },
            { name: "description", type: "ReactNode", description: "Supporting text under the title." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Maximum width." },
            { name: "showClose", type: "boolean", default: "true", description: "Shows the close button in the header." },
            { name: "container", type: "HTMLElement | ref", description: "Portal target. Defaults to document.body." },
          ]}
        />
        <PropsTable
          title="Dialog.Trigger / Dialog.Close"
          rows={[
            { name: "variant / size / iconOnly", type: "ButtonProps", description: "Passed to the rendered Button." },
            { name: "render", type: "ReactElement", description: "Replaces the default Button with your own element." },
          ]}
        />
        <PropsTable
          title="AlertDialog.Content"
          rows={[
            { name: "title", type: "ReactNode", description: "Required. The question being confirmed." },
            { name: "description", type: "ReactNode", description: "Explains the consequence." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"sm"', description: "Maximum width." },
          ]}
        />
      </Section>
    </Page>
  );
}
