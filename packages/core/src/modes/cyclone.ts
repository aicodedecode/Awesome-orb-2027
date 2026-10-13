/**
 * cyclone — a single spiral arm with a vertical bob, like a storm
 * seen from the side.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'cyclone',
  label: 'Cyclone',
  description: 'A spiral arm bobbing like a storm.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 60, dotRadius: 0.042 },
    { size: 64, dots: 100, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(10, c.dots);
    for (let i = 0; i < n; i++) {
      const s = i / (n - 1);
      const ang = s * 5 * Math.PI + c.t * 2.2;
      const r = 0.12 + 0.66 * s;
      dots.push({
        x: Math.cos(ang) * r,
        y: Math.sin(ang) * r + Math.sin(c.t * 3 + s * 6) * 0.08,
        r: c.dotRadius * (1.2 - 0.5 * s),
        alpha: 0.9 - 0.35 * s,
      });
    }
    return { dots, lines: [] };
  },
});
