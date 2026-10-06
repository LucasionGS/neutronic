import { useEffect, useState } from "react";

const read = () => window.location.hash.replace(/^#\/?/, "") || "overview";

/** Returns the current `#/slug` route and re-renders when it changes. */
export function useRoute(): string {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      document.querySelector(".docs-main")?.scrollTo({ top: 0 });
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
