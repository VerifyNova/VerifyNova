# VerifyNova website

Company website for the VerifyNova ecosystem: UnifyID, VChainCred and ASIL. Built with Next.js (App Router), React and TypeScript. npm is the sole package manager. This is a presentation site: no accounts, database, upload endpoint, simulated contact submission or tracking integration.

## Local workflow

Node 22.13 or newer is required. Use `npm ci`, then `npm run dev`. The default local address is http://localhost:3015. Existing UnifyID repositories and servers are independent.

Commands: `npm run lint`, `npm run typecheck`, `npm test`, `npm run check:routes` (requires the running local server), `npm run build`, and `npm start`. The production server uses port 3000 by default; set `PORT` to an available port when running alongside the API.

## Content and design

- `lib/content.ts` is the single source for product stages, descriptions, solutions and page introductions.
- `app/globals.css` defines the brand palette, the 1436px page width (32px desktop / 18px mobile minimum margins) and the shared design system: 4px radius everywhere, hairline surfaces, icon tiles, chips and section rhythm. `app/inner-pages.css` holds only the inner-page layouts. The header and footer are the fixed reference for the rest of the site.
- The logo and Africa vector in `public/` were extracted from the supplied index_3.html demo. No new logo was invented.
- Inter is served locally. SVG panels and lines remain sharp; diagram descriptions are selectable text. Connections respond to element dimensions. Motion pauses off-screen and is disabled for reduced-motion preferences.
- The mobile navigation uses the installed accessible Sheet primitive. Vendored `components/ui` files are retained unchanged and excluded from application linting.
- The company contact links open `info@verifynova.com`, as supplied in the demo. There is no server-side message submission.
- `/security`, `/privacy` and `/terms` are policy pages rendered by `components/policy-pages.tsx`. Before launch these need three decisions from the company: a target time for acknowledging a security report, the registered entity name and address for the privacy notice, and the governing law for the terms. A dedicated `security@` address and a `/.well-known/security.txt` file should be added once the domain is confirmed.

## Launch controls

Measurement is cookieless and off unless configured. Set `ANALYTICS_SCRIPT_URL` and `ANALYTICS_SITE_ID` together to a provider that counts visits without cookies or browser storage, and the content security policy will allow that origin automatically. The privacy notice reads the same setting, so it describes measurement only when measurement is running. There are no advertising or retargeting tags, and no consent banner is required while that stays true.

Set `SITE_URL` to the verified HTTPS company website origin. Set `LAUNCH_APPROVED=true` only after completing `docs/LAUNCH.md`. Without both, search indexing remains disabled and the sitemap is empty. These values are server configuration, not secrets. Do not put credentials in source control.

Build with `npm run build` and serve with `npm start`, or deploy to any host with first-class Next.js support. Vercel needs no configuration: it detects Next.js from `package.json` and uses the default build command and output. Note that `ANALYTICS_SCRIPT_URL` and `ANALYTICS_SITE_ID` must be available **at build time**, because the pages that read them are prerendered; setting them only as runtime values leaves the measurement tag out of the generated HTML. Use a TLS reverse proxy or managed Node host. Bind the origin privately, configure HTTPS redirects, add HSTS at the trusted TLS edge, and monitor uptime/errors. Request headers, including the content security policy, are set in `proxy.ts`, which is the Next.js request-boundary convention. The current CSP permits inline framework scripts/styles; consider nonces with a supported hosting integration before further interactive features are added. `ws:`/`wss:` connections permit local HMR; narrow production connect-src at the edge if not required.

No public deployment, domain change, DNS operation or external publication has been performed. The project can be deployed after the remaining company and hosting approvals are supplied.

## Rollback

Deploy immutable build artifacts. Keep the previous successful artifact and its environment configuration. If smoke checks fail, route traffic back to that artifact; do not migrate or modify data (this website has none). Re-run the route checks against the deployment origin after each release.
