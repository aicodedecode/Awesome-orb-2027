/**
 * abacus — beads sliding on rods, counting an invisible sum.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, Line, ModeContext } from '../types.js';

defineState({
  name: 'abacus',
  label: 'Abacus',
  description: 'Beads sliding on rods, counting away.',
  anchors: [
    { size: 20, dots: 32, dotRadius: 0.05 },
    { size: 32, dots: 40, dotRadius: 0.044 },
    { size: 64, dots: 48, dotRadius: 0.038 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    const rods = 4;
    const beads = 8;
    for (let r = 0; r < rods; r++) {
      const y = -0.6 + (r / (rods - 1)) * 1.2;
      lines.push({ x1: -0.85, y1: y, x2: 0.85, y2: y, alpha: 0.35 });
      for (let b = 0; b < beads; b++) {
        const home = -0.7 + (b / (beads - 1)) * 1.4;
        // beads drift toward the center bar and back, staggered
        const pull = 0.5 + 0.5 * Math.sin(c.t * 1.1 + r * 1.3 + b * 0.45);
        const jitter = (hash2(b, r) - 0.5) * 0.1;
        dots.push({
          x: home * (1 - 0.35 * pull) + jitter * pull,
          y,
          r: c.dotRadius * 1.15,
          alpha: 0.55 + 0.4 * pull,
        });
      }
    }
    return { dots, lines };
  },
});
