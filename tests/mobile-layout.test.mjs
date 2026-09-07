import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const css = read('app/mobile.css');

test('mobile refinements load after individual page styles', () => {
  const layout = read('app/layout.tsx');
  assert.ok(layout.indexOf("import './mobile.css'") > layout.indexOf("import './trust-page.css'"));
  for (const breakpoint of [900, 600, 360]) {
    assert.ok(css.includes(`@media (max-width: ${breakpoint}px)`));
  }
});

test('mobile navigation uses an unblurred backdrop and shadow instead of a border', () => {
  assert.match(css, /body:has\(\.mobile-panel\)[^{]+\{[^}]*backdrop-filter: none/s);
  assert.match(css, /\.mobile-panel\[data-slot='sheet-content'\]\s*\{[^}]*border: 0;[^}]*box-shadow:/s);
  assert.ok(css.includes('env(safe-area-inset-bottom)'));
  assert.ok(css.includes('overscroll-behavior: contain'));
  assert.ok(css.includes("[data-slot='sheet-close']"));
  assert.ok(read('components/site-shell.tsx').includes('onClick={() => setOpen(false)}'));
});

test('small-screen layouts cover diagrams, policies, contact, cards and footer', () => {
  for (const selector of ['.opportunity-network', '.policy-body p', '.contact-panel',
    '.home-blockchain-layout', '.company-mission h2', '.solution-feature',
    '.trust-minimal-path', '.product-relationship article', '.footer-top nav']) {
    assert.ok(css.includes(selector), selector);
  }
  assert.ok(css.includes('grid-row: auto !important'));
  assert.ok(css.includes('white-space: normal'));
  assert.ok(!css.includes('overflow-x: hidden'));
});
