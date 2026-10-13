/**
 * shutter — six aperture blades rotating open and closed.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'shutter',
  label: 'Shutter',
  description: 'Six aperture blades breathing open and closed.',
  anchors: [
    { size: 20, dots: 36, dotRadius: 0.05 },
    { size: 32, dots: 54, dotRadius: 0.042 },
    { size: 64, dots: 90, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const blades = 6;
    const per = Math.max(3, Math.floor(c.dots / blades));
    const open = 0.5 + 0.5 * Math.sin(c.t * 1.3);
    const twist = 0.4 + open * 0.9;
    for (let b = 0; b < blades; b++) {
      const base = (b / blades) * Math.PI * 2 + c.t * 0.25;
      for (let i = 0; i < per; i++) {
        const u = i / (per - 1);
        const r = 0.22 + u * 0.6;
        const a = base + twist * u;
        dots.push({
          x: Math.cos(a) * r,
          y: Math.sin(a) * r,
          r: c.dotRadius,
          alpha: 0.35 + 0.6 * u,
        });
      }
    }
    return { dots, lines: [] };
  },
});
