import Image from 'next/image';
import Link from 'next/link';
import {
  AppWindow,
  ArrowDown,
  ArrowUpRight,
  Building2,
  FileCheck2,
  Fingerprint,
  FolderCheck,
  Globe2,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Network,
  RefreshCw,
  Scale,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { solutions, lifecycle, pageContent } from '@/lib/content';
import { ProductShowcases } from '@/components/product-showcases';
import { PlatformFoundation } from '@/components/platform-foundation';
import { OpportunityMap } from '@/components/opportunity-map';
import { TrustVerification } from '@/components/trust-verification';
// import { SharedFoundation } from '@/components/shared-foundation';
import {
  ContactBand,
  Note,
  SectionHeading,
  TrustFlow,
} from '@/components/content-blocks';

export type EditorialPage =
  | 'infrastructure'
  | 'products'
  | 'solutions'
  | 'trust'
  | 'company';
const heroLinks = {
  infrastructure: ['Explore the lifecycle', '#trust-lifecycle'],
  products: ['Explore the platforms', '#platforms'],
  solutions: ['Start with education', '#education'],
  trust: ['Read our principles', '#principles'],
  company: ['Our purpose', '#mission'],
} as const;

function HeroVisual({ slug }: { slug: EditorialPage }) {
  if (slug === 'company')
    return (
      <div className="editorial-africa grid-panel">
        <Image
          unoptimized
          priority
          src="/africa.svg"
          width={560}
          height={560}
          alt="Africa"
        />
      </div>
    );
  if (slug === 'products') return <PlatformFoundation />;
  if (slug === 'solutions') return <OpportunityMap />;
  if (slug === 'trust') return <TrustVerification />;
  return <TrustFlow />;
}

export function EditorialHero({ slug }: { slug: EditorialPage }) {
  const page = pageContent[slug];
  const [label, href] = heroLinks[slug];
  return (
    <section className={`editorial-hero wrap editorial-hero-${slug}`}>
      <div className="editorial-hero-copy">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="editorial-lead">{page.intro}</p>
        <div className="actions">
          <Link className="button" href={href}>
            {label}
            <ArrowDown size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <HeroVisual slug={slug} />
    </section>
  );
}

export function InfrastructurePage() {
  return (
    <>
      {/* <SharedFoundation /> */}
      <section className="editorial-section section-dark" id="trust-lifecycle">
        <div className="wrap">
          <div className="lifecycle-heading">
            <SectionHeading
              eyebrow="The trust lifecycle"
              title="Current trust, at every step."
              text="A valid decision yesterday is not blanket permission today. Expiry, revocation and changes in authority belong to the same lifecycle as issuance."
              stack
            />
          </div>
          <div className="lifecycle-journey">
            {[
              { title: 'Establish trust', icon: Fingerprint, start: 0 },
              { title: 'Act with authority', icon: ShieldCheck, start: 3 },
              { title: 'Keep trust current', icon: RefreshCw, start: 6 },
            ].map(({ title, icon: Icon, start }) => (
              <div className="lifecycle-stage" key={title}>
                <header className="lifecycle-stage-heading">
                  <div className="lifecycle-stage-title">
                    <span className="lifecycle-stage-icon">
                      <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3>{title}</h3>
                  </div>
                </header>
                <ol
                  className="lifecycle-steps"
                  start={start + 1}
                  aria-label={title}
                >
                  {lifecycle.slice(start, start + 3).map(([name, text]) => (
                    <li key={name}>
                      <h4>{name}</h4>
                      <p>{text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="editorial-section wrap institutional-context">
        <div>
          <p className="eyebrow">Digital public infrastructure</p>
          <h2>
            Complement the system. <br />
            Don’t replace its authority.
          </h2>
          <p>
            Government registries, national identity systems, regulators and
            institutions hold responsibilities that software cannot simply
            assume. VerifyNova’s approach is to connect trust around those
            responsibilities through governed information and shared contracts.
          </p>
        </div>
        <div className="institutional-directory">
          {(
            [
              ['Government registries', Landmark],
              ['National identity systems', Fingerprint],
              ['Regulators', Scale],
              ['Institutions', Building2],
              ['Applications', AppWindow],
              ['Technology providers', Server],
            ] as const
          ).map(([name, Icon]) => (
            <div key={name} className="card">
              <span className="icon-tile">
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>{name}</span>
            </div>
          ))}
        </div>
        {/* <Note label="What this does not mean">
          Digital public infrastructure describes the role we aim to serve. It
          does not imply government ownership, endorsement, universal
          availability or a legal mandate. Each implementation needs the
          appropriate institutional agreements and operating boundaries.
        </Note> */}
      </section>
      <ContactBand />
    </>
  );
}

export function ProductsPage() {
  return (
    <>
      <section
        className="editorial-section wrap portfolio-stories"
        id="platforms"
      >
        <ProductShowcases />
        <Note label="Where the products stand">
          UnifyID is in development; VChainCred and ASIL are in test. Discuss
          availability and implementation scope with VerifyNova before relying
          on a product in production.
        </Note>
      </section>
      <section className="editorial-section section-dark products-working-together">
        <div className="wrap">
          <SectionHeading
            eyebrow="Working together"
            title="Different responsibilities. Connected trust."
            stack
          />
          <div className="product-relationship">
            <article>
              <span className="icon-tile">
                <Fingerprint size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="eyebrow">UnifyID</p>
              <h3>Establish the participant.</h3>
              <p>
                Identity and permission create the context for an interaction.
              </p>
            </article>
            <article>
              <span className="icon-tile">
                <Landmark size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="eyebrow">VChainCred</p>
              <h3>Govern the issuing decision.</h3>
              <p>
                Institutional authority and workflow connect the record to an
                accountable source.
              </p>
            </article>
            <article>
              <span className="icon-tile">
                <FolderCheck size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="eyebrow">ASIL</p>
              <h3>Put the recipient in the picture.</h3>
              <p>
                Receiving, organising and sharing records remains part of the
                trust relationship.
              </p>
            </article>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

const solutionIcons = [
  GraduationCap,
  ShieldCheck,
  Building2,
  FileCheck2,
  Landmark,
  Building2,
  Globe2,
  FileCheck2,
  Workflow,
  Globe2,
];
export function SolutionsPage() {
  const education = solutions[0];
  return (
    <>
      <section className="editorial-section wrap" id={education.id}>
        <article className="solution-feature section-dark">
          <div>
            <span className="education-stage">Our First implementation</span>
            <h2>{education.title}</h2>
          </div>
          <div>
            <p>{education.description}</p>
            <p>{education.detail}</p>
            <Link className="text-link" href="/contact?topic=education">
              Discuss this area
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </article>
      </section>
      <section className="editorial-section wrap">
        <SectionHeading
          eyebrow="Beyond the first implementation"
          title="Trust beyond education."
          // text="The same questions of identity, authority, evidence and control extend into other services. These areas have different stages and implementation boundaries."
        />
        <ul className="solution-catalogue">
          {solutions.slice(1).map((solution, index) => {
            const Icon = solutionIcons[index + 1];
            return (
              <li key={solution.id} id={solution.id}>
                <Link
                  className="solution-row"
                  href="#"
                >
                  <span className="solution-row-icon">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="solution-row-body">
                    <span className="solution-row-head">
                      <span className="solution-row-title">
                        {solution.title}
                      </span>
                      <span className="solution-row-status">
                        <ArrowUpRight
                          className="solution-row-arrow"
                          size={18}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="solution-row-copy">
                      {solution.description}
                    </span>
                    <span className="solution-row-detail">
                      {solution.detail}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <ContactBand />
    </>
  );
}

export function TrustPage() {
  return (
    <div className="trust-redesign">
      <section className="editorial-section wrap" id="principles">
        <SectionHeading
          eyebrow="Our principles"
          title="Trust needs more than a checkmark."
          stack
        />
        <div className="principle-ledger">
          {[
            {
              icon: Fingerprint,
              title: 'Identity is context—not unlimited access.',
              text: 'A verified identity helps establish confidence. A separate, current permission decision determines what may be received or done.',
            },
            {
              icon: Landmark,
              title: 'Authority has an accountable source.',
              text: 'The institution, role and delegation behind an action matter as much as the record that results from it.',
            },
            {
              icon: FileCheck2,
              title: 'Evidence needs an explanation.',
              text: 'Proof should make origin and changes checkable. It does not automatically establish that the source statement was true.',
            },
            {
              icon: RefreshCw,
              title: 'Trust has a lifecycle.',
              text: 'Expiry, revocation, supersession and changes in permission must remain visible and meaningful to the systems relying on them.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <span className="icon-tile">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="editorial-section section-dark" id="privacy">
        <div className="wrap privacy-editorial">
          <div>
            <span className="icon-tile icon-tile-lg">
              <LockKeyhole size={26} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <p className="eyebrow">Privacy approach</p>
            <h2>
              Governed data stays private. <br />
              Trust remains checkable.
            </h2>
          </div>
          <div className="privacy-responsibilities">
            {[
              [
                'Limit the information.',
                'Design for the information a relationship actually needs. Make the purpose understandable, limit the scope of sharing and keep supported permissions reviewable.',
              ],
              [
                'Be clear about future access.',
                'Withdrawing permission can stop supported future access. It does not erase information already received or remove a recipient’s independent legal obligations.',
              ],
              [
                'Explain the actual processing.',
                'This company-level approach is not a substitute for a product’s privacy notice. Product-specific notices must explain the actual processing, retention and rights arrangements.',
              ],
            ].map(([title, text], index) => (
              <article key={title}>
                <span className="index">0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="editorial-section wrap" id="standards">
        <SectionHeading
          eyebrow="Interoperability"
          title="Open by standard. Specific in implementation."
        />
        <div className="standards-ledger">
          {[
            [
              'W3C Verifiable Credentials',
              'A shared model for issuer-backed statements and their verification.',
            ],
            [
              'Decentralised Identifiers',
              'Identifiers whose associated verification information can be resolved.',
            ],
            [
              'OpenID Connect',
              'A standard foundation for identity-based sign-in between systems.',
            ],
            [
              'Open Badges',
              'A standards direction for achievements and learning credentials.',
            ],
          ].map(([title, text]) => (
            <article key={title} className="card">
              <span className="icon-tile">
                <Network size={20} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="editorial-section section-wash" id="security">
        <div className="wrap security-editorial">
          <div>
            <p className="eyebrow">Security &amp; responsible AI</p>
            <h2>
              Control must survive <br />
              the first approval.
            </h2>
          </div>
          <div>
            <p>
              Account access, delegated authority, software agents and issued
              records require different checks. The receiving system must
              enforce the applicable permission and lifecycle boundaries.
            </p>
            <p>
              AI agents should have accountable sponsors and explicit authority.
              Verification of an agent’s identity must not be confused with
              approval of every action it attempts.
            </p>
            <Link className="text-link" href="/contact?topic=security">
              Raise a security concern
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ContactBand />
    </div>
  );
}

export function CompanyPage() {
  return (
    <>
      <section className="editorial-section mission-statement" id="mission">
        <div className="wrap company-mission">
          <div className="mission-copy">
            <p className="eyebrow">Our mission</p>
            <h2>
              Make important digital relationships{' '}
              <em>understandable, accountable and connected.</em>
            </h2>
          </div>
          <div className="mission-context">
            <p>
              A trusted record is not an isolated object. It connects a person,
              an institution, an authorised decision and the systems that depend
              on it. VerifyNova builds for that whole relationship.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="editorial-section wrap company-context">
        <div>
          <p className="eyebrow">Why Africa</p>
          <h2>
            Infrastructure shaped <br />
            by its context.
          </h2>
          <p>
            Institutional and regulatory realities, cross-border mobility and a
            growing digital economy make trustworthy information essential. We
            begin in Nigeria and design for systems that need to communicate
            beyond their original boundaries.
          </p>
        </div>
        <div className="company-context-card grid-panel">
          <Image
            unoptimized
            src="/favicon.svg"
            width={100}
            height={107}
            alt=""
            aria-hidden="true"
          />
          <p className="eyebrow">VerifyNova</p>
          <h3>Trust, built in.</h3>
          <p>People. Institutions. Systems.</p>
        </div>
      </section> */}
      <section className="editorial-section blockchain-statement" id="on-chain-infrastructure">
        <div className="wrap blockchain-statement-layout">
          <div className="blockchain-statement-heading">
            <h2>Our on-chain infrastructure</h2>
          </div>
          <div className="blockchain-network-accent" aria-hidden="true">
            Base<span>Ethereum Layer 2</span>
          </div>
          <p className="blockchain-statement-copy">
            VerifyNova’s smart contracts are deployed on Base, an Ethereum Layer
            2. Base combines fast, low-cost transactions with the security of
            Ethereum, so every attestation and piece of evidence recorded
            through our ecosystem is immutable and independently verifiable.
            These contracts form the on-chain foundation for our products, which
            manage identity, authority and permissions on top of it.
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
