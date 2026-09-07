import type { MetadataRoute } from 'next';
import { publicRoutes } from '@/lib/content';
import { siteOrigin, launchApproved } from '@/lib/site-config';
export default function sitemap(): MetadataRoute.Sitemap {
  return launchApproved
    ? publicRoutes.map((path) => ({ url: `${siteOrigin}${path}` }))
    : [];
}
