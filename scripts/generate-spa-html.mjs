#!/usr/bin/env node
/**
 * Postbuild: generate a static SPA index.html in dist/client so the app
 * can be deployed to static hosts without relying on the SSR worker output.
 * The client bundle hydrates from scratch and router navigation works via
 * the platform rewrite fallback.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, "..", "dist", "client");
const assetsDir = join(clientDir, "assets");
const manifestPath = join(clientDir, ".vite", "manifest.json");

if (!existsSync(assetsDir) || !existsSync(manifestPath)) {
  console.error("[spa-html] dist/client assets or manifest not found — run `vite build` first.");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const manifestEntries = Object.values(manifest);
const entry = manifestEntries.find((item) => item && item.isEntry && typeof item.file === "string");
const entryJs = entry?.file;
const entryCss = Array.isArray(entry?.css) ? entry.css[0] : undefined;

if (!entryJs) {
  console.error("[spa-html] Could not find a client entry in dist/client/.vite/manifest.json");
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tayeb &amp; Company — A Legacy of Precision Since 1983</title>
    <meta name="description" content="Pakistan's leading partner in thermal insulation, HVAC engineering, and industrial fabrication. Established 1983." />
    <meta property="og:title" content="Tayeb & Company — Industrial Engineering Legacy" />
    <meta property="og:description" content="Forty years of precision engineering in thermal insulation and HVAC across Pakistan." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&display=swap" />
${entryCss ? `    <link rel="stylesheet" href="/${entryCss}" />\n` : ""}    <script type="module" crossorigin src="/${entryJs}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html, "utf8");
console.log(`[spa-html] Wrote dist/client/index.html (entry=${entryJs}${entryCss ? `, css=${entryCss}` : ""})`);

// Copy public/ assets that the build may not auto-copy (defensive)
const publicDir = resolve(__dirname, "..", "public");
if (existsSync(publicDir)) {
  for (const f of readdirSync(publicDir)) {
    const src = join(publicDir, f);
    const dst = join(clientDir, f);
    if (!existsSync(dst)) {
      try { copyFileSync(src, dst); console.log(`[spa-html] copied public/${f}`); } catch {}
    }
  }
}
