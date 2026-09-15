import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of ["index.html", "styles.css", "app.js"]) await cp(file, `dist/${file}`);
await cp("brain", "dist/brain", { recursive: true });
console.log("Built static site in dist/");
