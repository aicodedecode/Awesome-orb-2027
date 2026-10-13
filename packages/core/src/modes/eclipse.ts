/**
 * eclipse — a corona ring with an occluder drifting across, dimming
 * dots as it covers them (diamond-ring moment at the edge).
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'eclipse',
  label: 'Eclipse',
  description: 'A corona ring dimmed by a drifting occluder.',
  anchors: [
    { size: 20, dots: 40, dotRadius: 0.05 },
    { size: 32, dots: 64, dotRadius: 0.042 },
    { size: 64, dots: 104, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(12, c.dots);
    const ox = Math.sin(c.t * 0.5) * 1.15; // occluder center x
    const OR = 0.52; // occluder radius
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = Math.cos(a) * 0.68;
      const y = Math.sin(a) * 0.68;
      const dist = Math.hypot(x - ox, y);
      // smooth shadow edge
      const lit = Math.min(1, Math.max(0.06, (dist - OR + 0.18) / 0.36));
      dots.push({
        x, y,
        r: c.dotRadius * (0.8 + 0.9 * lit),
        alpha: 0.12 + 0.83 * lit,
      });
    }
    return { dots, lines: [] };
  },
});
