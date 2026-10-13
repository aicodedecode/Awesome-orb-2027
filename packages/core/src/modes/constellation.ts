/**
 * constellation — fixed stars that twinkle, with faint lines wiring
 * near neighbors together.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
import type { Dot, Line, ModeContext } from '../types.js';

const STAR_COUNT = 26;
// Stable layout, computed once: positions in the unit disc.
const STARS: Array<{ x: number; y: number }> = [];
for (let i = 0; i < STAR_COUNT; i++) {
  const a = hash2(i, 5) * Math.PI * 2;
  const r = 0.15 + hash2(i, 9) * 0.7;
  STARS.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
}
const LINKS: Array<[number, number]> = [];
for (let i = 0; i < STARS.length; i++) {
  for (let j = i + 1; j < STARS.length; j++) {
    const dx = STARS[i].x - STARS[j].x;
    const dy = STARS[i].y - STARS[j].y;
    if (dx * dx + dy * dy < 0.16) LINKS.push([i, j]);
  }
}

defineState({
  name: 'constellation',
  label: 'Constellation',
  description: 'Twinkling stars wiring themselves together.',
  anchors: [
    { size: 20, dots: 26, dotRadius: 0.05 },
    { size: 32, dots: 26, dotRadius: 0.044 },
    { size: 64, dots: 26, dotRadius: 0.038 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const lines: Line[] = [];
    STARS.forEach((s, i) => {
      const tw = 0.45 + 0.55 * Math.abs(Math.sin(c.t * 1.8 + i * 1.7));
      dots.push({ x: s.x, y: s.y, r: c.dotRadius * (0.9 + 0.5 * tw), alpha: tw });
    });
    for (const [i, j] of LINKS) {
      lines.push({
        x1: STARS[i].x, y1: STARS[i].y,
        x2: STARS[j].x, y2: STARS[j].y,
        alpha: 0.22,
      });
    }
    return { dots, lines };
  },
});
