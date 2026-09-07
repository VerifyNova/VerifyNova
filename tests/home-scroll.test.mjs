import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('app/globals.css');

test('homepage does not mount a custom scrolling controller', () => {
  assert.doesNotMatch(
    read('app/page.tsx'),
    /HomeScrollGuide|home-scroll-guide|HomeWheelGlide|home-wheel-glide/,
  );
  assert.equal(
    existsSync(new URL('../components/home-scroll-guide.tsx', import.meta.url)),
    false,
  );
});

test('homepage content leaves scrolling and input handling to the browser', () => {
  for (const file of [
    'app/page.tsx',
    'components/home-sections.tsx',
    'components/ecosystem-diagram.tsx',
    'components/content-blocks.tsx',
    'components/site-shell.tsx',
  ]) {
    const source = read(file);
    assert.doesNotMatch(
      source,
      /addEventListener\s*\(\s*['"](?:wheel|keydown|touchmove)['"]/,
      file,
    );
    assert.doesNotMatch(source, /window\.(?:scrollTo|scrollBy)\s*\(/, file);
    assert.doesNotMatch(source, /\bon(?:Wheel|TouchMove|KeyDown)\s*=/, file);
  }
});

test('full-screen layout remains content-sized without CSS scroll snapping', () => {
  assert.doesNotMatch(css, /scroll-snap-(?:type|align|stop)\s*:/);
  assert.match(css, /\.foundation-screen\s*\{[^}]*min-height:\s*100svh/s);
  assert.match(css, /min-height:\s*calc\(100svh - 97px\)/);
  assert.match(css, /min-height:\s*calc\(100svh - 81px\)/);
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*html\s*\{\s*scroll-behavior:\s*auto/s,
  );
});
