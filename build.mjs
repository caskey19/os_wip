import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
const files = [
  "index.html",
  "styles.css",
  "aether-theme.css",
  "aether-core.js",
  "aether-modules.js",
  "app.js",
  "firebase-config.js",
  "mail-services.js",
  "mail-ui.js",
  "sw.js"
];
for (const file of files) await cp(file, `dist/${file}`);
await cp("brain", "dist/brain", { recursive: true });
await cp("docs", "dist/docs", { recursive: true });
console.log("Built static site in dist/");
