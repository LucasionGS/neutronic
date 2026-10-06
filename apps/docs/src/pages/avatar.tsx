import { Avatar, AvatarGroup } from "@ionnet/neutronic-react";
import { Example, Page, PropsTable, Section } from "../docs/Page";
import type { PageMeta } from "../docs/registry";

export const meta: PageMeta = {
  slug: "avatar",
  title: "Avatar",
  group: "Data display",
  description: "Square images for people and services, with an initials fallback and presence status.",
};

const PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#2a2140"/><circle cx="20" cy="15" r="7" fill="#9d8cf0"/><rect x="8" y="25" width="24" height="15" fill="#9d8cf0"/></svg>`,
  );

export default function AvatarPage() {
  return (
    <Page title={meta.title} description={meta.description}>
      <Section title="Examples">
        <Example title="Image and fallbacks" code={`<Avatar src="/ada.png" name="Ada King" />
<Avatar name="Lin Ortega" />
<Avatar />`}>
          <Avatar src={PHOTO} name="Ada King" />
          <Avatar name="Lin Ortega" />
          <Avatar name="deploy-bot" />
          <Avatar src="/missing.png" name="Broken Image" />
          <Avatar />
        </Example>

        <Example title="Sizes" code={`<Avatar size="sm" name="Ada King" />`}>
          <Avatar size="sm" name="Ada King" />
          <Avatar name="Ada King" />
          <Avatar size="lg" name="Ada King" />
        </Example>

        <Example title="Status" code={`<Avatar name="Ada King" status="online" />`}>
          <Avatar name="Ada King" status="online" />
          <Avatar name="Lin Ortega" status="busy" />
          <Avatar name="Sam Reyes" status="away" />
          <Avatar name="Kit Moss" status="offline" />
        </Example>

        <Example
          title="Group"
          description="max limits visible avatars and adds a +N counter."
          code={`<AvatarGroup max={4}>
  <Avatar name="Ada King" />
  …
</AvatarGroup>`}
        >
          <AvatarGroup max={4}>
            <Avatar src={PHOTO} name="Ada King" />
            <Avatar name="Lin Ortega" />
            <Avatar name="Sam Reyes" />
            <Avatar name="Kit Moss" />
            <Avatar name="Jo Park" />
            <Avatar name="Ren Ito" />
          </AvatarGroup>
        </Example>
      </Section>

      <Section title="Props">
        <PropsTable
          title="Avatar"
          rows={[
            { name: "src", type: "string", description: "Image URL. The fallback shows while loading or on error." },
            { name: "name", type: "string", description: "Used for initials and as the default alt text." },
            { name: "alt", type: "string", description: "Image description. Defaults to name." },
            { name: "fallback", type: "ReactNode", description: "Custom fallback content." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "24, 32 or 40px." },
            { name: "status", type: '"online" | "busy" | "away" | "offline"', description: "Presence square in the corner." },
          ]}
        />
        <PropsTable
          title="AvatarGroup"
          rows={[
            { name: "max", type: "number", description: "Avatars shown before the +N counter." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of the counter." },
          ]}
        />
      </Section>
    </Page>
  );
}
