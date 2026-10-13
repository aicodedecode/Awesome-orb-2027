/**
 * throb — a filled disc of rings swelling with a slow deep pulse.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'throb',
  label: 'Throb',
  description: 'A disc of rings swelling with a deep pulse.',
  anchors: [
    { size: 20, dots: 48, dotRadius: 0.05 },
    { size: 32, dots: 80, dotRadius: 0.042 },
    { size: 64, dots: 130, dotRadius: 0.034 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const rings = 5;
    const per = Math.max(6, Math.floor(c.dots / rings));
    const pulse = 0.5 + 0.5 * Math.sin(c.t * 2.1);
    for (let k = 0; k < rings; k++) {
      const base = 0.16 + (k / (rings - 1)) * 0.6;
      const r = base * (1 + 0.1 * pulse * (1 - k / rings));
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2 + k * 0.4;
        dots.push({
          x: Math.cos(a) * r,
          y: Math.sin(a) * r,
          r: c.dotRadius * (0.8 + 0.5 * pulse),
          alpha: 0.35 + 0.55 * pulse * (1 - k / (rings + 1)),
        });
      }
    }
    return { dots, lines: [] };
  },
});
