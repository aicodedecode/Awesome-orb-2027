/**
 * satellites — dots riding three concentric circular orbits at different
 * radii and speeds, like moons around a planet.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

const ORBITS = [
  { r: 0.32, speed: 1.5, phase: 0 },
  { r: 0.54, speed: -1.0, phase: 2.2 },
  { r: 0.76, speed: 0.66, phase: 4.1 },
];

defineState({
  name: 'satellites',
  label: 'Satellites',
  description: 'Moons circling on three concentric orbits.',
  anchors: [
    { size: 20, dots: 24, dotRadius: 0.05 },
    { size: 32, dots: 40, dotRadius: 0.042 },
    { size: 64, dots: 72, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const per = Math.max(3, Math.floor(c.dots / ORBITS.length));
    for (const o of ORBITS) {
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2 + o.phase + c.t * o.speed;
        dots.push({
          x: Math.cos(a) * o.r,
          y: Math.sin(a) * o.r,
          r: c.dotRadius,
          alpha: 0.85,
        });
      }
    }
    return { dots, lines: [] };
  },
});
