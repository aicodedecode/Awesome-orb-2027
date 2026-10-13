/**
 * tide — two horizontal sine bands rolling past each other, amplitude
 * slowly breathing.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'tide',
  label: 'Tide',
  description: 'Two sine bands rolling past each other.',
  anchors: [
    { size: 20, dots: 48, dotRadius: 0.05 },
    { size: 32, dots: 72, dotRadius: 0.042 },
    { size: 64, dots: 120, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const per = Math.max(8, Math.floor(c.dots / 2));
    const swell = 0.7 + 0.3 * Math.sin(c.t * 0.8);
    for (let i = 0; i < per; i++) {
      const x = -0.88 + (i / (per - 1)) * 1.76;
      dots.push({
        x,
        y: Math.sin(x * 4 + c.t * 2.6) * 0.2 * swell,
        r: c.dotRadius,
        alpha: 0.9,
      });
      dots.push({
        x,
        y: Math.sin(x * 4 - c.t * 1.9 + 2.4) * 0.2 * swell - 0.32,
        r: c.dotRadius * 0.8,
        alpha: 0.45,
      });
    }
    return { dots, lines: [] };
  },
});
