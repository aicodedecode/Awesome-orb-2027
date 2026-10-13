/**
 * petal — a five-petal rose curve slowly turning.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'petal',
  label: 'Petal',
  description: 'A five-petal rose curve slowly turning.',
  anchors: [
    { size: 20, dots: 48, dotRadius: 0.05 },
    { size: 32, dots: 72, dotRadius: 0.042 },
    { size: 64, dots: 120, dotRadius: 0.034 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(12, c.dots);
    const rot = c.t * 0.35;
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2;
      const r = 0.8 * Math.abs(Math.cos(2.5 * th));
      const a = th + rot;
      dots.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        r: c.dotRadius * (0.7 + 0.6 * (r / 0.8)),
        alpha: 0.35 + 0.6 * (r / 0.8),
      });
    }
    return { dots, lines: [] };
  },
});
