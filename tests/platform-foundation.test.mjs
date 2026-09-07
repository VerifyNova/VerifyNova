import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const source = read('components/platform-foundation.tsx');
const css = read('app/platform-foundation.css');

test('products inherits the shared Infrastructure hero column layout', () => {
  assert.ok(!css.includes('.editorial-hero-products {'));
  assert.ok(css.includes('@media (max-width: 900px)'));
});

test('hero foundation links all three platforms without maturity badges', () => {
  for (const slug of ['unifyid', 'vchaincred', 'asil']) assert.ok(source.includes(`slug: '${slug}'`));
  assert.ok(source.includes('href="#"'));
  assert.ok(source.includes('src="/favicon.svg"'));
  assert.ok(!source.includes('<h2>Common trust model</h2>'));
  assert.ok(!source.includes('product.stage'));
  assert.ok(!source.includes('description'));
  assert.ok(!source.includes('platform-node-icon'));
  assert.ok(source.includes('d="M0 0 V42 H50 V80"'));
  assert.ok(source.includes('d="M100 0 V42 H50 V80"'));
  assert.ok(read('components/inner-pages.tsx').includes("if (slug === 'products') return <PlatformFoundation />"));
});

test('foundation connectors share the node grid geometry and have a narrow-screen layout', () => {
  assert.ok(css.includes('margin-inline: calc((100% - 24px) / 6)'));
  assert.ok(css.includes('vector-effect: non-scaling-stroke'));
  assert.ok(css.includes('@media (max-width: 560px)'));
  assert.ok(css.includes('.platform-node:focus-visible'));
  assert.ok(css.includes('prefers-reduced-motion'));
  assert.ok(css.includes('aspect-ratio: 1'));
  assert.ok(css.includes('place-items: center'));
  assert.ok(!source.includes('platform-foundation-responsibilities'));
});
