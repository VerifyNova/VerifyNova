import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  products,
  pageContent,
  publicRoutes,
  solutions,
  lifecycle,
} from '../lib/content.ts';
import { parseSiteOrigin } from '../lib/site-config.ts';

test('all published routes have substantive content and unique addresses', () => {
  assert.equal(publicRoutes.length, 1 + Object.keys(pageContent).length);
  assert.ok(publicRoutes.includes('/products'));
  assert.ok(!publicRoutes.some((path) => path.startsWith('/products/')));
  assert.equal(new Set(publicRoutes).size, publicRoutes.length);
  for (const page of Object.values(pageContent)) {
    assert.ok(page.title.length > 15);
    assert.ok(page.intro.length > 80);
  }
});
test('the portfolio has exactly the three approved product identities', () => {
  assert.deepEqual(
    products.map((p) => p.name),
    ['UnifyID', 'VChainCred', 'ASIL'],
  );
  for (const product of products) {
    assert.equal(product.capabilities.length, 3);
    assert.ok(product.boundary.length > 100);
    assert.ok(['In test', 'In development'].includes(product.stage));
  }
});
test('exploration is not presented as deployed coverage', () => {
  assert.equal(
    solutions.find((s) => s.id === 'education').stage,
    'First implementation · in test',
  );
  assert.equal(solutions.filter((s) => s.stage === 'Exploring').length, 7);
  assert.equal(lifecycle.at(-1)[0], 'Lifecycle');
});
test('all pages use the agreed brand palette and page width', () => {
  const css = readFileSync(
    new URL('../app/globals.css', import.meta.url),
    'utf8',
  )
    .toLowerCase()
    .replace(/\s+/g, '');
  for (const color of ['#27536b', '#1b3b4e', '#caaf94', '#89987b', '#564943'])
    assert.ok(css.includes(color));
  assert.ok(css.includes('--page-width:min(calc(100%-64px),1436px)'));
  assert.ok(css.includes('--page-width:min(calc(100%-36px),1436px)'));
  assert.ok(css.includes('prefers-reduced-motion:reduce'));
  assert.ok(css.includes('animation-play-state:paused'));
});
test('trusted site origin rejects ambiguous or unsafe configuration', () => {
  assert.equal(parseSiteOrigin(undefined), undefined);
  assert.equal(parseSiteOrigin('https://example.com'), 'https://example.com');
  for (const url of [
    'http://example.com',
    'https://localhost',
    'https://example.com/path',
    'https://user:pass@example.com',
    'https://example.com?key=a',
  ])
    assert.throws(() => parseSiteOrigin(url));
});
test('home hero fills the screen and owns the decorative Africa map', () => {
  const page = readFileSync(
    new URL('../app/page.tsx', import.meta.url),
    'utf8',
  );
  const diagram = readFileSync(
    new URL('../components/ecosystem-diagram.tsx', import.meta.url),
    'utf8',
  );
  const css = readFileSync(
    new URL('../app/globals.css', import.meta.url),
    'utf8',
  ).replace(/\s+/g, '');
  const heroEnd = page.indexOf('</section>');
  assert.ok(page.indexOf('className="hero-africa"') < heroEnd);
  assert.ok(page.indexOf('<EcosystemDiagram') > heroEnd);
  assert.ok(!diagram.includes('/africa.svg'));
  assert.ok(css.includes('min-height:calc(100svh-97px)'));
  assert.ok(css.includes('min-height:calc(100svh-81px)'));
  assert.ok(css.includes('grid-template-columns:minmax(0,1.2fr)minmax(0,1fr)'));
  assert.ok(page.indexOf('className="hero-content"') < page.indexOf('className="hero-africa"'));
});
test('diagram subscriptions are cleaned up and connection coordinates are element-based', () => {
  const source = readFileSync(
    new URL('../components/ecosystem-diagram.tsx', import.meta.url),
    'utf8',
  );
  for (const value of [
    'getBoundingClientRect',
    'ResizeObserver',
    'IntersectionObserver',
    'observer.disconnect()',
    'visibility.disconnect()',
  ])
    assert.ok(source.includes(value));
});
test('the approved artwork is reused as local vector assets', () => {
  for (const file of ['verifynova.svg', 'africa.svg']) {
    const svg = readFileSync(
      new URL(`../public/${file}`, import.meta.url),
      'utf8',
    );
    assert.ok(svg.includes('<svg'));
    assert.ok(!svg.includes('<script'));
    assert.ok(!svg.includes('http://localhost'));
  }
});
