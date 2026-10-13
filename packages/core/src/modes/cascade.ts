/**
 * cascade — five staggered streams of dots pouring downward.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'cascade',
  label: 'Cascade',
  description: 'Staggered streams pouring downward.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 60, dotRadius: 0.042 },
    { size: 64, dots: 100, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const streams = 5;
    const per = Math.max(4, Math.floor(c.dots / streams));
    for (let s = 0; s < streams; s++) {
      const x0 = -0.64 + (s / (streams - 1)) * 1.28;
      for (let i = 0; i < per; i++) {
        const o = (i / per + c.t * 0.45 + s * 0.17) % 1;
        const y = 0.88 - o * 1.76;
        dots.push({
          x: x0 + Math.sin(c.t * 2 + i * 1.3 + s) * 0.025,
          y,
          r: c.dotRadius,
          alpha: 0.9 - o * 0.55,
        });
      }
    }
    return { dots, lines: [] };
  },
});
