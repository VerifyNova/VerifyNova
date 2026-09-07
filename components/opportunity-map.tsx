import Image from 'next/image';
import Link from 'next/link';

const areas = [
  ['licensing', 'Professional licensing'],
  ['workforce', 'Workforce'],
  ['healthcare', 'Healthcare'],
  ['government', 'Public services'],
  ['business', 'Business'],
  ['land', 'Land & property'],
] as const;
const emerging = [
  ['agriculture', 'Agriculture'],
  ['agents', 'AI agent authority'],
  ['cross-border', 'Cross-border trust'],
] as const;

export function OpportunityMap() {
  return (
    <figure className="opportunity-map" aria-label="Education as the starting point for wider trust opportunities">
      <Link href="#education" className="opportunity-start">
        <strong>Education &amp; credentials</strong>
      </Link>
      <div className="opportunity-network">
        <div className="opportunity-core">
          <Image src="/favicon.svg" alt="VerifyNova" width={179} height={192} unoptimized />
        </div>
        {areas.map(([id, label], index) => (
          <div className={`opportunity-branch ${index < 3 ? 'opportunity-left' : 'opportunity-right'}`} style={{ gridRow: index % 3 + 1 }} key={id}>
            <Link href={`#${id}`}>{label}</Link>
          </div>
        ))}
      </div>
      <div className="opportunity-more">
        {emerging.map(([id, label]) => <Link href={`#${id}`} key={id}>{label}</Link>)}
      </div>
    </figure>
  );
}
