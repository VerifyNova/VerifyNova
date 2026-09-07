import assert from 'node:assert/strict';
import { publicRoutes, products, solutions } from '../lib/content.ts';
const base = process.env.TEST_URL || 'http://localhost:3015';
const pages = new Map();
for (const route of publicRoutes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${route}: one main heading`,
  );
  assert.ok(html.includes('id="main-content"'), `${route}: skip link target`);
  assert.ok(
    !html.includes('Your site is taking shape'),
    `${route}: no starter content`,
  );
  assert.ok(
    response.headers.get('x-content-type-options') === 'nosniff',
    `${route}: security headers`,
  );
  pages.set(route, html);
}
for (const slug of [
  'infrastructure',
  'products',
  'solutions',
  'trust',
  'company',
]) {
  const html = pages.get(`/${slug}`);
  assert.ok(
    html.includes(`inner-page inner-${slug}`),
    `${slug}: inner-page layout`,
  );
  assert.ok(
    html.includes(`editorial-hero-${slug}`),
    `${slug}: page-specific hero`,
  );
}
assert.ok(
  pages.get('/contact').includes('inner-page inner-contact'),
  'contact: inner-page layout',
);
for (const product of products)
  assert.ok(
    pages.get('/products').includes(`product-story-${product.slug}`),
    `${product.name}: portfolio story`,
  );
for (const solution of solutions)
  assert.ok(
    pages.get('/solutions').includes(`id="${solution.id}"`),
    `${solution.id}: solution retained`,
  );
for (const id of ['privacy', 'standards', 'security'])
  assert.ok(
    pages.get('/trust').includes(`id="${id}"`),
    `${id}: trust deep link retained`,
  );
for (const [route, html] of pages) {
  const approvedPlaceholders = new Set([
    ...products.map((product) => `product:${product.slug}`),
    ...(route === '/solutions' ? solutions.slice(1).map((solution) => `solution:${solution.id}`) : []),
  ]);
  for (const [tag, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)) {
    if (href === '#') {
      const marker = tag.match(/\bdata-placeholder="([^"]+)"/)?.[1];
      assert.ok(approvedPlaceholders.has(marker), `${route}: unapproved placeholder link`);
      continue;
    }
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const target = new URL(href.replaceAll('&amp;', '&'), new URL(route, base));
    assert.ok(
      pages.has(target.pathname),
      `${route}: missing destination ${target.pathname}`,
    );
    if (target.hash)
      assert.ok(
        pages.get(target.pathname).includes(`id="${target.hash.slice(1)}"`),
        `${route}: missing anchor ${target.hash}`,
      );
  }
}
for (const asset of ['/verifynova.svg', '/africa.svg'])
  assert.equal((await fetch(new URL(asset, base))).status, 200);
assert.equal((await fetch(new URL('/not-a-real-page', base))).status, 404);
assert.equal(
  (await fetch(new URL('/products/not-a-product', base))).status,
  404,
);
console.log(
  `Passed: ${pages.size} pages, internal links and anchors, assets, security headers and 404 handling.`,
);
