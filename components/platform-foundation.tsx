import Link from 'next/link';
import Image from 'next/image';

const platforms = [
  {
    slug: 'unifyid',
    name: 'UnifyID',
    role: 'Identity and authority',
  },
  {
    slug: 'vchaincred',
    name: 'VChainCred',
    role: 'Institutional issuance',
  },
  {
    slug: 'asil',
    name: 'ASIL',
    role: 'Recipient control',
  },
] as const;

export function PlatformFoundation() {
  return (
    <figure
      className="platform-foundation"
      aria-label="Three platforms connected by a common trust model"
    >
      <div className="platform-foundation-nodes">
        {platforms.map(({ slug, name, role }) => (
          <Link
            href="#"
            key={slug}
            className={`platform-node platform-node-${slug}`}
          >
            <h2>{name}</h2>
            <span className="platform-node-role">{role}</span>
          </Link>
        ))}
      </div>
      <div className="platform-foundation-connectors" aria-hidden="true">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" focusable="false">
          <path
            className="platform-wire platform-wire-unifyid"
            d="M0 0 V42 H50 V80"
          />
          <path
            className="platform-wire platform-wire-asil"
            d="M100 0 V42 H50 V80"
          />
          <path
            className="platform-wire platform-wire-vchaincred"
            d="M50 0 V80"
          />
          <path className="platform-wire platform-wire-flow" pathLength={100} d="M0 0 V42 H50 V80" />
          <path className="platform-wire platform-wire-flow" pathLength={100} d="M100 0 V42 H50 V80" />
          <path className="platform-wire platform-wire-flow" pathLength={100} d="M50 0 V80" />
        </svg>
      </div>
      <div className="platform-foundation-base">
        <Image
          src="/favicon.svg"
          alt="VerifyNova"
          width={179}
          height={192}
          unoptimized
          className="platform-foundation-logo"
        />
      </div>
    </figure>
  );
}
