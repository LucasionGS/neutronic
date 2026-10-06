import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyTheme,
  resolveTheme,
  watchSystemTheme,
  type ResolvedTheme,
  type ThemeMode,
} from "@ionnet/neutronic";

/** The value exposed by {@link useTheme}. */
export interface ThemeContextValue {
  /** The user's preference, which may be `"system"`. */
  mode: ThemeMode;
  /** The theme actually being rendered. */
  resolved: ResolvedTheme;
  /** Changes the preference and persists it if a `storageKey` is configured. */
  setMode: (mode: ThemeMode) => void;
  /** Flips between light and dark, leaving `"system"` mode. */
  toggle: () => void;
}

/** Props for {@link ThemeProvider}. */
export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial preference when nothing is stored. Defaults to `"dark"` (Neutronic is dark-first). */
  defaultMode?: ThemeMode;
  /** `localStorage` key used to remember the preference. Pass `null` to disable persistence. */
  storageKey?: string | null;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredMode(key: string | null): ThemeMode | null {
  if (!key || typeof localStorage === "undefined") return null;
  try {
    const value = localStorage.getItem(key);
    return value === "light" || value === "dark" || value === "system" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Provides the active Neutronic theme to its subtree and applies it to the document root.
 * Follows OS changes while in `"system"` mode.
 */
export function ThemeProvider({
  children,
  defaultMode = "dark",
  storageKey = "nt-theme",
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode(storageKey) ?? defaultMode);
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(mode));

  useEffect(() => {
    setResolved(applyTheme(mode));
    if (mode !== "system") return;
    return watchSystemTheme(() => setResolved(applyTheme("system")));
  }, [mode]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, next);
      } catch {}
    },
    [storageKey],
  );

  const toggle = useCallback(() => setMode(resolved === "dark" ? "light" : "dark"), [resolved, setMode]);

  const value = useMemo(() => ({ mode, resolved, setMode, toggle }), [mode, resolved, setMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Reads and controls the current theme.
 *
 * @throws If called outside a {@link ThemeProvider}.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a <ThemeProvider>.");
  return context;
}
