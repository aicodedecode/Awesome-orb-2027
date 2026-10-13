/**
 * undertow — two sparse rings turning against each other, slow and
 * hypnotic.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'undertow',
  label: 'Undertow',
  description: 'Two sparse rings turning against each other.',
  anchors: [
    { size: 20, dots: 24, dotRadius: 0.05 },
    { size: 32, dots: 36, dotRadius: 0.042 },
    { size: 64, dots: 60, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const rings = [
      { r: 0.48, speed: 0.5, count: 0.4 },
      { r: 0.74, speed: -0.34, count: 0.6 },
    ];
    for (const ring of rings) {
      const n = Math.max(4, Math.round(c.dots * ring.count));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + c.t * ring.speed;
        dots.push({
          x: Math.cos(a) * ring.r,
          y: Math.sin(a) * ring.r,
          r: c.dotRadius,
          alpha: 0.8,
        });
      }
    }
    return { dots, lines: [] };
  },
});
