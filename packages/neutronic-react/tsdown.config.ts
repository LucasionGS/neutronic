import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/icons.ts"],
  format: "esm",
  platform: "neutral",
  fixedExtension: false,
  dts: true,
  clean: true,
  banner: { js: '"use client";' },
});
