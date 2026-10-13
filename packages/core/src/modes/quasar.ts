/**
 * quasar — a blazing core with a fast accretion disc and faint
 * polar jets.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, Line, ModeContext } from '../types.js';

defineState({
  name: 'quasar',
  label: 'Quasar',
  description: 'A blazing core with accretion disc and polar jets.',
  anchors: [
    { size: 20, dots: 48, dotRadius: 0.05 },
    { size: 32, dots: 76, dotRadius: 0.042 },
    { size: 64, dots: 128, dotRadius: 0.034 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    const flare = 0.5 + 0.5 * Math.sin(c.t * 5.1) * Math.sin(c.t * 1.7);
    dots.push({ x: 0, y: 0, r: c.dotRadius * (2.4 + flare), alpha: 0.95 });
    // accretion disc
    const n = Math.max(12, c.dots - 8);
    for (let i = 0; i < n; i++) {
      const r = 0.3 + hash2(i, 121) * 0.42;
      const a = hash2(i, 123) * Math.PI * 2 + c.t * (2.6 / (0.4 + r));
      const squash = 0.42;
      dots.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r * squash,
        r: c.dotRadius * (0.8 + 0.5 * (1 - r)),
        alpha: 0.85,
      });
    }
    // polar jets
    const jet = 0.5 + 0.5 * Math.sin(c.t * 7);
    lines.push({ x1: 0, y1: 0.18, x2: 0, y2: 0.92, alpha: 0.2 + 0.35 * jet });
    lines.push({ x1: 0, y1: -0.18, x2: 0, y2: -0.92, alpha: 0.2 + 0.35 * (1 - jet) });
    return { dots, lines };
  },
});
