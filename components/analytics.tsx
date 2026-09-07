import { analyticsScript, analyticsSiteId } from '@/lib/site-config';

/**
 * Counts page views without cookies, browser storage or any identifier that
 * survives the request. Nothing loads unless both settings are supplied, so
 * local previews and unconfigured deployments stay silent.
 *
 * The three data attributes cover the naming used by the common cookieless
 * providers, so the provider can be swapped by changing configuration alone.
 */
export function Analytics() {
  if (!analyticsScript || !analyticsSiteId) return null;
  return (
    <script
      defer
      src={analyticsScript}
      data-domain={analyticsSiteId}
      data-website-id={analyticsSiteId}
      data-site={analyticsSiteId}
    />
  );
}
