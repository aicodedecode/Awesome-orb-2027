/**
 * compass — a four-point star with a slowly turning needle.
 */
import { defineState } from '../registry.js';
import type { Dot, Line, ModeContext } from '../types.js';

defineState({
  name: 'compass',
  label: 'Compass',
  description: 'A four-point star with a turning needle.',
  anchors: [
    { size: 20, dots: 24, dotRadius: 0.05 },
    { size: 32, dots: 36, dotRadius: 0.042 },
    { size: 64, dots: 60, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    // outer ring
    const ring = 20;
    for (let i = 0; i < ring; i++) {
      const a = (i / ring) * Math.PI * 2;
      dots.push({ x: Math.cos(a) * 0.8, y: Math.sin(a) * 0.8, r: c.dotRadius * 0.8, alpha: 0.5 });
    }
    // four star points
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 2;
      dots.push({ x: Math.cos(a) * 0.58, y: Math.sin(a) * 0.58, r: c.dotRadius * 1.6, alpha: 0.95 });
    }
    // needle
    const na = c.t * 0.7;
    lines.push({
      x1: -Math.cos(na) * 0.42, y1: -Math.sin(na) * 0.42,
      x2: Math.cos(na) * 0.42, y2: Math.sin(na) * 0.42,
      alpha: 0.85,
    });
    dots.push({ x: 0, y: 0, r: c.dotRadius * 1.4, alpha: 0.95 });
    return { dots, lines };
  },
});
