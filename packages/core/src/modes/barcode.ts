/**
 * barcode — columns of dots forming a shifting bar pattern with a
 * bright scan line traveling across.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'barcode',
  label: 'Barcode',
  description: 'A shifting bar pattern with a traveling scan line.',
  anchors: [
    { size: 20, dots: 60, dotRadius: 0.045 },
    { size: 32, dots: 96, dotRadius: 0.038 },
    { size: 64, dots: 150, dotRadius: 0.032 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const cols = 22;
    const rows = 5;
    const shift = (c.t * 0.35) % 1;
    for (let ci = 0; ci < cols; ci++) {
      const bar = hash2(ci + Math.floor(c.t * 0.35 + shift * cols) % 997, 71) > 0.45;
      const x = -0.85 + (ci / (cols - 1)) * 1.7;
      for (let ri = 0; ri < rows; ri++) {
        const y = -0.4 + (ri / (rows - 1)) * 0.8;
        dots.push({
          x, y,
          r: c.dotRadius * (bar ? 1.15 : 0.7),
          alpha: bar ? 0.9 : 0.28,
        });
      }
    }
    // scan line
    const sx = -0.9 + ((c.t * 0.5) % 1) * 1.8;
    for (let ri = 0; ri < rows; ri++) {
      dots.push({
        x: sx, y: -0.4 + (ri / (rows - 1)) * 0.8,
        r: c.dotRadius * 1.3, alpha: 0.95,
      });
    }
    return { dots, lines: [] };
  },
});
