/** A verified deployment origin is required before search indexing is enabled. */
export function parseSiteOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1'
  ) {
    throw new Error(
      'SITE_URL must be the confirmed HTTPS website origin, with no path or credentials.',
    );
  }
  return url.origin;
}
export const siteOrigin = parseSiteOrigin(process.env.SITE_URL);

/**
 * The analytics script must be a plain HTTPS address. Anything carrying
 * credentials, a query or a fragment is a configuration mistake, not a
 * measurement tool, and is refused rather than loaded into every page.
 */
export function parseAnalyticsScript(
  value: string | undefined,
): string | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'ANALYTICS_SCRIPT_URL must be a plain HTTPS script address, with no credentials, query or fragment.',
    );
  }
  return url.href;
}
export const analyticsScript = parseAnalyticsScript(
  process.env.ANALYTICS_SCRIPT_URL,
);
export const analyticsSiteId = process.env.ANALYTICS_SITE_ID || undefined;
/** True only when measurement is actually configured for this deployment. */
export const analyticsEnabled = Boolean(analyticsScript && analyticsSiteId);
export const analyticsOrigin = analyticsEnabled
  ? new URL(analyticsScript!).origin
  : undefined;
export const launchApproved =
  process.env.LAUNCH_APPROVED === 'true' && Boolean(siteOrigin);
