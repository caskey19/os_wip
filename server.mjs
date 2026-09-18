import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".json": "application/json" };

http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  let file = normalize(join(root, pathname === "/" ? "index.html" : pathname));
  if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": `${types[extname(file)] || "application/octet-stream"}; charset=utf-8`, "cache-control": "no-store" });
    res.end(body);
  } catch {
    try { res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); res.end(await readFile(join(root, "index.html"))); }
    catch { res.writeHead(404).end("Not found"); }
  }
}).listen(port, "127.0.0.1", () => console.log(`Aether ready at http://127.0.0.1:${port}`));
