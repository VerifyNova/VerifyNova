import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Fingerprint,
  Landmark,
  FolderCheck,
  UserRound,
  Building2,
  AppWindow,
  Bot,
  Info,
} from 'lucide-react';
import { products } from '@/lib/content';

export const productIcons = [Fingerprint, Landmark, FolderCheck] as const;

/** A boundary the reader should carry away from the section above it. */
export function Note({
  label = 'Please note',
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="note">
      <span className="note-mark">
        <Info size={16} strokeWidth={1.8} aria-hidden="true" />
        {label}
      </span>
      <p>{children}</p>
    </aside>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  stack,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  stack?: boolean;
}) {
  return (
    <header
      className={stack ? 'section-head section-head-stack' : 'section-head'}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </header>
  );
}
export function ProductCards() {
  return (
    <div className="product-grid">
      {products.map((product, index) => {
        const Icon = productIcons[index];
        return (
          <article
            className={`product-card product-${product.tone}`}
            key={product.slug}
          >
            <div className="product-top">
              <span className="icon-tile">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </div>
            <p className="eyebrow">{product.role}</p>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-bottom">
              <Link className="text-link" href="#" data-placeholder={`product:${product.slug}`}>
                Explore {product.name}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
/** Existing systems stay authoritative; VerifyNova connects the trust around them. */
export function TrustFlow() {
  return (
    <figure
      className="trust-flow"
      aria-label="Authoritative sources and the trust that connects them"
    >
      <div className="trust-flow-sources">
        <div className="trust-flow-source">
          <Landmark size={24} strokeWidth={1.5} aria-hidden="true" />
          <strong>Government registries</strong>
          <span>Official records</span>
        </div>
        <div className="trust-flow-source">
          <Fingerprint size={24} strokeWidth={1.5} aria-hidden="true" />
          <strong>National identity systems</strong>
          <span>Identity information</span>
        </div>
      </div>
      <p className="trust-flow-source-note">
        These sources remain authoritative.
      </p>
      <div className="trust-flow-core">
        <Image
          unoptimized
          src="/verifynova.svg"
          width={205}
          height={64}
          alt="VerifyNova"
        />
        {/* <ul className="trust-flow-qualities" aria-label="How trust connects">
            <li>Portable</li>
            <li>Governed</li>
            <li>Interoperable</li>
          </ul> */}
      </div>
      <ul
        className="trust-flow-recipients"
        aria-label="Who can rely on this trust"
      >
        {[
          { name: 'People', icon: UserRound },
          { name: 'Institutions', icon: Building2 },
          { name: 'Applications', icon: AppWindow },
          { name: 'Agents', icon: Bot },
        ].map(({ name, icon: Icon }) => (
          <li key={name}>
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            <strong>{name}</strong>
          </li>
        ))}
      </ul>
    </figure>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="wrap">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Africa’s digital future</p>
            <h2>
              Infrastructure people <br />
              can put their trust in.
            </h2>
          </div>
          <div>
            <p>
              Governments, institutions, businesses and partners. Let’s start
              with the relationship you need to make work.
            </p>
            <Link href="/contact" className="button light">
              Work with VerifyNova <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
