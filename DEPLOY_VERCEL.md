# Deploying to Vercel

This project deploys on **Vercel as a static SPA**. The TanStack Start build
also emits a Cloudflare Worker SSR bundle, but for Vercel we ship just the
client bundle plus a generated `index.html` shell — TanStack Router takes
over routing on the client.

## Vercel project settings

`vercel.json` is committed at the repo root. When you import the repo on
Vercel, just confirm:

- **Framework Preset:** Other
- **Build Command:** `vite build && node scripts/generate-spa-html.mjs` (from `vercel.json`)
- **Output Directory:** `dist/client` (from `vercel.json`)
- **Install Command:** `npm install --legacy-peer-deps` (from `vercel.json`)

Click **Deploy**. No environment variables are required.

## How it works (no 404, no blank screen)

1. `vite build` produces the client bundle in `dist/client/assets/` and a
   server bundle in `dist/server/` (which Vercel ignores).
2. `scripts/generate-spa-html.mjs` writes `dist/client/index.html` that
   loads the hashed `main-*.js` entry and the compiled CSS.
3. `vercel.json` rewrites every non-asset path (anything not under
   `/assets/` and not ending in a file extension) to `/index.html`, so deep
   links like `/services/hot-insulation`, `/projects`, `/certificates` work
   on direct visit and on refresh.
4. Hashed asset files are served with a 1-year immutable cache header.

## Local production preview

```bash
npm install --legacy-peer-deps
npm run build
node scripts/generate-spa-html.mjs
npx serve dist/client            # or any static server
```

Visit `http://localhost:3000/projects` and refresh — the SPA shell loads,
the bundle hydrates, and the route renders. No 404.

## Files included for deployment

- `vercel.json` — build, output, rewrites, cache headers
- `scripts/generate-spa-html.mjs` — generates the SPA `index.html`
- `.vercelignore` — excludes local artifacts
- `package.json` / lockfile, `vite.config.ts`, `tsconfig.json`
- `src/**`, `public/**`

## Troubleshooting

- **Blank page on Vercel** → open DevTools → Network. If `/assets/main-*.js`
  is 404, the build did not run; re-deploy. If the JS loads but the page is
  blank, check the console — usually a missing env var or a runtime error.
- **404 on a sub-route refresh** → confirm `vercel.json` is at the repo root
  and the rewrite rule is present (it should be after this update).
- **Stale assets after redeploy** → the cache header only applies to hashed
  files in `/assets/*`; `index.html` is not cached, so new deploys take
  effect immediately.
