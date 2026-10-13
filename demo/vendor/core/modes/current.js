/**
 * current — dots caught in a circular flow field, inner rings lapping
 * faster than outer ones.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'current',
    label: 'Current',
    description: 'A circular flow field — inner rings lap the outer ones.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 110, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        for (let i = 0; i < n; i++) {
            const r = 0.14 + hash2(i, 11) * 0.68;
            const a0 = hash2(i, 77) * Math.PI * 2;
            const a = a0 + c.t * (1.6 / (0.35 + r));
            dots.push({
                x: Math.cos(a) * r,
                y: Math.sin(a) * r,
                r: c.dotRadius * (0.8 + 0.4 * (1 - r)),
                alpha: 0.85,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=current.js.map