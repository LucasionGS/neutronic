import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Field } from "@base-ui/react/field";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../Button/Button";

/** Props shared by {@link Input} and {@link Textarea}. */
interface FieldProps {
  /** Shown as the inline prefix inside the box and used as the accessible label. */
  label?: ReactNode;
  /** Helper text shown below the box. */
  description?: ReactNode;
  /** Error message. When set, the field is marked invalid and the message is shown. */
  error?: ReactNode;
  /** Class name for the outer field wrapper. */
  fieldClassName?: string;
}

/** Props for {@link Input}. Accepts all native `<input>` attributes. */
export interface InputProps extends FieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Defaults to `"md"`. */
  size?: ControlSize;
  /** Leading icon placed after the label, inside the box. */
  icon?: ReactNode;
  /** Content at the right end of the box, such as a unit or a button. */
  suffix?: ReactNode;
}

/** Props for {@link Textarea}. Accepts all native `<textarea>` attributes. */
export interface TextareaProps extends FieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

function FieldMessages({ description, error }: Pick<FieldProps, "description" | "error">) {
  return (
    <>
      {description != null && <Field.Description className="nt-field-description">{description}</Field.Description>}
      {error != null && (
        <Field.Error className="nt-field-error" match>
          {error}
        </Field.Error>
      )}
    </>
  );
}

/**
 * A single-line text field. The `label` renders inside the box as a mono prefix.
 *
 * @example <Input label="Host" defaultValue="10.0.4.21" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, description, error, icon, suffix, size = "md", disabled, className, fieldClassName, ...rest },
  ref,
) {
  const invalid = error != null;
  return (
    <Field.Root className={cx("nt-field", fieldClassName)} disabled={disabled} invalid={invalid || undefined}>
      <div
        className={cx("nt-input nt-focus-within", className)}
        data-size={size}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
      >
        {label != null && <Field.Label className="nt-input-prefix">{label}</Field.Label>}
        {icon != null && <span className="nt-input-icon">{icon}</span>}
        <Field.Control ref={ref} className="nt-input-control" {...rest} />
        {suffix != null && <span className="nt-input-suffix">{suffix}</span>}
      </div>
      <FieldMessages description={description} error={error} />
    </Field.Root>
  );
});

/**
 * A multi-line text field. The `label` renders as a header strip inside the box.
 *
 * @example <Textarea label="Notes" rows={4} />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, description, error, disabled, className, fieldClassName, ...rest },
  ref,
) {
  const invalid = error != null;
  return (
    <Field.Root className={cx("nt-field", fieldClassName)} disabled={disabled} invalid={invalid || undefined}>
      <div
        className={cx("nt-input nt-focus-within", className)}
        data-multiline=""
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
      >
        {label != null && <Field.Label className="nt-input-prefix">{label}</Field.Label>}
        <Field.Control render={<textarea ref={ref} className="nt-input-control" {...rest} />} />
      </div>
      <FieldMessages description={description} error={error} />
    </Field.Root>
  );
});
