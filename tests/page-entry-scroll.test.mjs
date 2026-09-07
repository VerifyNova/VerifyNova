import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('every page uses the shared top entry behaviour without a route allowlist', () => {
  const source = read('components/page-entry-scroll.tsx');
  assert.ok(read('app/layout.tsx').includes('<PageEntryScroll />'));
  assert.ok(source.includes('usePathname()'));
  assert.ok(source.includes('[pathname]'));
  assert.ok(!source.includes('topEntryPages'));
  assert.ok(source.includes("top: 0, left: 0, behavior: 'instant'"));
});

test('section links are preserved and scheduled scroll work is cleaned up', () => {
  const source = read('components/page-entry-scroll.tsx');
  assert.ok(source.includes('if (!window.location.hash)'));
  assert.ok(source.includes('window.cancelAnimationFrame(frame)'));
  assert.ok(source.includes("window.removeEventListener('pageshow', resetPosition)"));
});
