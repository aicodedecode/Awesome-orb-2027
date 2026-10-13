/**
 * working — particles circling on three tilted orbit rings.
 * Reads as "busy doing something" without implying direction.
 */
import { defineState } from '../registry.js';
const RINGS = [
    { tilt: 0.5, speed: 1.7, phase: 0 },
    { tilt: -0.38, speed: -1.15, phase: 2.1 },
    { tilt: 1.02, speed: 0.85, phase: 4.4 },
];
defineState({
    name: 'working',
    label: 'Working',
    description: 'Particles circling on tilted orbits.',
    anchors: [
        { size: 20, dots: 36, dotRadius: 0.05 },
        { size: 32, dots: 60, dotRadius: 0.042 },
        { size: 64, dots: 108, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const per = Math.max(4, Math.floor(c.dots / RINGS.length));
        for (const ring of RINGS) {
            const cosT = Math.cos(ring.tilt);
            const sinT = Math.sin(ring.tilt);
            for (let i = 0; i < per; i++) {
                const a = (i / per) * Math.PI * 2 + ring.phase + c.t * ring.speed;
                const ex = Math.cos(a) * 0.8;
                const ey = Math.sin(a) * 0.8;
                // tilt the ring plane around the X axis: near dots grow brighter
                const y = ey * cosT;
                const depth = (ey * sinT + 1) / 2;
                dots.push({
                    x: ex,
                    y,
                    r: c.dotRadius * (0.55 + 0.8 * depth),
                    alpha: 0.3 + 0.7 * depth,
                });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=working.js.map