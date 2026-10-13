/**
 * blob — a wobbly metaball-like closed curve, constantly reshaping.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'blob',
  label: 'Blob',
  description: 'A wobbly closed curve, constantly reshaping.',
  anchors: [
    { size: 20, dots: 36, dotRadius: 0.05 },
    { size: 32, dots: 56, dotRadius: 0.042 },
    { size: 64, dots: 96, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(10, c.dots);
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2;
      const r =
        0.6 +
        0.13 * Math.sin(3 * th + c.t * 1.4) +
        0.08 * Math.sin(2 * th - c.t * 0.9 + 1.3);
      dots.push({
        x: Math.cos(th) * r,
        y: Math.sin(th) * r,
        r: c.dotRadius,
        alpha: 0.9,
      });
    }
    return { dots, lines: [] };
  },
});
