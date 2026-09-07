import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  FileCheck2,
  Fingerprint,
  Landmark,
  SlidersHorizontal,
} from 'lucide-react';
import { EcosystemDiagram } from '@/components/ecosystem-diagram';
import { HomeSections } from '@/components/home-sections';

const foundations = [
  ['Identity', Fingerprint],
  ['Authority', Landmark],
  ['Evidence', FileCheck2],
  ['Control', SlidersHorizontal],
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero wrap">
        <div className="hero-content">
          <p className="eyebrow">Trust, built in.</p>
          <h1>
            Building Africa’s trusted <br />
            <em>digital public infrastructure.</em>
          </h1>
          <p className="hero-copy">
            VerifyNova connects identity, institutional authority, trusted
            records and controlled information exchange across people,
            organisations and digital systems.
          </p>
          <div className="actions">
            <Link className="button" href="/products">
              Explore our products <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button secondary" href="/infrastructure">
              Our infrastructure <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-panel grid-panel">
            <div className="hero-map">
              <Image
                unoptimized
                priority
                className="hero-africa"
                src="/africa.svg"
                width={900}
                height={900}
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="foundation-screen"
        aria-labelledby="foundation-heading"
      >
        <h2 id="foundation-heading" className="visually-hidden">
          Identity, authority, evidence and control
        </h2>
        <div className="foundation">
          <div className="wrap">
            <ol className="foundation-list">
              {foundations.map(([name, Icon]) => (
                <li key={name}>
                  <span className="icon-tile icon-tile-sm">
                    <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <strong>{name}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="ecosystem-section">
          <div className="wrap">
            <EcosystemDiagram />
          </div>
        </div>
      </section>
      <HomeSections />
    </main>
  );
}
