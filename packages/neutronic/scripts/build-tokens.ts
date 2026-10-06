import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tokens, toCss } from "../src/index";

const outDir = new URL("../src/generated/", import.meta.url);
const header = "/* Generated from src/tokens by scripts/build-tokens.ts. Do not edit. */\n\n";

function writeIfChanged(name: string, content: string): void {
  const file = new URL(name, outDir);
  let previous: string | undefined;
  try {
    previous = readFileSync(file, "utf8");
  } catch {}
  if (previous !== content) writeFileSync(file, content);
}

mkdirSync(outDir, { recursive: true });
writeIfChanged("tokens.css", `${header}${toCss(tokens)}\n`);
writeIfChanged("tokens.json", `${JSON.stringify(tokens, null, 2)}\n`);
console.log(`[neutronic] tokens generated ${new Date().toLocaleTimeString()}`);
