import { useMemo, useRef, type ReactNode } from "react";
import { Field } from "@base-ui/react/field";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/** A single choice in a {@link Select}. */
export interface SelectOption<Value> {
  value: Value;
  label: ReactNode;
  disabled?: boolean;
}

/** A labelled group of choices in a {@link Select}. */
export interface SelectOptionGroup<Value> {
  label: ReactNode;
  options: SelectOption<Value>[];
}

/** Props for {@link Select}. */
export interface SelectProps<Value> {
  /** Choices to show. Mix plain options and groups to add section headings. */
  options: Array<SelectOption<Value> | SelectOptionGroup<Value>>;
  /** Shown as the inline prefix inside the box and used as the accessible label. */
  label?: ReactNode;
  /** Text shown in the trigger when nothing is selected. */
  placeholder?: ReactNode;
  /** The selected value. Use with `onValueChange` for a controlled select. */
  value?: Value | null;
  /** The initially selected value for an uncontrolled select. */
  defaultValue?: Value | null;
  /** Called when the user picks a different option. */
  onValueChange?: (value: Value | null) => void;
  /** Defaults to `"md"`. */
  size?: ControlSize;
  /** Helper text shown below the box. */
  description?: ReactNode;
  /** Error message. When set, the field is marked invalid and the message is shown. */
  error?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  /** Form field name for native form submission. */
  name?: string;
  /** Accessible name when no visible `label` is given. */
  "aria-label"?: string;
  /** Class name for the box. */
  className?: string;
  /** Class name for the outer field wrapper. */
  fieldClassName?: string;
}

const isGroup = <Value,>(entry: SelectOption<Value> | SelectOptionGroup<Value>): entry is SelectOptionGroup<Value> =>
  "options" in entry;

function SelectItem<Value>({ option }: { option: SelectOption<Value> }) {
  return (
    <BaseSelect.Item className="nt-popup-item" value={option.value} disabled={option.disabled}>
      <BaseSelect.ItemIndicator className="nt-popup-item-indicator">
        <Icon icon={Check} size="sm" />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

/**
 * Picks one value from a list. Looks like {@link Input}: the `label` sits inside the box as a mono prefix.
 *
 * @example
 * <Select label="Region" defaultValue="eu-west-2" options={[{ value: "eu-west-2", label: "eu-west-2" }]} />
 */
export function Select<Value>({
  options,
  label,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  description,
  error,
  disabled,
  required,
  name,
  "aria-label": ariaLabel,
  className,
  fieldClassName,
}: SelectProps<Value>) {
  const boxRef = useRef<HTMLDivElement>(null);
  const invalid = error != null;
  const items = useMemo(
    () => options.flatMap((entry) => (isGroup(entry) ? entry.options : [entry])).map(({ value: v, label: l }) => ({ value: v, label: l })),
    [options],
  );

  return (
    <Field.Root className={cx("nt-field", fieldClassName)} disabled={disabled} invalid={invalid || undefined}>
      <BaseSelect.Root<Value>
        items={items}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange ? (next) => onValueChange(next) : undefined}
        disabled={disabled}
        required={required}
        name={name}
      >
        <div
          ref={boxRef}
          className={cx("nt-input nt-select nt-focus-within", className)}
          data-size={size}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
        >
          {label != null && (
            <BaseSelect.Label className="nt-input-prefix" render={<span />}>
              {label}
            </BaseSelect.Label>
          )}
          <BaseSelect.Trigger className="nt-select-trigger" aria-label={label == null ? ariaLabel : undefined}>
            <BaseSelect.Value className="nt-select-value" placeholder={placeholder} />
            <BaseSelect.Icon className="nt-select-icon">
              <Icon icon={ChevronDown} size="sm" />
            </BaseSelect.Icon>
          </BaseSelect.Trigger>
        </div>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className="nt-popup-positioner nt-bracket"
            anchor={boxRef}
            alignItemWithTrigger={false}
            sideOffset={4}
            align="start"
          >
            <BaseSelect.Popup className="nt-popup nt-select-popup">
              <BaseSelect.List>
                {options.map((entry, index) =>
                  isGroup(entry) ? (
                    <BaseSelect.Group key={index} className="nt-select-group">
                      {index > 0 && <BaseSelect.Separator className="nt-popup-separator" />}
                      <BaseSelect.GroupLabel className="nt-popup-label">{entry.label}</BaseSelect.GroupLabel>
                      {entry.options.map((option) => (
                        <SelectItem key={String(option.value)} option={option} />
                      ))}
                    </BaseSelect.Group>
                  ) : (
                    <SelectItem key={String(entry.value)} option={entry} />
                  ),
                )}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {description != null && <Field.Description className="nt-field-description">{description}</Field.Description>}
      {error != null && (
        <Field.Error className="nt-field-error" match>
          {error}
        </Field.Error>
      )}
    </Field.Root>
  );
}
