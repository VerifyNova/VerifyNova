import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { publicRoutes } from '../lib/content.ts';

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const footer = read('components/site-shell.tsx').split('SiteFooter')[1];
const hrefs = [...footer.matchAll(/href="([^"]+)"/g)].map(([, href]) => href);

test('every non-placeholder footer link is its own destination', () => {
  assert.equal(hrefs.filter((href) => href === '#').length, 3);
  const destinations = hrefs.filter((href) => href !== '#').map((href) => href.split(/[?#]/)[0]);
  const repeated = destinations.filter(
    (path, index) => destinations.indexOf(path) !== index && path !== '/',
  );
  assert.deepEqual(repeated, [], `footer repeats: ${repeated.join(', ')}`);
});

test('footer links only point at routes the site publishes', () => {
  for (const href of hrefs) {
    if (!href.startsWith('/')) continue;
    assert.ok(publicRoutes.includes(href.split(/[?#]/)[0]), href);
  }
});

test('the policy pages are published, routed and reachable from the footer', () => {
  const routes = read('app/[slug]/page.tsx');
  for (const [slug, label] of [
    ['security', 'Responsible disclosure'],
    ['privacy', 'Privacy notice'],
    ['terms', 'Terms of use'],
  ]) {
    assert.ok(publicRoutes.includes(`/${slug}`), slug);
    assert.ok(routes.includes(`  ${slug}: `), `${slug} routed`);
    assert.ok(footer.includes(`href="/${slug}"`), `${slug} in footer`);
    assert.ok(footer.includes(label), label);
  }
});

test('the disclosure page tells reporters what to withhold', () => {
  const source = read('components/policy-pages.tsx');
  for (const phrase of [
    'passwords, access tokens, private keys',
    'Testing boundaries',
    'Usually out of scope',
  ])
    assert.ok(source.includes(phrase), phrase);
});
