import { Button, ToastProvider, useToast, type ToastType } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "toast",
  title: "Toast",
  group: "Feedback",
  description: "Brief notifications that stack in the corner and dismiss themselves. Swipe or press F6 to reach them.",
};

const MESSAGES: Record<ToastType, { title: string; description: string }> = {
  info: { title: "Maintenance window", description: "eu-west-2 restarts at 02:00 UTC." },
  success: { title: "Deploy finished", description: "Build 4821 is live on 6 nodes." },
  warning: { title: "Disk at 82%", description: "node-b will hit its quota in about 3 days." },
  danger: { title: "Health check failed", description: "node-c stopped responding on port 8443." },
};

function TypeButtons() {
  const toast = useToast();
  return (
    <>
      {(Object.keys(MESSAGES) as ToastType[]).map((type) => (
        <Button key={type} onClick={() => toast.add({ type, ...MESSAGES[type] })}>
          {type}
        </Button>
      ))}
    </>
  );
}

function UndoButton() {
  const toast = useToast();
  return (
    <Button
      variant="danger"
      onClick={() => {
        const id = toast.add({
          title: "node-b drained",
          description: "14 jobs moved to node-a and node-c.",
          timeout: 8000,
          action: {
            label: "Undo",
            onClick: () => {
              toast.close(id);
              toast.add({ title: "Drain reverted", type: "success" });
            },
          },
        });
      }}
    >
      Drain node-b
    </Button>
  );
}

function PromiseButton() {
  const toast = useToast();
  const deploy = (fail: boolean) =>
    toast.promise(
      new Promise<number>((resolve, reject) => setTimeout(() => (fail ? reject(new Error("timeout")) : resolve(6)), 1800)),
      {
        loading: { title: "Deploying build 4822…", description: "Rolling out to eu-west-2." },
        success: (nodes) => ({ title: "Deploy finished", description: `Live on ${nodes} nodes.` }),
        error: { title: "Deploy failed", description: "node-c timed out. Nothing was changed." },
      },
    ).catch(() => undefined);
  return (
    <>
      <Button variant="primary" onClick={() => deploy(false)}>
        Deploy
      </Button>
      <Button onClick={() => deploy(true)}>Deploy (fails)</Button>
    </>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <Page title={meta.title} description={meta.description}>
        <Section title="Setup">
          <p>
            Wrap your app in <code>ToastProvider</code> once. It renders the viewport. Call <code>useToast()</code> anywhere
            below it.
          </p>
        </Section>

        <Section title="Examples">
          <Example
            title="Types"
            description="Hover over the stack to expand it."
            code={`const toast = useToast();

toast.add({ type: "success", title: "Deploy finished", description: "Build 4821 is live on 6 nodes." });`}
          >
            <TypeButtons />
          </Example>

          <Example
            title="With an action"
            code={`const id = toast.add({
  title: "node-b drained",
  action: { label: "Undo", onClick: () => toast.close(id) },
});`}
          >
            <UndoButton />
          </Example>

          <Example
            title="Promise"
            description="Shows a loading toast that turns into success or error when the promise settles."
            code={`toast.promise(deploy(), {
  loading: { title: "Deploying build 4822…" },
  success: (nodes) => ({ title: "Deploy finished", description: \`Live on \${nodes} nodes.\` }),
  error: { title: "Deploy failed" },
});`}
          >
            <PromiseButton />
          </Example>
        </Section>

        <Section title="API">
          <PropsTable
            title="ToastProvider"
            rows={[
              { name: "limit", type: "number", default: "3", description: "Toasts visible at once. Older ones collapse." },
              { name: "timeout", type: "number", default: "5000", description: "Default auto-dismiss time in ms." },
            ]}
          />
          <PropsTable
            title="useToast()"
            rows={[
              { name: "add", type: "(options: ToastOptions) => string", description: "Shows a toast and returns its ID." },
              { name: "update", type: "(id, options: ToastUpdate) => void", description: "Changes an open toast." },
              { name: "close", type: "(id?: string) => void", description: "Closes one toast, or all of them." },
              { name: "promise", type: "(promise, { loading, success, error }) => Promise", description: "Tracks a promise with one toast." },
            ]}
          />
          <PropsTable
            title="ToastOptions"
            rows={[
              { name: "title", type: "ReactNode", description: "Main message." },
              { name: "description", type: "ReactNode", description: "Secondary line." },
              { name: "type", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "Sets the edge color and icon." },
              { name: "timeout", type: "number", description: "Overrides the provider timeout. 0 keeps it open." },
              { name: "priority", type: '"low" | "high"', default: '"low"', description: "high announces it urgently to screen readers." },
              { name: "action", type: "{ label, onClick }", description: "Adds an action button such as Undo." },
              { name: "id", type: "string", description: "Reusing an ID updates that toast in place." },
            ]}
          />
        </Section>
      </Page>
    </ToastProvider>
  );
}
