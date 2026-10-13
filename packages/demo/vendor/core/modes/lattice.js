/**
 * lattice — a square lattice slowly rotating, dots breathing at the
 * intersections.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'lattice',
    label: 'Lattice',
    description: 'A slowly rotating square lattice.',
    anchors: [
        { size: 20, dots: 36, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 100, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(4, Math.round(Math.sqrt(c.dots)));
        const rot = c.t * 0.22;
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        for (let gx = 0; gx < n; gx++) {
            for (let gy = 0; gy < n; gy++) {
                const x0 = -0.72 + (gx / (n - 1)) * 1.44;
                const y0 = -0.72 + (gy / (n - 1)) * 1.44;
                if (x0 * x0 + y0 * y0 > 0.8)
                    continue;
                const breathe = 0.6 + 0.4 * Math.sin(c.t * 2 + gx * 0.8 + gy * 1.1);
                dots.push({
                    x: x0 * cosR - y0 * sinR,
                    y: x0 * sinR + y0 * cosR,
                    r: c.dotRadius * breathe,
                    alpha: 0.45 + 0.45 * breathe,
                });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=lattice.js.map