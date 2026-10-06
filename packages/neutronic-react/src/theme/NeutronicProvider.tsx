import type { ReactNode } from "react";
import { ToastProvider, type ToastProviderProps } from "../components/Toast/Toast";
import { TooltipProvider, type TooltipProviderProps } from "../components/Tooltip/Tooltip";
import { ThemeProvider, type ThemeProviderProps } from "./ThemeProvider";

/** Props for {@link NeutronicProvider}. */
export interface NeutronicProviderProps extends Omit<ThemeProviderProps, "children"> {
  children: ReactNode;
  /** Options for the toast viewport, such as `limit` and `timeout`. */
  toast?: Omit<ToastProviderProps, "children">;
  /** Shared tooltip timing, such as `delay`. */
  tooltip?: Omit<TooltipProviderProps, "children">;
}

/**
 * Sets up everything Neutronic components rely on: theme, tooltip timing and the toast viewport.
 * Place it once at the root of the app.
 *
 * @example
 * <NeutronicProvider defaultMode="dark">
 *   <App />
 * </NeutronicProvider>
 */
export function NeutronicProvider({ children, toast, tooltip, ...theme }: NeutronicProviderProps) {
  return (
    <ThemeProvider {...theme}>
      <TooltipProvider {...tooltip}>
        <ToastProvider {...toast}>{children}</ToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
