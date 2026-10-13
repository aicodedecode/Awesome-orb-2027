/**
 * precession — a single tilted ring whose tilt axis slowly rotates,
 * like a wobbling gyroscope.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'precession',
  label: 'Precession',
  description: 'A tilted ring wobbling like a gyroscope.',
  anchors: [
    { size: 20, dots: 28, dotRadius: 0.05 },
    { size: 32, dots: 44, dotRadius: 0.042 },
    { size: 64, dots: 72, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(8, c.dots);
    const tilt = 0.62;
    const wob = c.t * 0.55; // tilt axis rotation
    const cosW = Math.cos(wob);
    const sinW = Math.sin(wob);
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + c.t * 1.15;
      const px = Math.cos(a) * 0.78;
      const py = Math.sin(a) * 0.78;
      // tilt around X, then rotate the tilted plane around Y
      const y1 = py * cosT;
      const z1 = py * sinT;
      const x = px * cosW + z1 * sinW;
      const z2 = -px * sinW + z1 * cosW;
      const depth = (z2 + 1) / 2;
      dots.push({
        x,
        y: y1,
        r: c.dotRadius * (0.55 + 0.8 * depth),
        alpha: 0.3 + 0.7 * depth,
      });
    }
    return { dots, lines: [] };
  },
});
