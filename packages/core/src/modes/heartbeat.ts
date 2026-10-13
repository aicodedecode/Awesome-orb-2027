/**
 * heartbeat — a ring pulsing with a double-thump lub-dub rhythm.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'heartbeat',
  label: 'Heartbeat',
  description: 'A ring pulsing with a lub-dub rhythm.',
  anchors: [
    { size: 20, dots: 36, dotRadius: 0.05 },
    { size: 32, dots: 56, dotRadius: 0.042 },
    { size: 64, dots: 96, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(10, c.dots);
    const ph = (c.t * 1.05) % 1;
    const lub = Math.exp(-Math.pow(ph - 0.14, 2) / 0.004);
    const dub = 0.72 * Math.exp(-Math.pow(ph - 0.34, 2) / 0.006);
    const beat = Math.min(1.4, lub + dub);
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2;
      const r = 0.68 * (1 + 0.14 * beat);
      dots.push({
        x: Math.cos(th) * r,
        y: Math.sin(th) * r,
        r: c.dotRadius * (0.9 + 0.8 * beat),
        alpha: 0.45 + 0.5 * Math.min(1, beat),
      });
    }
    return { dots, lines: [] };
  },
});
