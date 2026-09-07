import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const source = read('components/product-showcases.tsx');
const css = read('app/inner-pages.css');

test('product showcases preserve content and links without status labels', () => {
  assert.ok(
    read('components/inner-pages.tsx').includes('<ProductShowcases />'),
  );
  for (const field of [
    'role',
    'name',
    'headline',
    'description',
    'capabilities',
  ]) {
    assert.ok(source.includes(`product.${field}`), field);
  }
  assert.ok(source.includes('href="#"'));
  assert.ok(source.includes('aria-labelledby={`showcase-${product.slug}`}'));
  assert.ok(source.includes('id={`showcase-${product.slug}`}'));
  assert.ok(!source.includes('product-story-step'));
  assert.ok(!source.includes('className="chip"'));
  assert.ok(!source.includes('product.stage'));
  assert.ok(!source.includes('product-story-maturity'));
});

test('comparison cards align content on desktop and stack on narrow screens', () => {
  for (const name of [
    'product-story-identity',
    'product-story-intro',
    'product-story-capabilities',
    'product-story-footer',
  ]) {
    assert.ok(source.includes(`className="${name}"`));
    assert.ok(css.includes(`.${name}`));
  }
  assert.ok(!source.includes('ProductModel'));
  assert.ok(!source.includes('onClick'));
  assert.match(
    css,
    /\.product-showcase-grid\s*\{\s*grid-template-columns:\s*1fr/,
  );
  assert.match(
    css,
    /\.product-showcase-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(3,/,
  );
  assert.ok(css.includes('@supports (grid-template-rows: subgrid)'));
  assert.ok(source.indexOf('<footer') > source.indexOf('</ul>'));
  assert.ok(css.includes('.product-story-link:focus-visible'));
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
  for (const slug of ['unifyid', 'vchaincred', 'asil']) {
    assert.ok(css.includes(`.product-story-${slug}`));
  }
});
