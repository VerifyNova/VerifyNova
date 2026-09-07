import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import { PageEntryScroll } from '@/components/page-entry-scroll';
import '@fontsource-variable/inter/standard.css';
import './globals.css';
import './inner-pages.css';
import './platform-foundation.css';
import './trust-page.css';
import './mobile.css';
import { Analytics } from '@/components/analytics';
import { siteOrigin, launchApproved } from '@/lib/site-config';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  alternates: { canonical: '/' },
  robots: { index: launchApproved, follow: launchApproved },
  title: {
    default: 'VerifyNova — Trust, built in.',
    template: '%s | VerifyNova',
  },
  description:
    'Building Africa’s trusted digital public infrastructure. Identity, institutional authority, trusted records and controlled information exchange.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageEntryScroll />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
