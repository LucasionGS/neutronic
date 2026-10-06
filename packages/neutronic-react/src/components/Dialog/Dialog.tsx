import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { X } from "lucide-react";
import { cx } from "../../utils/cx";
import { Button, type ButtonProps } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/** Maximum width of a dialog: `sm` 24rem, `md` 32rem, `lg` 44rem. */
export type DialogSize = "sm" | "md" | "lg";

type ButtonLookProps = Pick<ButtonProps, "variant" | "size" | "iconOnly">;

/** Props for {@link DialogTrigger}. Renders a {@link Button} unless `render` is given. */
export interface DialogTriggerProps extends Omit<BaseDialog.Trigger.Props, "className">, ButtonLookProps {
  className?: string;
}

/** Props for {@link DialogClose}. Renders a {@link Button} unless `render` is given. */
export interface DialogCloseProps extends Omit<BaseDialog.Close.Props, "className">, ButtonLookProps {
  className?: string;
}

/** Props for {@link DialogContent}. */
export interface DialogContentProps extends Omit<BaseDialog.Popup.Props, "className" | "title"> {
  /** Heading announced as the dialog's accessible name. */
  title?: ReactNode;
  /** Supporting text under the title, announced as the dialog's description. */
  description?: ReactNode;
  /** Defaults to `"md"`. */
  size?: DialogSize;
  /** Shows a close button in the header. Defaults to `true`. */
  showClose?: boolean;
  /** Element the dialog is portalled into. Defaults to `document.body`. */
  container?: BaseDialog.Portal.Props["container"];
  className?: string;
}

/** Props for {@link AlertDialogTrigger}. Renders a {@link Button} unless `render` is given. */
export interface AlertDialogTriggerProps extends Omit<BaseAlertDialog.Trigger.Props, "className">, ButtonLookProps {
  className?: string;
}

/** Props for {@link AlertDialogClose}. Renders a {@link Button} unless `render` is given. */
export interface AlertDialogCloseProps extends Omit<BaseAlertDialog.Close.Props, "className">, ButtonLookProps {
  className?: string;
}

/** Props for {@link AlertDialogContent}. */
export interface AlertDialogContentProps extends Omit<BaseAlertDialog.Popup.Props, "className" | "title"> {
  /** Heading announced as the dialog's accessible name. Required for alert dialogs. */
  title: ReactNode;
  /** Explains the consequence of the action being confirmed. */
  description?: ReactNode;
  /** Defaults to `"sm"`. */
  size?: DialogSize;
  /** Element the dialog is portalled into. Defaults to `document.body`. */
  container?: BaseAlertDialog.Portal.Props["container"];
  className?: string;
}

/** Opens its dialog when pressed. */
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(function DialogTrigger(
  { variant, size, iconOnly, render, ...rest },
  ref,
) {
  return (
    <BaseDialog.Trigger
      ref={ref}
      render={render ?? <Button variant={variant} size={size} iconOnly={iconOnly} />}
      {...rest}
    />
  );
});

/** Closes its dialog when pressed. */
export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { variant, size, iconOnly, render, ...rest },
  ref,
) {
  return (
    <BaseDialog.Close ref={ref} render={render ?? <Button variant={variant} size={size} iconOnly={iconOnly} />} {...rest} />
  );
});

/** The portalled popup with backdrop, header and focus trap. Place `Dialog.Body` and `Dialog.Footer` inside it. */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { title, description, size = "md", showClose = true, container, className, children, ...rest },
  ref,
) {
  const hasHeader = title != null || description != null || showClose;
  return (
    <BaseDialog.Portal container={container}>
      <BaseDialog.Backdrop className="nt-dialog-backdrop" />
      <BaseDialog.Viewport className="nt-dialog-viewport">
        <BaseDialog.Popup ref={ref} className={cx("nt-dialog nt-bracket", className)} data-size={size} {...rest}>
          {hasHeader && (
            <div className="nt-dialog-header">
              <div className="nt-dialog-heading">
                {title != null && <BaseDialog.Title className="nt-dialog-title">{title}</BaseDialog.Title>}
                {description != null && (
                  <BaseDialog.Description className="nt-dialog-description">{description}</BaseDialog.Description>
                )}
              </div>
              {showClose && (
                <DialogClose variant="ghost" size="sm" iconOnly aria-label="Close" className="nt-dialog-close">
                  <Icon icon={X} size="sm" />
                </DialogClose>
              )}
            </div>
          )}
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
});

/** Scrollable main content of a dialog. */
export const DialogBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DialogBody(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx("nt-dialog-body", className)} {...rest} />;
});

/** A right-aligned row of actions at the bottom of a dialog. */
export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DialogFooter(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx("nt-dialog-footer", className)} {...rest} />;
});

/**
 * A modal window that traps focus until dismissed.
 *
 * @example
 * <Dialog.Root>
 *   <Dialog.Trigger>Scale cluster</Dialog.Trigger>
 *   <Dialog.Content title="Scale cluster" description="Changes apply to all regions.">
 *     <Dialog.Body>…</Dialog.Body>
 *     <Dialog.Footer>
 *       <Dialog.Close>Cancel</Dialog.Close>
 *       <Button variant="primary">Apply</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 */
export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};

/** Opens its alert dialog when pressed. */
export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(function AlertDialogTrigger(
  { variant, size, iconOnly, render, ...rest },
  ref,
) {
  return (
    <BaseAlertDialog.Trigger
      ref={ref}
      render={render ?? <Button variant={variant} size={size} iconOnly={iconOnly} />}
      {...rest}
    />
  );
});

/** Closes its alert dialog when pressed. Use it for both the cancel and the confirm action. */
export const AlertDialogClose = forwardRef<HTMLButtonElement, AlertDialogCloseProps>(function AlertDialogClose(
  { variant, size, iconOnly, render, ...rest },
  ref,
) {
  return (
    <BaseAlertDialog.Close
      ref={ref}
      render={render ?? <Button variant={variant} size={size} iconOnly={iconOnly} />}
      {...rest}
    />
  );
});

/** The portalled alert popup. It cannot be dismissed by clicking outside. */
export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(function AlertDialogContent(
  { title, description, size = "sm", container, className, children, ...rest },
  ref,
) {
  return (
    <BaseAlertDialog.Portal container={container}>
      <BaseAlertDialog.Backdrop className="nt-dialog-backdrop" />
      <BaseAlertDialog.Viewport className="nt-dialog-viewport">
        <BaseAlertDialog.Popup
          ref={ref}
          className={cx("nt-dialog nt-bracket", className)}
          data-size={size}
          data-alert=""
          {...rest}
        >
          <div className="nt-dialog-header">
            <div className="nt-dialog-heading">
              <BaseAlertDialog.Title className="nt-dialog-title">{title}</BaseAlertDialog.Title>
              {description != null && (
                <BaseAlertDialog.Description className="nt-dialog-description">{description}</BaseAlertDialog.Description>
              )}
            </div>
          </div>
          {children}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
});

/**
 * A modal confirmation for destructive or irreversible actions.
 *
 * @example
 * <AlertDialog.Root>
 *   <AlertDialog.Trigger variant="danger">Drain node</AlertDialog.Trigger>
 *   <AlertDialog.Content title="Drain node-b?" description="Running jobs move to other nodes.">
 *     <Dialog.Footer>
 *       <AlertDialog.Close>Cancel</AlertDialog.Close>
 *       <AlertDialog.Close variant="danger" onClick={drain}>Drain</AlertDialog.Close>
 *     </Dialog.Footer>
 *   </AlertDialog.Content>
 * </AlertDialog.Root>
 */
export const AlertDialog = {
  Root: BaseAlertDialog.Root,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: AlertDialogClose,
};
