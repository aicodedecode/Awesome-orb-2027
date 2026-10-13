/**
 * scatter-gather — dots drift between a scattered cloud and a crisp
 * circle, endlessly assembling and dissolving.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'scatter-gather',
  label: 'Scatter Gather',
  description: 'A cloud endlessly assembling into a circle and dissolving.',
  anchors: [
    { size: 20, dots: 36, dotRadius: 0.05 },
    { size: 32, dots: 56, dotRadius: 0.042 },
    { size: 64, dots: 96, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(10, c.dots);
    const ph = (c.t * 0.4) % 1;
    const tri = ph < 0.5 ? ph * 2 : (1 - ph) * 2;
    const u = tri * tri * (3 - 2 * tri);
    for (let i = 0; i < n; i++) {
      const a = hash2(i, 31) * Math.PI * 2;
      const rr = Math.sqrt(hash2(i, 37)) * 0.85;
      const sx = Math.cos(a) * rr;
      const sy = Math.sin(a) * rr;
      const ca = (i / n) * Math.PI * 2;
      const gx = Math.cos(ca) * 0.72;
      const gy = Math.sin(ca) * 0.72;
      dots.push({
        x: sx + (gx - sx) * u,
        y: sy + (gy - sy) * u,
        r: c.dotRadius,
        alpha: 0.85,
      });
    }
    return { dots, lines: [] };
  },
});
