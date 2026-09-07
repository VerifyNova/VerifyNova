import { NextResponse } from 'next/server';
import { analyticsOrigin } from '@/lib/site-config';
import { contentSecurityPolicy } from '@/lib/security-headers';

/** Runs at the request boundary so the same policy covers pages and errors. */
export function proxy() {
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicy(analyticsOrigin),
  );
  return response;
}
export const config = { matcher: ['/:path*'] };
