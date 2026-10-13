/**
 * waterfall — three columns of dots pouring down and splashing out
 * at the bottom.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'waterfall',
  label: 'Waterfall',
  description: 'Columns pouring down, splashing outward at the base.',
  anchors: [
    { size: 20, dots: 42, dotRadius: 0.05 },
    { size: 32, dots: 66, dotRadius: 0.042 },
    { size: 64, dots: 108, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const cols = [-0.5, 0, 0.5];
    const per = Math.max(6, Math.floor(c.dots / cols.length));
    cols.forEach((x0, ci) => {
      for (let i = 0; i < per; i++) {
        const o = (i / per + c.t * 0.55 + ci * 0.23) % 1;
        if (o < 0.82) {
          // falling
          dots.push({
            x: x0 + Math.sin(c.t * 3 + i) * 0.02,
            y: 0.9 - o * 1.95,
            r: c.dotRadius,
            alpha: 0.9,
          });
        } else {
          // splash: scatter outward along the base
          const s = (o - 0.82) / 0.18;
          const dir = i % 2 === 0 ? 1 : -1;
          dots.push({
            x: x0 + dir * s * 0.3,
            y: -0.72 - s * 0.12,
            r: c.dotRadius * (1 - s * 0.5),
            alpha: 0.7 * (1 - s),
          });
        }
      }
    });
    return { dots, lines: [] };
  },
});
