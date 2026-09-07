'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ecosystemConnector } from '@/lib/diagram-geometry';
import {
  Building2,
  Fingerprint,
  Landmark,
  FileCheck2,
  ArrowLeftRight,
  Network,
  UserRound,
} from 'lucide-react';
const nodes = [
  {
    id: 'people',
    title: 'People',
    text: 'Identity and control for the person behind every relationship.',
    icon: UserRound,
  },
  {
    id: 'identity',
    title: 'Identity',
    text: 'Verified information, shared with explicit permission.',
    icon: Fingerprint,
  },
  {
    id: 'authority',
    title: 'Institutional authority',
    text: 'Who may act, issue and approve on an institution’s behalf.',
    icon: Landmark,
  },
  {
    id: 'organisations',
    title: 'Organisations',
    text: 'Governments, businesses and institutions with accountable roles.',
    icon: Building2,
  },
  {
    id: 'records',
    title: 'Trusted records',
    text: 'Evidence with an issuer, a history and a current status.',
    icon: FileCheck2,
  },
  {
    id: 'exchange',
    title: 'Controlled exchange',
    text: 'Information shared for a purpose, within agreed boundaries.',
    icon: ArrowLeftRight,
  },
  {
    id: 'systems',
    title: 'Digital systems',
    text: 'Applications and platforms connected through common trust contracts.',
    icon: Network,
  },
];
export function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const diagram = ref.current;
    if (!diagram) return;
    const svg = diagram.querySelector<SVGSVGElement>('.ecosystem-lines')!;
    const draw = () => {
      const matrix = svg.getScreenCTM();
      if (!matrix || !svg.getBoundingClientRect().width) return;
      const inverse = matrix.inverse();
      const core = diagram
        .querySelector<HTMLElement>('.ecosystem-core')!
        .getBoundingClientRect();
      diagram.querySelectorAll<HTMLElement>('[data-node]').forEach((node) => {
        const box = node.getBoundingClientRect();
        const bottom = node.dataset.node === 'systems';
        const d = ecosystemConnector(core, box, bottom, inverse);
        diagram
          .querySelectorAll(`[data-path="${node.dataset.node}"]`)
          .forEach((p) => p.setAttribute('d', d));
      });
    };
    const observer = new ResizeObserver(draw);
    observer.observe(diagram);
    observer.observe(svg);
    window.addEventListener('resize', draw);
    diagram
      .querySelectorAll('.ecosystem-node, .ecosystem-core')
      .forEach((node) => observer.observe(node));
    const visibility = new IntersectionObserver(([entry]) =>
      diagram.classList.toggle('is-moving', entry.isIntersecting),
    );
    visibility.observe(diagram);
    draw();
    return () => {
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('resize', draw);
    };
  }, []);
  return (
    <section
      className="ecosystem"
      ref={ref}
      aria-label="VerifyNova connects people, organisations and digital systems through identity, institutional authority, trusted records and controlled information exchange."
    >
      <svg className="ecosystem-lines" aria-hidden="true">
        {nodes.map((node, i) => (
          <g key={node.id}>
            <path data-path={node.id} className="line-base" />
            <path
              data-path={node.id}
              className="line-flow"
              style={{ animationDelay: `${i * -0.7}s` }}
            />
          </g>
        ))}
      </svg>
      <div className="ecosystem-core">
        <Image
          unoptimized
          className="ecosystem-brand-icon"
          src="/favicon.svg"
          width={179}
          height={192}
          alt=""
          aria-hidden="true"
        />
        <div>
          <strong>VerifyNova</strong>
          <br />
          <small>Trust, built in.</small>
        </div>
      </div>
      {nodes.map(({ id, title, text, icon: Icon }) => (
        <div className={`ecosystem-node node-${id}`} data-node={id} key={id}>
          <span className="node-icon icon-tile icon-tile-sm">
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
