/**
 * metronome — a swinging arm with tick dots flashing at each extreme.
 */
import { defineState } from '../registry.js';
import type { Dot, Line, ModeContext } from '../types.js';

defineState({
  name: 'metronome',
  label: 'Metronome',
  description: 'A swinging arm ticking at each extreme.',
  anchors: [
    { size: 20, dots: 10, dotRadius: 0.05 },
    { size: 32, dots: 12, dotRadius: 0.046 },
    { size: 64, dots: 16, dotRadius: 0.04 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    const L = 0.78;
    const ang = 0.6 * Math.sin(c.t * 2.6);
    const bx = Math.sin(ang) * L;
    const by = -Math.cos(ang) * L + 0.1;
    lines.push({ x1: 0, y1: 0.1, x2: bx, y2: by, alpha: 0.6 });
    dots.push({ x: 0, y: 0.1, r: c.dotRadius * 1.4, alpha: 0.9 });
    dots.push({ x: bx, y: by, r: c.dotRadius * 2, alpha: 0.95 });
    // tick flashes at extremes
    const swing = Math.sin(c.t * 2.6);
    const left = Math.max(0, -swing);
    const right = Math.max(0, swing);
    dots.push({ x: -0.62, y: -0.5, r: c.dotRadius * (1 + left), alpha: 0.25 + 0.7 * left });
    dots.push({ x: 0.62, y: -0.5, r: c.dotRadius * (1 + right), alpha: 0.25 + 0.7 * right });
    return { dots, lines };
  },
});
