import { useState, type ReactNode } from "react";

/** Wraps a doc page with its title and lead paragraph. */
export function Page({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
  return (
    <article className="docs-page">
      <header className="docs-page-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </article>
  );
}

/** A titled section within a page. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="docs-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** A live demo with an optional source snippet that can be revealed. */
export function Example({
  title,
  description,
  code,
  children,
  stack,
}: {
  title?: string;
  description?: ReactNode;
  code?: string;
  children: ReactNode;
  /** Lays the demo out as a vertical stack instead of a wrapping row. */
  stack?: boolean;
}) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="docs-example">
      {(title || description) && (
        <div className="docs-example-head">
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </div>
      )}
      <div className="docs-example-frame">
        <div className="docs-example-demo" data-stack={stack || undefined}>
          {children}
        </div>
        {code && (
          <>
            <button type="button" className="docs-code-toggle" onClick={() => setShowCode((v) => !v)}>
              {showCode ? "Hide code" : "Show code"}
            </button>
            {showCode && <Code>{code.trim()}</Code>}
          </>
        )}
      </div>
    </div>
  );
}

/** A plain preformatted code block for docs. */
export function Code({ children }: { children: string }) {
  return (
    <pre className="docs-code">
      <code>{children}</code>
    </pre>
  );
}

/** A single row in a {@link PropsTable}. */
export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: ReactNode;
}

/** Documents a component's props. */
export function PropsTable({ rows, title }: { rows: PropRow[]; title?: string }) {
  return (
    <div className="docs-props">
      {title && <h3>{title}</h3>}
      <div className="docs-props-scroll">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <code>{row.name}</code>
                </td>
                <td>
                  <code className="docs-type">{row.type}</code>
                </td>
                <td>{row.default ? <code>{row.default}</code> : "—"}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
