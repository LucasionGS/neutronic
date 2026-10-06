import { Button, useTheme } from "@ionnet/neutronic-react";
import { GROUPS, getPages } from "./docs/registry";
import { useRoute } from "./docs/router";

function ThemeSwitch() {
  const { resolved, toggle } = useTheme();
  return (
    <Button size="sm" variant="ghost" onClick={toggle} aria-label="Toggle theme">
      {resolved === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}

function Sidebar({ route }: { route: string }) {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      {GROUPS.map((group) => {
        const items = getPages().filter((p) => p.group === group);
        if (!items.length) return null;
        return (
          <div className="docs-nav-group" key={group}>
            <div className="docs-nav-label">{group}</div>
            {items.map((p) => (
              <a key={p.slug} href={`#/${p.slug}`} className="docs-nav-link" aria-current={route === p.slug ? "page" : undefined}>
                {p.title}
              </a>
            ))}
          </div>
        );
      })}
    </nav>
  );
}

export function App() {
  const route = useRoute();
  const page = getPages().find((p) => p.slug === route) ?? getPages().find((p) => p.slug === "overview");

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <a href="#/overview" className="docs-brand">
          <span className="docs-brand-mark" aria-hidden="true" />
          neutronic
        </a>
        <span className="docs-version">v0.0.0</span>
        <div className="docs-topbar-end">
          <ThemeSwitch />
        </div>
      </header>
      <aside className="docs-sidebar">
        <Sidebar route={route} />
      </aside>
      <main className="docs-main">{page ? <page.Component key={page.slug} /> : <p>Page not found.</p>}</main>
    </div>
  );
}
