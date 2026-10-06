import { useCallback, useId, useMemo, type ReactNode } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Field } from "@base-ui/react/field";
import { Check, ChevronDown } from "lucide-react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/** A single entry in a {@link Combobox}. `label` is what the user types to find it. */
export interface ComboboxItem<Value> {
  value: Value;
  label: string;
  disabled?: boolean;
}

/** Props for {@link Combobox}. */
export interface ComboboxProps<Value> {
  /** Entries to search. Plain strings are used as both value and label. */
  items: ReadonlyArray<ComboboxItem<Value> | (Value & string)>;
  /** Shown as the inline prefix inside the box and used as the accessible label. */
  label?: ReactNode;
  /** Text shown in the input when it is empty. */
  placeholder?: string;
  /** The selected value. Use with `onValueChange` for a controlled combobox. */
  value?: Value | null;
  /** The initially selected value for an uncontrolled combobox. */
  defaultValue?: Value | null;
  /** Called when the user picks a different entry. */
  onValueChange?: (value: Value | null) => void;
  /** Text shown when nothing matches the query. Defaults to `"No matches"`. */
  emptyText?: ReactNode;
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

const toItem = <Value,>(entry: ComboboxItem<Value> | (Value & string)): ComboboxItem<Value> =>
  typeof entry === "string" ? { value: entry, label: entry } : entry;

/**
 * A text input that filters a list of entries as you type. Looks like {@link Input}, with the `label` as an inline prefix.
 *
 * @example <Combobox label="Node" items={["node-a", "node-b", "node-c"]} placeholder="Search nodes" />
 */
export function Combobox<Value>({
  items,
  label,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  emptyText = "No matches",
  size = "md",
  description,
  error,
  disabled,
  required,
  name,
  "aria-label": ariaLabel,
  className,
  fieldClassName,
}: ComboboxProps<Value>) {
  const inputId = useId();
  const invalid = error != null;
  const normalized = useMemo(() => items.map(toItem), [items]);
  const find = useCallback(
    (target: Value | null): ComboboxItem<Value> | null =>
      target === null ? null : (normalized.find((item) => Object.is(item.value, target)) ?? null),
    [normalized],
  );

  return (
    <Field.Root className={cx("nt-field", fieldClassName)} disabled={disabled} invalid={invalid || undefined}>
      <BaseCombobox.Root<ComboboxItem<Value>>
        items={normalized}
        value={value === undefined ? undefined : find(value)}
        defaultValue={defaultValue === undefined ? undefined : find(defaultValue)}
        onValueChange={onValueChange ? (item) => onValueChange(item ? item.value : null) : undefined}
        itemToStringLabel={(item) => item.label}
        itemToStringValue={(item) => String(item.value)}
        isItemEqualToValue={(a, b) => Object.is(a.value, b.value)}
        disabled={disabled}
        required={required}
        name={name}
      >
        <BaseCombobox.InputGroup
          className={cx("nt-input nt-combobox nt-focus-within", className)}
          data-size={size}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
        >
          {label != null && (
            <label className="nt-input-prefix" htmlFor={inputId}>
              {label}
            </label>
          )}
          <BaseCombobox.Input
            id={inputId}
            className="nt-input-control"
            placeholder={placeholder}
            aria-label={label == null ? ariaLabel : undefined}
          />
          <BaseCombobox.Trigger className="nt-combobox-trigger" aria-label="Show options">
            <Icon icon={ChevronDown} size="sm" />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className="nt-popup-positioner nt-bracket" sideOffset={4} align="start">
            <BaseCombobox.Popup className="nt-popup nt-combobox-popup">
              <BaseCombobox.Empty>
                <div className="nt-popup-empty">{emptyText}</div>
              </BaseCombobox.Empty>
              <BaseCombobox.List>
                {(item: ComboboxItem<Value>) => (
                  <BaseCombobox.Item
                    key={String(item.value)}
                    value={item}
                    disabled={item.disabled}
                    className="nt-popup-item"
                  >
                    <BaseCombobox.ItemIndicator className="nt-popup-item-indicator">
                      <Icon icon={Check} size="sm" />
                    </BaseCombobox.ItemIndicator>
                    {item.label}
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
      {description != null && <Field.Description className="nt-field-description">{description}</Field.Description>}
      {error != null && (
        <Field.Error className="nt-field-error" match>
          {error}
        </Field.Error>
      )}
    </Field.Root>
  );
}
