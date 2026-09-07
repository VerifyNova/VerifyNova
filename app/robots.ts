import type { MetadataRoute } from 'next';
import { siteOrigin, launchApproved } from '@/lib/site-config';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(launchApproved ? { allow: '/' } : { disallow: '/' }),
    },
    ...(launchApproved ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
  };
}
