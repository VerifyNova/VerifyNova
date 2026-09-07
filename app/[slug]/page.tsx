import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Mail } from 'lucide-react';
import { pageContent, type PageSlug } from '@/lib/content';
import {
  EditorialHero,
  type EditorialPage,
  InfrastructurePage,
  ProductsPage,
  SolutionsPage,
  TrustPage,
  CompanyPage,
} from '@/components/inner-pages';
import {
  SecurityPage,
  PrivacyPage,
  TermsPage,
} from '@/components/policy-pages';

const editorialSlugs: readonly string[] = [
  'infrastructure',
  'products',
  'solutions',
  'trust',
  'company',
];
function isEditorial(slug: string): slug is EditorialPage {
  return editorialSlugs.includes(slug);
}

export function generateStaticParams() {
  return Object.keys(pageContent).map((slug) => ({ slug }));
}
function getPage(slug: string) {
  if (!Object.hasOwn(pageContent, slug)) notFound();
  return pageContent[slug as PageSlug];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  return {
    title: page.eyebrow,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
  };
}

const contactContexts = {
  partnerships: {
    eyebrow: 'Partnerships',
    title: 'Build the next trusted relationship together.',
    // intro: 'Tell us where your work connects with ours: the institutions you serve, the challenge you are addressing and the contribution you have in mind.',
    intro: '',
    subject: 'Business and partnerships',
  },
  security: {
    eyebrow: 'Security concerns',
    title: 'Start a responsible security conversation.',
    intro:
      'Describe the affected product and your concern at a high level. Ask for a secure channel before sharing sensitive evidence, personal information or technical secrets.',
    subject: 'Security enquiry',
  },
} as const;
function contactContext(topic?: string) {
  return topic === 'partnerships' || topic === 'security'
    ? contactContexts[topic]
    : { ...pageContent.contact, subject: 'General enquiry' };
}
function Contact({ topic }: { topic?: string } = {}) {
  const context = contactContext(topic);
  return (
    <section className="section-tight wrap contact-layout contact-refresh">
      <aside className="contact-aside">
        <span className="icon-tile icon-tile-lg">
          <Mail size={24} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <h2>Start a conversation.</h2>
        <a
          className="contact-email"
          href={`mailto:info@verifynova.com?subject=${encodeURIComponent(context.subject)}`}
        >
          info@verifynova.com
        </a>
        <p>
          Email opens in your own mail app. This website does not submit a
          message on your behalf.
        </p>
        <div className="safe-note">
          <strong>Keep the first message safe.</strong>
          <p>
            Do not send identity documents, account passwords, access tokens,
            private keys or confidential records. Ask for the appropriate secure
            channel first.
          </p>
        </div>
      </aside>
      <div className="contact-options">
        {[
          [
            'Institutions & government',
            'Tell us about your institution, the records or decisions involved, and the people who need to rely on them.',
            'Institutional enquiry',
          ],
          [
            'Businesses & partners',
            'Discuss an implementation, a partnership or the infrastructure your service needs.',
            'Business and partnerships',
          ],
          [
            'Products & integrations',
            'Name the product—UnifyID, VChainCred or ASIL—and describe your intended use.',
            'Product enquiry',
          ],
          [
            'Privacy & security',
            'Describe the concern at a high level. Do not include live secrets or personal evidence in the initial message.',
            'Privacy or security enquiry',
          ],
        ].map(([title, text, subject], index) => (
          <article key={title}>
            <span className="contact-route-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
            <a
              className="text-link"
              href={`mailto:info@verifynova.com?subject=${encodeURIComponent(subject)}`}
            >
              Email VerifyNova <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
const sections = {
  infrastructure: InfrastructurePage,
  products: ProductsPage,
  solutions: SolutionsPage,
  trust: TrustPage,
  company: CompanyPage,
  security: SecurityPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  contact: Contact,
};
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const page = getPage(slug);
  const Content = sections[slug as PageSlug];
  const query = slug === 'contact' ? await searchParams : undefined;
  const topic = typeof query?.topic === 'string' ? query.topic : undefined;
  const hero = slug === 'contact' ? contactContext(topic) : page;
  return (
    <main id="main-content" className={`inner-page inner-${slug}`}>
      {isEditorial(slug) ? (
        <EditorialHero slug={slug} />
      ) : (
        <section
          className={`page-hero wrap ${slug === 'contact' ? 'contact-intro' : 'policy-intro'}`}
        >
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          {hero.intro && <p>{hero.intro}</p>}
        </section>
      )}
      {slug === 'contact' ? <Contact topic={topic} /> : <Content />}
    </main>
  );
}
