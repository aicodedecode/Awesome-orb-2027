/**
 * hive — a hexagonal lattice where cells light up in a wandering pulse.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'hive',
  label: 'Hive',
  description: 'A hex lattice with a wandering pulse of light.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 60, dotRadius: 0.042 },
    { size: 64, dots: 100, dotRadius: 0.034 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const s = 0.24; // hex spacing
    let id = 0;
    for (let row = -3; row <= 3; row++) {
      for (let col = -3; col <= 3; col++) {
        const x = col * s * 1.5 + (row % 2 === 0 ? 0 : s * 0.75);
        const y = row * s * 0.87;
        if (x * x + y * y > 0.72) {
          id++;
          continue;
        }
        const glow = Math.max(0, Math.sin(c.t * 2.2 + hash2(id, 3) * 6.28));
        dots.push({
          x, y,
          r: c.dotRadius * (0.85 + 0.6 * glow),
          alpha: 0.3 + 0.7 * glow,
        });
        id++;
      }
    }
    return { dots, lines: [] };
  },
});
