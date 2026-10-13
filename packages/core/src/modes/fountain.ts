/**
 * fountain — dots launch from the base and arc outward under gravity.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'fountain',
  label: 'Fountain',
  description: 'Dots arcing outward from the base like a fountain.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 64, dotRadius: 0.042 },
    { size: 64, dots: 104, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(10, c.dots);
    for (let i = 0; i < n; i++) {
      const o = (i / n + c.t * 0.55) % 1;
      const vx = (hash2(i, 41) - 0.5) * 1.1;
      const vy = -(1.5 + hash2(i, 43) * 0.5);
      const x = vx * o * 0.9;
      const y = 0.82 + vy * o + 2.1 * o * o;
      if (Math.abs(x) > 0.98 || Math.abs(y) > 0.98) continue;
      dots.push({
        x,
        y,
        r: c.dotRadius * (1.2 - 0.5 * o),
        alpha: 0.95 * (1 - o * 0.7),
      });
    }
    return { dots, lines: [] };
  },
});
