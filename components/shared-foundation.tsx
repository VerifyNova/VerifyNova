import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/content-blocks';

const responsibilities = [
  {
    label: 'Existing systems',
    title: 'Where authority remains',
    description:
      'Registries and institutions remain responsible for their official records.',
  },
  {
    label: 'VerifyNova’s role',
    title: 'What connects the relationship',
    description:
      'Connect identity, institutional authority, permission and evidence.',
  },
  {
    label: 'Connected services',
    title: 'Where trust is applied',
    description:
      'People, institutions, applications and agents use information within agreed boundaries.',
  },
] as const;

export function SharedFoundation() {
  return (
    <section
      className="editorial-section wrap shared-foundation"
      id="shared-model"
    >
      <SectionHeading
        eyebrow="The shared foundation"
        title="Keep the source. Connect the trust."
        text="Official systems retain their authority. VerifyNova connects the identity, permissions and evidence needed to use information responsibly."
        stack
      />
      <div className="foundation-responsibilities">
        {responsibilities.map(({ label, title, description }, index) => (
          <article
            className={
              index === 1
                ? 'foundation-responsibility foundation-responsibility-brand'
                : 'foundation-responsibility'
            }
            key={label}
          >
            <p className="foundation-responsibility-label">{label}</p>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="foundation-boundary">
        <div>
          <p className="foundation-boundary-principle">
            Reliable evidence supports a decision. It does not grant permission
            to act.
          </p>
          <p className="foundation-boundary-context">
            Conceptual responsibilities—not live connections. Implementations
            depend on the relevant products and institutional agreements.
          </p>
        </div>
        <Link className="text-link" href="/products">
          Meet the products <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
