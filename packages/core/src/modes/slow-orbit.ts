/**
 * slow-orbit — a sparse ring turning very slowly with one brighter
 * traveler dot.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'slow-orbit',
  label: 'Slow Orbit',
  description: 'A sparse ring turning very slowly.',
  anchors: [
    { size: 20, dots: 12, dotRadius: 0.05 },
    { size: 32, dots: 14, dotRadius: 0.044 },
    { size: 64, dots: 18, dotRadius: 0.038 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(6, Math.min(20, c.dots));
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + c.t * 0.28;
      const traveler = i === 0;
      dots.push({
        x: Math.cos(a) * 0.72,
        y: Math.sin(a) * 0.72,
        r: c.dotRadius * (traveler ? 2 : 1),
        alpha: traveler ? 0.95 : 0.55,
      });
    }
    return { dots, lines: [] };
  },
});
