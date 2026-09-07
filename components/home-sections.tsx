import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Bot,
  FileSearch,
  Globe2,
  Landmark,
  Share2,
  Users,
} from 'lucide-react';
import {
  SectionHeading,
  ProductCards,
  TrustFlow,
} from '@/components/content-blocks';
import { trustGaps } from '@/lib/content';

const gapIcons = [Users, Landmark, FileSearch, Share2, Bot, Globe2];

export function HomeSections() {
  return (
    <>
      <section className="section wrap trust-gap-section">
        <SectionHeading
          eyebrow="The trust gap"
          title="Digital doesn’t automatically mean trustworthy."
          stack
        />
        <div className="feature-grid">
          {trustGaps.map(([title, text], index) => {
            const Icon = gapIcons[index];
            return (
              <article key={title}>
                <span className="icon-tile">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
        <p className="section-caption">
          A digital copy of an untrusted process is still an untrusted process.
          The missing piece is the context around information.
        </p>
      </section>
      <section className="section section-dark portfolio-section">
        <div className="wrap">
          <SectionHeading
            eyebrow="What VerifyNova builds"
            title="One infrastructure. Three platforms."
            stack
          />
          <ProductCards />
          <p className="section-caption">
            Different products for different responsibilities. A connected
            foundation for the whole relationship.
          </p>
        </div>
      </section>
      <section className="section wrap infrastructure-preview">
        <div>
          <p className="eyebrow">Infrastructure, not another silo</p>
          <h2>Designed to work with what exists.</h2>
          <p>
            Government registries and national identity systems remain
            authoritative. VerifyNova helps make the trust around them portable,
            governed and interoperable.
          </p>
          <p>
            People, institutions, applications and agents need common ways to
            establish what may be relied on—and what may happen next.
          </p>
          <Link className="text-link" href="/infrastructure">
            Explore the infrastructure{' '}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <TrustFlow />
      </section>
      <section className="africa-section">
        <div className="wrap">
          <div className="africa-visual grid-panel">
            <Image
              unoptimized
              src="/africa.svg"
              width="340"
              height="340"
              alt="Africa"
            />
          </div>
          <div>
            <p className="eyebrow">Africa first</p>
            <h2>
              Built for our realities. <br />
              Open to the world.
            </h2>
            <p>
              Institutional complexity, cross-border mobility and a growing
              digital economy demand infrastructure that understands its
              context. We start in Nigeria, with interoperability as a design
              principle from the beginning.
            </p>
            <Link className="text-link" href="/company">
              Why VerifyNova <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="section wrap implementation">
        <div>
          <p className="eyebrow">Education · first implementation</p>
          <h2>
            A credential is only <br />
            as useful as its trust.
          </h2>
          <p>
            Education is the first proving ground: institutional governance,
            authorised issuance, recipient control and public verification
            connected end to end.
          </p>
          <Link className="text-link" href="/solutions#education">
            Explore trusted credentials{' '}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="comparison">
          <article>
            <span className="eyebrow">The manual journey</span>
            <h3>Request. Search. Follow up.</h3>
            <p>
              A registrar, a record search, an email or a letter. Trust depends
              on a sequence of manual checks.
            </p>
          </article>
          <div className="comparison-arrow" aria-hidden="true">
            <ArrowDown size={20} />
          </div>
          <article>
            <span className="eyebrow">The connected model</span>
            <h3>Check origin, authority and status.</h3>
            <p>
              A record can carry a route to verification, with the issuer and
              lifecycle context needed to interpret it.
            </p>
          </article>
        </div>
      </section> */}
      <section className="section wrap home-blockchain" aria-labelledby="home-blockchain-title">
        <div className="home-blockchain-layout">
          <div>
            <p className="eyebrow">Our on-chain infrastructure</p>
            <h2 id="home-blockchain-title">Built on Base.<br />Made for verifiable evidence.</h2>
          </div>
          <div className="home-blockchain-copy">
            <p>
              VerifyNova’s smart contracts on Base support attestations and
              verifiable evidence across our ecosystem. They connect an on-chain
              evidence layer with the identity, authority and permissions managed
              by our products.
            </p>
            <p>
              Blockchain supports checking the integrity of recorded evidence.
              It does not replace an institution’s authority or a person’s permission.
            </p>
            <Link className="text-link" href="/company#on-chain-infrastructure">
              Explore our on-chain infrastructure <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
