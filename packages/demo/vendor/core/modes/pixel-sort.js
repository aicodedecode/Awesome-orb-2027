/**
 * pixel-sort — a scattered cloud sorting itself into an ordered ring,
 * then dissolving again.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'pixel-sort',
    label: 'Pixel Sort',
    description: 'Chaos sorting itself into a crisp ring, on loop.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 104, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        const ph = (c.t * 0.35) % 1;
        const tri = ph < 0.5 ? ph * 2 : (1 - ph) * 2;
        const u = tri * tri * (3 - 2 * tri);
        for (let i = 0; i < n; i++) {
            // scattered start (stable)
            const a = hash2(i, 81) * Math.PI * 2;
            const rr = Math.sqrt(hash2(i, 83)) * 0.8;
            const sx = Math.cos(a) * rr;
            const sy = Math.sin(a) * rr;
            // sorted end: ring ordered by the same hash rank
            const rank = hash2(i, 81); // reuse as sort key
            const sa = rank * Math.PI * 2;
            const gx = Math.cos(sa) * 0.7;
            const gy = Math.sin(sa) * 0.7;
            dots.push({
                x: sx + (gx - sx) * u,
                y: sy + (gy - sy) * u,
                r: c.dotRadius * (1 + 0.4 * u),
                alpha: 0.5 + 0.45 * u,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=pixel-sort.js.map