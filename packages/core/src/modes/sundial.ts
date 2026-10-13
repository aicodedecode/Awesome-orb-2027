/**
 * sundial — hour dots around a dial with a shadow sweeping like time.
 */
import { defineState } from '../registry.js';
import type { Dot, Line, ModeContext } from '../types.js';

defineState({
  name: 'sundial',
  label: 'Sundial',
  description: 'Hour dots with a shadow sweeping like time.',
  anchors: [
    { size: 20, dots: 16, dotRadius: 0.05 },
    { size: 32, dots: 20, dotRadius: 0.044 },
    { size: 64, dots: 28, dotRadius: 0.038 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    for (let h = 0; h < 12; h++) {
      const a = (h / 12) * Math.PI * 2 - Math.PI / 2;
      dots.push({
        x: Math.cos(a) * 0.74,
        y: Math.sin(a) * 0.74,
        r: c.dotRadius * (h % 3 === 0 ? 1.5 : 0.9),
        alpha: h % 3 === 0 ? 0.95 : 0.55,
      });
    }
    // gnomon + shadow
    dots.push({ x: 0, y: 0, r: c.dotRadius * 1.8, alpha: 0.95 });
    const sa = c.t * 0.45;
    lines.push({
      x1: 0, y1: 0,
      x2: Math.cos(sa) * 0.68, y2: Math.sin(sa) * 0.68,
      alpha: 0.7,
    });
    return { dots, lines };
  },
});
