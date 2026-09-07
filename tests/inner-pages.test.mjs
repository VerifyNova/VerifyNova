import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(
  new URL('../app/inner-pages.css', import.meta.url),
  'utf8',
);
const source = readFileSync(
  new URL('../components/inner-pages.tsx', import.meta.url),
  'utf8',
);
const foundation = readFileSync(
  new URL('../components/shared-foundation.tsx', import.meta.url),
  'utf8',
).replace(/\s+/g, ' ');

test('shared foundation remains available in source but is commented out on the page', () => {
  assert.ok(source.includes('{/* <SharedFoundation /> */}'));
  assert.ok(source.includes("infrastructure: ['Explore the lifecycle', '#trust-lifecycle']"));
  assert.ok(source.includes('id="trust-lifecycle"'));
  assert.ok(!source.includes('<InfrastructureStack'));
  assert.ok(foundation.includes('id="shared-model"'));
  assert.ok(foundation.includes('editorial-section wrap shared-foundation'));
  assert.ok(foundation.includes('href="/products"'));
  assert.ok(foundation.includes('Meet the products'));
  for (const label of [
    'Existing systems',
    'VerifyNova’s role',
    'Connected services',
  ]) {
    assert.ok(foundation.includes(`label: '${label}'`));
  }
  assert.ok(foundation.includes('Official systems retain their authority.'));
  assert.ok(foundation.includes('It does not grant permission to act.'));
  assert.ok(
    foundation.includes('Conceptual responsibilities—not live connections.'),
  );
});

test('shared foundation uses a static responsive layout with no top padding', () => {
  assert.match(css, /\.editorial-section#shared-model\s*\{\s*padding-top:\s*0/);
  assert.match(
    css,
    /@media\s*\(max-width:\s*900px\)\s*\{\s*\.foundation-responsibility\s*\{\s*grid-template-columns:\s*1fr/,
  );
  assert.ok(!foundation.includes('useEffect'));
  assert.ok(!foundation.includes('onClick'));
  assert.ok(foundation.includes('aria-hidden="true"'));
  assert.ok(!foundation.includes('foundation-responsibility-icon'));
  assert.ok(!css.includes('.foundation-responsibilities::before'));
  assert.ok(
    css.includes('.foundation-responsibility + .foundation-responsibility'),
  );
});

test('the redesign reuses the shared brand and page width without changing global tokens', () => {
  assert.ok(!css.includes(':root'));
  assert.ok(!css.includes('--page-width:'));
  assert.ok(css.includes('var(--deep)'));
  assert.ok(css.includes('var(--blue-tint)'));
  assert.ok(css.includes('border-radius: 4px'));
  assert.ok(source.includes('editorial-hero wrap'));
});
test('five page bodies use distinct layouts with compact-screen rules', () => {
  for (const name of [
    'InfrastructurePage',
    'ProductsPage',
    'SolutionsPage',
    'TrustPage',
    'CompanyPage',
  ])
    assert.ok(source.includes(`export function ${name}`));
  for (const selector of [
    '.product-story',
    '.solution-catalogue',
    '.principle-ledger',
    '.company-mission',
    '.institutional-context',
  ])
    assert.ok(css.includes(selector));
  assert.ok(css.includes('@media (max-width: 900px)'));
  assert.ok(css.includes('@media (max-width: 600px)'));
  assert.ok(!source.includes('className="status"'));
});
