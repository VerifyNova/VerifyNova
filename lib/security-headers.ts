/**
 * The response policy, built from configuration so an allowance appears only
 * when the thing it permits is actually configured.
 */
export function contentSecurityPolicy(origin?: string) {
  const source = origin ? ` ${origin}` : '';
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${source}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self' ws: wss:${source}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
}
