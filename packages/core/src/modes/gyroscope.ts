/**
 * gyroscope — three perpendicular rings spinning on different axes,
 * each ring tilting as it turns.
 */
import { defineState } from '../registry.js';
import type { Dot, ModeContext } from '../types.js';

defineState({
  name: 'gyroscope',
  label: 'Gyroscope',
  description: 'Three perpendicular rings spinning on different axes.',
  anchors: [
    { size: 20, dots: 36, dotRadius: 0.05 },
    { size: 32, dots: 54, dotRadius: 0.042 },
    { size: 64, dots: 96, dotRadius: 0.036 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    const n = Math.max(6, c.dots);
    const per = Math.max(2, Math.floor(n / 3));
    const rings: Array<(a: number) => [number, number, number]> = [
      // XY plane, spinning fast
      (a) => [Math.cos(a), Math.sin(a), 0],
      // YZ plane, whole ring yawing
      (a) => {
        const yaw = c.t * 0.5;
        const y = Math.cos(a + c.t * 0.9) * 0.8;
        const z = Math.sin(a + c.t * 0.9) * 0.8;
        return [z * Math.sin(yaw), y, z * Math.cos(yaw)];
      },
      // XZ plane tilted, pitching
      (a) => {
        const pitch = 0.6 + 0.25 * Math.sin(c.t * 0.6);
        const x = Math.cos(a - c.t * 1.2) * 0.8;
        const z = Math.sin(a - c.t * 1.2) * 0.8;
        return [x, z * Math.sin(pitch), z * Math.cos(pitch)];
      },
    ];
    rings.forEach((ring, ri) => {
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2 + ri * 0.7;
        const [x, y, z] = ring(a);
        const depth = (z + 1) / 2;
        dots.push({
          x: x * 0.95,
          y: y * 0.95,
          r: c.dotRadius * (0.55 + 0.8 * depth),
          alpha: 0.3 + 0.7 * depth,
        });
      }
    });
    return { dots, lines: [] };
  },
});
