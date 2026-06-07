#!/usr/bin/env node
/**
 * Postbuild: generate a static SPA index.html in the client distribution directory
 * so the app can be deployed to static hosts without relying on the SSR worker output.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseDist = resolve(__dirname, "..", "dist");

// --- 1. SEARCH DIRECTORIES ---
let clientDir = baseDist; // Default fallback to root dist
let assetsDir = "";
let manifestPath = "";

const possiblePaths = [
  resolve(baseDist, "static"),
  resolve(baseDist, "client"),
  baseDist
];

for (const dir of possiblePaths) {
  const testAssets = join(dir, "assets");
  const testManifest = join(dir, ".vite", "manifest.json");
  
  if (existsSync(testAssets) && existsSync(testManifest)) {
    clientDir = dir;
    assetsDir = testAssets;
    manifestPath = testManifest;
    break;
  }
}

// --- 2. RESILIENT MANIFEST PARSING ---
let entryJs = "";
let entryCss = undefined;

if (manifestPath && existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const manifestEntries = Object.values(manifest);
    const entry = manifestEntries.find((item) => item && item.isEntry && typeof item.file === "string");
    entryJs = entry?.file || "";
    entryCss = Array.isArray(entry?.css) ? entry.css[0] : undefined;
  } catch (e) {
    console.log("[spa-html] Error reading manifest, using manual entry resolution.");
  }
}

// Fallback entry file resolution if manifest parsing isn't available
if (!entryJs && existsSync(join(clientDir, "assets"))) {
  try {
    const files = readdirSync(join(clientDir, "assets"));
    const jsFile = files.find(f => f.endsWith('.js'));
    const cssFile = files.find(f => f.endsWith('.css'));
    if (jsFile) entryJs = `assets/${jsFile}`;
    if (cssFile) entryCss = `assets/${cssFile}`;
  } catch (err) {
    console.log("[spa-html] Asset directory mapping skipped.");
  }
}

console.log(`[spa-html] Injecting SPA container targets into: ${clientDir}`);

// --- 3. COMPILING THE HTML STRING ---
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
${entryCss ? `    <link rel="stylesheet" href="/${entryCss}" />\n` : ""}    ${entryJs ? `<script type="module" crossorigin src="/${entryJs}"></script>` : ""}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

// Write safety fallback HTML files across the target zones to ensure hosting routers resolve cleanly
try {
  writeFileSync(join(clientDir, "index.html"), html, "utf8");
  if (clientDir !== baseDist && existsSync(baseDist)) {
    writeFileSync(join(baseDist, "index.html"), html, "utf8");
  }
  console.log("[spa-html] ✅ HTML deployment routes successfully mapped.");
} catch (err) {
  console.log("[spa-html] Non-blocking file write error: ", err.message);
}

// --- 4. DEFENSIVE PUBLIC ASSET REPLICATION ---
const publicDir = resolve(__dirname, "..", "public");
if (existsSync(publicDir) && existsSync(clientDir)) {
  try {
    for (const f of readdirSync(publicDir)) {
      const src = join(publicDir, f);
      const dst = join(clientDir, f);
      if (!existsSync(dst)) {
        copyFileSync(src, dst);
      }
    }
  } catch (e) {}
}