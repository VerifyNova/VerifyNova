'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  Fingerprint,
  FileCheck2,
  ArrowLeftRight,
  Layers,
  ShieldCheck,
  UserRound,
  Building2,
  Bot,
  Landmark,
  AppWindow,
  Settings2,
} from 'lucide-react';

const sources = [
  {
    name: 'Government registries',
    icon: Landmark,
    detail: 'Official records',
    tone: 'blue',
  },
  {
    name: 'National identity systems',
    icon: Fingerprint,
    detail: 'Identity information',
    tone: 'sage',
  },
];
const participants = [
  {
    name: 'People',
    icon: UserRound,
    text: 'Individuals with control over their information.',
  },
  {
    name: 'Institutions',
    icon: Building2,
    text: 'Public and private organisations with defined responsibilities.',
  },
  {
    name: 'Applications',
    icon: AppWindow,
    text: 'Services that rely on information for an approved purpose.',
  },
  {
    name: 'Agents',
    icon: Bot,
    text: 'Automated actors with accountable owners and bounded authority.',
  },
];

export function InfrastructureStack() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const figure = ref.current;
    if (!figure) return;
    const draw = () => {
      const bounds = figure.getBoundingClientRect();
      const box = (element: Element) => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
          left: rect.left - bounds.left,
          right: rect.right - bounds.left,
          top: rect.top - bounds.top,
          bottom: rect.bottom - bounds.top,
          width: rect.width,
          height: rect.height,
        };
      };
      const core = box(figure.querySelector('.architecture-core')!);
      const inputs = [...figure.querySelectorAll('[data-source]')].map(box);
      const outputs = [...figure.querySelectorAll('[data-participant]')].map(
        box,
      );
      // Sources enter the panel from its sides; participants leave from its base.
      const paths = inputs.map((source, index) => {
        const left = index === 0;
        const x = left ? source.right - 2 : source.left + 2;
        const targetX = left ? core.left + 2 : core.right - 2;
        const targetY = Math.min(
          Math.max(source.y, core.top + 24),
          core.bottom - 24,
        );
        const middle = (x + targetX) / 2;
        return `M ${x} ${source.y} C ${middle} ${source.y}, ${middle} ${targetY}, ${targetX} ${targetY}`;
      });
      outputs.forEach((output, index) => {
        const x = core.left + (core.width * (index + 1)) / (outputs.length + 1);
        const y = core.bottom - 2;
        const middle = (y + output.top) / 2;
        paths.push(
          `M ${x} ${y} C ${x} ${middle}, ${output.x} ${middle}, ${output.x} ${output.top + 2}`,
        );
      });
      figure.querySelectorAll('[data-connector]').forEach((path) => {
        path.setAttribute(
          'd',
          paths[Number(path.getAttribute('data-connector'))],
        );
      });
    };
    const observer = new ResizeObserver(draw);
    observer.observe(figure);
    figure
      .querySelectorAll('[data-source], [data-participant], .architecture-core')
      .forEach((node) => observer.observe(node));
    const visibility = new IntersectionObserver(([entry]) => {
      figure.classList.toggle('is-moving', entry.isIntersecting);
    });
    visibility.observe(figure);
    draw();
    return () => {
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <figure
      className="architecture-figure"
      ref={ref}
      aria-label="Government registries and national identity systems remain authoritative. VerifyNova connects trust around these sources for people, institutions, applications and agents. Reliable evidence does not itself grant permission to act."
    >
      <div className="architecture-network">
        <svg className="architecture-lines" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <g
              key={index}
              className={
                index === 1 || index === 3 || index === 5
                  ? 'architecture-connection-sage'
                  : undefined
              }
            >
              <path className="line-base" data-connector={index} />
              <path
                className="line-flow"
                data-connector={index}
                style={{ animationDelay: `${index * -0.6}s` }}
              />
            </g>
          ))}
        </svg>
        {sources.map(({ name, icon: Icon, detail, tone }, index) => (
          <article
            className={`architecture-source architecture-source-${index} architecture-${tone}`}
            data-source
            key={name}
          >
            <span
              className={
                tone === 'sage' ? 'icon-tile icon-tile-sage' : 'icon-tile'
              }
            >
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h3>{name}</h3>
              <p>Authoritative source</p>
              <span>{detail}</span>
            </div>
          </article>
        ))}
        <div className="architecture-core">
          <Image
            unoptimized
            src="/favicon.svg"
            width={179}
            height={192}
            className="architecture-brand"
            alt=""
            aria-hidden="true"
          />
          <h3>VerifyNova</h3>
          <p>
            Portable, governed,
            <br />
            interoperable trust
          </p>
          <ul
            className="architecture-capabilities"
            aria-label="Trust responsibilities"
          >
            <li>
              <Layers size={20} aria-hidden="true" />
              <span>
                Portable
                <br />
                trust
              </span>
            </li>
            <li>
              <ShieldCheck size={20} aria-hidden="true" />
              <span>
                Governed
                <br />
                relationships
              </span>
            </li>
            <li>
              <ArrowLeftRight size={20} aria-hidden="true" />
              <span>
                Interoperable
                <br />
                exchange
              </span>
            </li>
          </ul>
        </div>
        <div className="architecture-participants">
          {participants.map(({ name, icon: Icon, text }) => (
            <article
              className="architecture-participant card"
              data-participant
              key={name}
            >
              <span className="icon-tile">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="architecture-boundaries">
        <div>
          <span className="icon-tile">
            <FileCheck2 size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3>What may be relied on</h3>
            <p>Source, authority, evidence and current status.</p>
          </div>
        </div>
        <div>
          <span className="icon-tile">
            <Settings2 size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3>What may happen next</h3>
            <p>Purpose, permissions and approved actions.</p>
          </div>
        </div>
      </div>
      <figcaption>
        Reliable evidence does not automatically grant permission to act.
        <span>
          Conceptual relationships—not live connections or unrestricted data
          sharing.
        </span>
      </figcaption>
    </figure>
  );
}
