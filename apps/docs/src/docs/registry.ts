import type { ComponentType } from "react";

/** Sidebar groups, in display order. */
export const GROUPS = ["Foundations", "Actions", "Forms", "Navigation", "Overlays", "Feedback", "Data display", "Layout"] as const;

export type DocGroup = (typeof GROUPS)[number];

/** Metadata every page module in `src/pages` must export as `meta`. */
export interface PageMeta {
  /** URL segment, e.g. `"button"` for `#/button`. */
  slug: string;
  title: string;
  group: DocGroup;
  /** One-sentence summary shown under the title and in the overview. */
  description: string;
  /** Sort position within the group; lower comes first. Defaults to alphabetical. */
  order?: number;
}

export interface DocPage extends PageMeta {
  Component: ComponentType;
}

const modules = import.meta.glob<{ meta: PageMeta; default: ComponentType }>("../pages/*.tsx", { eager: true });

let cache: DocPage[] | undefined;

/** All doc pages, sorted by group then order then title. Resolved lazily so pages can import the registry. */
export function getPages(): DocPage[] {
  cache ??= Object.values(modules)
    .filter((mod) => mod.meta && mod.default)
    .map((mod) => ({ ...mod.meta, Component: mod.default }))
    .sort(
      (a, b) =>
        GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) ||
        (a.order ?? 100) - (b.order ?? 100) ||
        a.title.localeCompare(b.title),
    );
  return cache;
}
