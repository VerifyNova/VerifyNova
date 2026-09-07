import test from 'node:test';
import assert from 'node:assert/strict';
import { ecosystemConnector } from '../lib/diagram-geometry.ts';

const box = (left, top, width, height) => ({
  left, top, width, height, right: left + width, bottom: top + height,
});
const core = box(500, 300, 300, 300);
const inverse = { a: 1, b: 0, c: 0, d: 1, e: -100, f: -250 };

test('side connectors use the SVG origin and terminate inside card and circle centres', () => {
  assert.equal(ecosystemConnector(core, box(100, 300, 200, 100), false, inverse),
    'M 198 100 C 300 100, 300 200, 402 200');
  assert.equal(ecosystemConnector(core, box(1000, 500, 200, 100), false, inverse),
    'M 902 300 C 800 300, 800 200, 698 200');
});
test('Digital systems has an unbroken connection to the bottom of the circle', () => {
  assert.equal(ecosystemConnector(core, box(450, 700, 400, 100), true, inverse),
    'M 550 452 L 550 348');
});
test('scaled SVG drawing coordinates stay aligned', () => {
  assert.equal(ecosystemConnector(core, box(100, 300, 200, 100), false,
    { a: 0.5, b: 0, c: 0, d: 0.5, e: -50, f: -125 }),
    'M 99 50 C 150 50, 150 100, 201 100');
});
test('changing the drawing origin after spacing changes updates both endpoints', () => {
  assert.equal(ecosystemConnector(core, box(100, 300, 200, 100), false,
    { ...inverse, f: -278 }),
    'M 198 72 C 300 72, 300 172, 402 172');
});
