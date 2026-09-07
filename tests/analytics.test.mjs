import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseAnalyticsScript } from '../lib/site-config.ts';
import { contentSecurityPolicy } from '../lib/security-headers.ts';

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('measurement stays off until it is deliberately configured', () => {
  assert.equal(parseAnalyticsScript(undefined), undefined);
  assert.equal(parseAnalyticsScript(''), undefined);
  const component = read('components/analytics.tsx');
  assert.match(
    component,
    /if \(!analyticsScript \|\| !analyticsSiteId\) return null/,
  );
});

test('the analytics address must be a plain HTTPS script', () => {
  assert.equal(
    parseAnalyticsScript('https://example.test/script.js'),
    'https://example.test/script.js',
  );
  for (const value of [
    'http://example.test/script.js',
    'https://user:pass@example.test/script.js',
    'https://example.test/script.js?id=1',
    'https://example.test/script.js#frag',
  ])
    assert.throws(() => parseAnalyticsScript(value), value);
});

test('the content policy allows the provider only when one is configured', () => {
  const without = contentSecurityPolicy(undefined);
  assert.match(without, /script-src 'self' 'unsafe-inline';/);
  assert.ok(!without.includes('example.test'));
  const with_ = contentSecurityPolicy('https://example.test');
  assert.match(
    with_,
    /script-src 'self' 'unsafe-inline' https:\/\/example\.test;/,
  );
  assert.match(with_, /connect-src 'self' ws: wss: https:\/\/example\.test;/);
  for (const directive of ["object-src 'none'", "frame-ancestors 'none'"])
    assert.ok(with_.includes(directive), directive);
});

test('the privacy notice describes measurement only when it runs', () => {
  const source = read('components/policy-pages.tsx');
  assert.ok(source.includes('analyticsEnabled ?'));
  assert.ok(source.includes('We currently run no analytics at all'));
  assert.ok(source.includes('sets no cookies'));
  assert.ok(source.includes('no session'));
});

test('no advertising or session-recording tags are wired anywhere', () => {
  for (const file of [
    'app/layout.tsx',
    'components/analytics.tsx',
    'proxy.ts',
  ]) {
    const source = read(file).toLowerCase();
    for (const vendor of [
      'googletagmanager',
      'google-analytics',
      'facebook.net',
      'hotjar',
      'clarity.ms',
      'linkedin',
    ])
      assert.ok(!source.includes(vendor), `${file}: ${vendor}`);
  }
});
