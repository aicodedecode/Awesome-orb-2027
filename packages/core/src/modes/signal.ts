/**
 * signal — a broadcast ping: rings radiating from a pulsing center
 * with one dot in close orbit.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'signal',
  label: 'Signal',
  description: 'Broadcast pings radiating from a pulsing center.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 60, dotRadius: 0.042 },
    { size: 64, dots: 96, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const center = 0.5 + 0.5 * Math.sin(c.t * 3.2);
    dots.push({ x: 0, y: 0, r: c.dotRadius * (1.8 + center), alpha: 0.95 });
    const waves = 2;
    const per = Math.max(8, Math.floor(c.dots / waves) - 2);
    for (let w = 0; w < waves; w++) {
      const ph = (c.t * 0.7 + w / waves) % 1;
      const r = 0.18 + ph * 0.62;
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2;
        dots.push({
          x: Math.cos(a) * r,
          y: Math.sin(a) * r,
          r: c.dotRadius * 0.85,
          alpha: 0.85 * (1 - ph),
        });
      }
    }
    const oa = c.t * 2.4;
    dots.push({
      x: Math.cos(oa) * 0.34,
      y: Math.sin(oa) * 0.34,
      r: c.dotRadius * 1.3,
      alpha: 0.9,
    });
    return { dots, lines: [] };
  },
});
