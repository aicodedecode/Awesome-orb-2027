/**
 * hourglass — sand piling in the top bulb, streaming through the
 * pinch, piling in the bottom bulb.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'hourglass',
  label: 'Hourglass',
  description: 'Sand streaming through the pinch of an hourglass.',
  anchors: [
    { size: 20, dots: 60, dotRadius: 0.05 },
    { size: 32, dots: 90, dotRadius: 0.04 },
    { size: 64, dots: 150, dotRadius: 0.032 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(16, c.dots);
    const cyc = (c.t * 0.22) % 1; // top empties as bottom fills
    for (let i = 0; i < n; i++) {
      const pick = hash2(i, 131);
      if (pick < 0.42) {
        // top bulb: pile shrinks over the cycle
        const a = hash2(i, 133) * Math.PI * 2;
        const rr = Math.sqrt(hash2(i, 135)) * 0.5;
        const pileH = 0.75 * (1 - cyc);
        dots.push({
          x: Math.cos(a) * rr * (0.4 + 0.6 * (1 - pileH)),
          y: -0.28 - pileH * 0.55 + hash2(i, 137) * pileH * 0.5,
          r: c.dotRadius,
          alpha: 0.85,
        });
      } else if (pick < 0.58) {
        // falling stream through the pinch
        const o = (i / n + c.t * 0.9) % 1;
        dots.push({
          x: (hash2(i, 139) - 0.5) * 0.06,
          y: -0.25 + o * 0.55,
          r: c.dotRadius * 0.9,
          alpha: 0.9,
        });
      } else {
        // bottom bulb: pile grows over the cycle
        const a = hash2(i, 141) * Math.PI * 2;
        const rr = Math.sqrt(hash2(i, 143)) * 0.5;
        const pileH = 0.75 * cyc;
        dots.push({
          x: Math.cos(a) * rr * (0.4 + 0.6 * (1 - pileH)),
          y: 0.28 + pileH * 0.55 - hash2(i, 145) * pileH * 0.5,
          r: c.dotRadius,
          alpha: 0.85,
        });
      }
    }
    return { dots, lines: [] };
  },
});
