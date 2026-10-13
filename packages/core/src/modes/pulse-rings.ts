/**
 * pulse-rings — three fixed rings that swell and brighten in sequence,
 * a calm "signal going out" rhythm.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

const RADII = [0.3, 0.55, 0.8];

defineState({
  name: 'pulse-rings',
  label: 'Pulse Rings',
  description: 'Three rings swelling in sequence, like a signal going out.',
  anchors: [
    { size: 20, dots: 48, dotRadius: 0.05 },
    { size: 32, dots: 72, dotRadius: 0.042 },
    { size: 64, dots: 120, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const per = Math.max(8, Math.floor(c.dots / RADII.length));
    RADII.forEach((base, k) => {
      const pulse = 0.5 + 0.5 * Math.sin(c.t * 2.6 - k * 1.35);
      const r = base * (1 + 0.07 * pulse);
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2;
        dots.push({
          x: Math.cos(a) * r,
          y: Math.sin(a) * r,
          r: c.dotRadius * (0.8 + 0.5 * pulse),
          alpha: 0.35 + 0.6 * pulse,
        });
      }
    });
    return { dots, lines: [] };
  },
});
