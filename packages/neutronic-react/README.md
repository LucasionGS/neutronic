# @ionnet/neutronic-react

React components for the Neutronic design system, built on [Base UI](https://base-ui.com).

## Features

- 30+ components:
  - Forms: Input, Textarea, Select, Combobox, Checkbox, Radio group, Switch, Slider, Segmented control
  - Overlays: Dialog, Alert dialog, Menu, Popover, Tooltip, Toast
  - Display: Table, Tabs, Accordion, Badge, Avatar, Kbd, Progress, Meter, Code block
  - Layout: Panel, Stack, Grid, Separator
- Keyboard navigation, focus management and ARIA wiring from Base UI.
- `NeutronicProvider` sets up the theme (persisted, dark by default), tooltip timing and toasts.
- Lucide icons re-exported from `@ionnet/neutronic-react/icons`, plus an `Icon` wrapper.
- Fully typed, ESM, and marked `"use client"` for React Server Component frameworks.

## Pre-requisites

- React 18 or 19

## Installation

```sh
npm install @ionnet/neutronic @ionnet/neutronic-react
```

## Usage

```tsx
import "@ionnet/neutronic/styles.css";
import { NeutronicProvider, Button, Input, useToast } from "@ionnet/neutronic-react";

function Deploy() {
  const toast = useToast();
  return <Button variant="primary" onClick={() => toast.add({ title: "Deployed", type: "success" })}>Deploy</Button>;
}

export function App() {
  return (
    <NeutronicProvider>
      <Input label="Host" defaultValue="10.0.4.21" />
      <Deploy />
    </NeutronicProvider>
  );
}
```
