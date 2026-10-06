import { useMemo, type ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { AlertTriangle, CheckCircle2, Info, LoaderCircle, X, XCircle, type LucideIcon } from "lucide-react";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/** Visual and semantic tone of a toast. */
export type ToastType = "info" | "success" | "warning" | "danger";

/** Options for creating a toast with {@link useToast}. */
export interface ToastOptions {
  /** Updates an existing toast in place when a toast with this ID is already shown. */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Defaults to `"info"`. */
  type?: ToastType;
  /** Milliseconds before auto-dismissal. `0` keeps the toast until closed. */
  timeout?: number;
  /** `"high"` announces the toast urgently to screen readers. Defaults to `"low"`. */
  priority?: "low" | "high";
  /** Renders an action button inside the toast, such as "Undo". */
  action?: { label: ReactNode; onClick: () => void };
  /** Called when the toast starts closing. */
  onClose?: () => void;
}

/** A partial update applied to an existing toast. */
export type ToastUpdate = Partial<Omit<ToastOptions, "id">>;

type PromiseState<T> = string | ToastUpdate | ((value: T) => string | ToastUpdate);

/** Messages shown while a promise is pending, resolved and rejected. */
export interface ToastPromiseOptions<T> {
  loading: string | ToastUpdate;
  success: PromiseState<T>;
  error: PromiseState<unknown>;
}

/** The API returned by {@link useToast}. */
export interface ToastApi {
  /** Shows a toast and returns its ID. */
  add: (options: ToastOptions) => string;
  /** Closes the toast with the given ID, or every toast when omitted. */
  close: (id?: string) => void;
  /** Changes an open toast. */
  update: (id: string, options: ToastUpdate) => void;
  /** Shows a loading toast that turns into a success or error toast when the promise settles. */
  promise: <T>(promise: Promise<T>, options: ToastPromiseOptions<T>) => Promise<T>;
}

/** Props for {@link ToastProvider}. */
export interface ToastProviderProps {
  children: ReactNode;
  /** Maximum toasts visible at once. Older ones collapse behind. Defaults to `3`. */
  limit?: number;
  /** Default auto-dismiss time in milliseconds. Defaults to `5000`. */
  timeout?: number;
}

const ICONS: Record<string, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  error: XCircle,
  loading: LoaderCircle,
};

function toBase(options: ToastUpdate & { id?: string }) {
  const { action, ...rest } = options;
  return action ? { ...rest, actionProps: { children: action.label, onClick: action.onClick } } : rest;
}

function toBaseMessage(message: string | ToastUpdate) {
  return typeof message === "string" ? message : toBase(message);
}

function toBaseState<T>(state: PromiseState<T>) {
  return typeof state === "function" ? (value: T) => toBaseMessage(state(value)) : toBaseMessage(state);
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => {
    const Glyph = ICONS[toast.type ?? "info"] ?? Info;
    return (
      <BaseToast.Root key={toast.id} toast={toast} className="nt-toast nt-bracket">
        <BaseToast.Content className="nt-toast-content">
          <span className="nt-toast-icon">
            <Icon icon={Glyph} size="md" />
          </span>
          <div className="nt-toast-text">
            <BaseToast.Title className="nt-toast-title" />
            <BaseToast.Description className="nt-toast-description" />
            {toast.actionProps && (
              <div className="nt-toast-actions">
                <BaseToast.Action render={<Button size="sm" />} />
              </div>
            )}
          </div>
          <BaseToast.Close
            className="nt-toast-close"
            aria-label="Dismiss"
            render={<Button variant="ghost" size="sm" iconOnly />}
          >
            <Icon icon={X} size="sm" />
          </BaseToast.Close>
        </BaseToast.Content>
      </BaseToast.Root>
    );
  });
}

/**
 * Renders the toast viewport in the bottom-right corner and lets descendants show toasts with {@link useToast}.
 * Place it once near the root of the app.
 */
export function ToastProvider({ children, limit = 3, timeout = 5000 }: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="nt-toast-viewport">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

/**
 * Shows, updates and closes toasts. Must be used inside a {@link ToastProvider}.
 *
 * @example
 * const toast = useToast();
 * toast.add({ title: "Deploy finished", type: "success" });
 */
export function useToast(): ToastApi {
  const manager = BaseToast.useToastManager();
  return useMemo<ToastApi>(
    () => ({
      add: (options) => manager.add(toBase(options)),
      close: (id) => manager.close(id),
      update: (id, options) => manager.update(id, toBase(options)),
      promise: (promise, options) =>
        manager.promise(promise, {
          loading: toBaseMessage(options.loading),
          success: toBaseState(options.success),
          error: toBaseState(options.error),
        }),
    }),
    [manager.add, manager.close, manager.update, manager.promise],
  );
}
