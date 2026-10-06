import { Children, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { User } from "lucide-react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";

/** Size of an {@link Avatar}: `sm` 24px, `md` 32px, `lg` 40px. */
export type AvatarSize = "sm" | "md" | "lg";

/** Presence shown by the status square on an {@link Avatar}. */
export type AvatarStatus = "online" | "busy" | "away" | "offline";

/** Props for {@link Avatar}. */
export interface AvatarProps extends Omit<BaseAvatar.Root.Props, "className" | "children" | "render"> {
  /** Image URL. The fallback shows while it loads or if it fails. */
  src?: string;
  /** Image description. Defaults to `name`. */
  alt?: string;
  /** Person or entity name, used to derive initials for the fallback. */
  name?: string;
  /** Custom fallback content. Overrides the initials. */
  fallback?: ReactNode;
  /** Defaults to `"md"`. */
  size?: AvatarSize;
  /** Shows a presence square in the corner. */
  status?: AvatarStatus;
  className?: string;
}

/** Props for {@link AvatarGroup}. */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Shows at most this many avatars, followed by a `+N` counter. */
  max?: number;
  /** Size of the `+N` counter. Match it to the avatars. Defaults to `"md"`. */
  size?: AvatarSize;
}

/** Derives up to two uppercase initials from a name, e.g. `"Ada King"` → `"AK"`. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  const letters = parts.length > 1 ? [parts[0]![0], parts[parts.length - 1]![0]] : [parts[0]?.slice(0, 2)];
  return letters.join("").toUpperCase();
}

/**
 * A square user or entity image with an initials fallback.
 *
 * @example <Avatar name="Ada King" src="/ada.png" status="online" />
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, fallback, size = "md", status, className, ...rest },
  ref,
) {
  return (
    <BaseAvatar.Root ref={ref} className={cx("nt-avatar", className)} data-size={size} {...rest}>
      {src && <BaseAvatar.Image className="nt-avatar-image" src={src} alt={alt ?? name ?? ""} />}
      <BaseAvatar.Fallback className="nt-avatar-fallback">
        {fallback ?? (name ? getInitials(name) : <Icon icon={User} size={size === "lg" ? "md" : "sm"} />)}
      </BaseAvatar.Fallback>
      {status && (
        <span className="nt-avatar-status" data-status={status}>
          <span className="nt-visually-hidden">{status}</span>
        </span>
      )}
    </BaseAvatar.Root>
  );
});

/**
 * Overlaps avatars into a compact stack.
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar name="Ada King" />
 *   <Avatar name="Lin Ortega" />
 * </AvatarGroup>
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, size = "md", className, children, ...rest },
  ref,
) {
  const items = Children.toArray(children);
  const visible = max != null ? items.slice(0, max) : items;
  const hidden = items.length - visible.length;
  return (
    <div ref={ref} className={cx("nt-avatar-group", className)} {...rest}>
      {visible}
      {hidden > 0 && (
        <span className="nt-avatar" data-size={size} data-overflow="">
          <span className="nt-avatar-fallback">+{hidden}</span>
        </span>
      )}
    </div>
  );
});
