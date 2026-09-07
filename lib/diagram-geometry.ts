type Box = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};
type Matrix = { a: number; b: number; c: number; d: number; e: number; f: number };

// Convert viewport measurements into the SVG's own drawing coordinates.
// Its origin can differ from the containing section after layout or padding changes.
export function ecosystemConnector(core: Box, node: Box, bottom: boolean, inverse: Matrix) {
  const point = (x: number, y: number) => ({
    x: inverse.a * x + inverse.c * y + inverse.e,
    y: inverse.b * x + inverse.d * y + inverse.f,
  });
  const left = node.left < core.left;
  const start = point(
    bottom ? node.left + node.width / 2 : left ? node.right - 2 : node.left + 2,
    bottom ? node.top + 2 : node.top + node.height / 2,
  );
  const end = point(
    bottom ? core.left + core.width / 2 : left ? core.left + 2 : core.right - 2,
    bottom ? core.bottom - 2 : core.top + core.height / 2,
  );
  if (bottom) return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  const mid = (start.x + end.x) / 2;
  return `M ${start.x} ${start.y} C ${mid} ${start.y}, ${mid} ${end.y}, ${end.x} ${end.y}`;
}
