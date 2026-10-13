/**
 * radar — a rotating sweep with blips that flash as the beam passes.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, Line, ModeContext } from '../types.js';

const BLIPS: Array<{ x: number; y: number; ang: number }> = [];
for (let i = 0; i < 6; i++) {
  const a = hash2(i, 61) * Math.PI * 2;
  const r = 0.25 + hash2(i, 63) * 0.55;
  BLIPS.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, ang: a });
}

defineState({
  name: 'radar',
  label: 'Radar',
  description: 'A rotating sweep flashing blips as it passes.',
  anchors: [
    { size: 20, dots: 30, dotRadius: 0.05 },
    { size: 32, dots: 44, dotRadius: 0.042 },
    { size: 64, dots: 72, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    // static range rings
    for (const rr of [0.3, 0.55, 0.8]) {
      const n = 28;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        dots.push({ x: Math.cos(a) * rr, y: Math.sin(a) * rr, r: c.dotRadius * 0.7, alpha: 0.3 });
      }
    }
    const sweep = c.t * 2.1;
    lines.push({
      x1: 0, y1: 0,
      x2: Math.cos(sweep) * 0.85, y2: Math.sin(sweep) * 0.85,
      alpha: 0.85,
    });
    for (const b of BLIPS) {
      let d = Math.abs(sweep - b.ang) % (Math.PI * 2);
      if (d > Math.PI) d = Math.PI * 2 - d;
      const flash = Math.exp(-d * d * 6);
      dots.push({
        x: b.x, y: b.y,
        r: c.dotRadius * (1 + 1.2 * flash),
        alpha: 0.2 + 0.8 * flash,
      });
    }
    return { dots, lines };
  },
});
