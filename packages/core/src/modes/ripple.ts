/**
 * ripple — concentric dotted rings expanding outward and fading,
 * like rain on a pond.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'ripple',
  label: 'Ripple',
  description: 'Dotted rings expanding outward like rain on a pond.',
  anchors: [
    { size: 20, dots: 60, dotRadius: 0.05 },
    { size: 32, dots: 90, dotRadius: 0.042 },
    { size: 64, dots: 140, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const waves = 4;
    const per = Math.max(8, Math.floor(c.dots / waves));
    for (let w = 0; w < waves; w++) {
      const ph = (c.t * 0.55 + w / waves) % 1;
      const r = 0.12 + ph * 0.72;
      const alpha = (1 - ph) * 0.9;
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2;
        dots.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, r: c.dotRadius, alpha });
      }
    }
    return { dots, lines: [] };
  },
});
