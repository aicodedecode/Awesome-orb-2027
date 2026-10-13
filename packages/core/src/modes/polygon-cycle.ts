/**
 * polygon-cycle — dots riding an outline that morphs
 * circle → triangle → square → pentagon → hexagon → circle.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

function polyRadius(theta: number, sides: number, R: number): number {
  const sector = (Math.PI * 2) / sides;
  const local = ((theta % sector) + sector) % sector;
  return (R * Math.cos(Math.PI / sides)) / Math.cos(local - Math.PI / sides);
}

defineState({
  name: 'polygon-cycle',
  label: 'Polygon Cycle',
  description: 'An outline morphing through polygons back to a circle.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 64, dotRadius: 0.042 },
    { size: 64, dots: 110, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(10, c.dots);
    // every 2.2s advance one polygon; blend across 0.6s
    const cyc = (c.t / 2.2) % 5; // 0..4 -> 3,4,5,6 sides, then circle
    const idx = Math.floor(cyc);
    const u = Math.min(1, Math.max(0, (cyc - idx - 0.72) / 0.28));
    const sidesA = [3, 4, 5, 6, 99][idx];
    const sidesB = [3, 4, 5, 6, 99][(idx + 1) % 5];
    const R = 0.74;
    const rot = c.t * 0.3; // the whole outline keeps turning, even between morphs
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2;
      const rA = sidesA >= 99 ? R : polyRadius(th, sidesA, R);
      const rB = sidesB >= 99 ? R : polyRadius(th, sidesB, R);
      const r = rA + (rB - rA) * (u * u * (3 - 2 * u));
      const a = th + rot;
      dots.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, r: c.dotRadius, alpha: 0.9 });
    }
    return { dots, lines: [] };
  },
});
