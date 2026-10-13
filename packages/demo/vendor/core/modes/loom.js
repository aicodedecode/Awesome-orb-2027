/**
 * loom — warp and weft threads weaving over and under each other.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'loom',
    label: 'Loom',
    description: 'Threads weaving over and under each other.',
    anchors: [
        { size: 20, dots: 64, dotRadius: 0.05 },
        { size: 32, dots: 100, dotRadius: 0.04 },
        { size: 64, dots: 169, dotRadius: 0.032 },
    ],
    draw(c) {
        const dots = [];
        const n = 9;
        const step = 1.5 / (n - 1);
        for (let gx = 0; gx < n; gx++) {
            for (let gy = 0; gy < n; gy++) {
                const x = -0.75 + gx * step;
                const y = -0.75 + gy * step;
                // over/under wave traveling diagonally
                const over = Math.sin((gx + gy) * 1.1 - c.t * 2.4) > 0;
                dots.push({
                    x: x + (over ? 0.03 : -0.03),
                    y: y + (over ? -0.03 : 0.03),
                    r: c.dotRadius * (over ? 1.25 : 0.85),
                    alpha: over ? 0.95 : 0.5,
                });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=loom.js.map