# Publication checklist

## Owner approvals required

- Confirm the exact legal entity name, registration jurisdiction, business address and privacy contact.
- Approve company-specific privacy, terms and any required cookie disclosures. Product legal documents are not automatically company website legal documents. Legal drafts are intentionally not published or invented here.
- Confirm `info@verifynova.com` receives messages and establish security/privacy response ownership.
- Confirm product availability labels. The source demo says UnifyID is in development; VChainCred and ASIL are in test.
- Confirm official product domains before adding external product links. Internal product profiles work today.
- Confirm the production domain and hosting region/provider, access controls, logging and retention arrangements.
- Review any production compliance claims against actual evidence. There are no invented certifications, endorsements, statistics or customer logos.

## Engineering release checks

- Run npm ci, lint, typecheck, tests and production build.
- Start the production artifact on an unused local port. Run check:routes with TEST_URL pointing to that origin.
- Review desktop, tablet, mobile and 200% zoom in a real browser. Check mobile navigation, keyboard focus, diagram connectors, animation and reduced motion. Automated route checks do not replace this review.
- Validate the HTTPS edge, security headers, caching, error handling and uptime monitoring on the chosen hosting provider.
- Confirm a sample email can be delivered through the company mail system. Mailto rendering alone does not verify mailbox delivery.
- Set SITE_URL and LAUNCH_APPROVED=true only after approvals. Rebuild and validate canonical URLs, robots and sitemap.
- Keep a previous artifact available for rollback and document the person responsible for responding to incidents.

## Intentionally excluded

Unsupported product URLs; staff biographies; careers listings; testimonials; guaranteed verification latency; continent-wide deployment claims; guaranteed legal recognition; blockchain network guarantees; account support forms; placeholder legal documents; analytics and marketing cookies.

Add these only when there is approved content or a real service behind them.
