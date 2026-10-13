/**
 * band-shuffle — horizontal bands sliding past each other in alternate
 * directions.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'band-shuffle',
    label: 'Band Shuffle',
    description: 'Horizontal bands sliding in alternate directions.',
    anchors: [
        { size: 20, dots: 48, dotRadius: 0.05 },
        { size: 32, dots: 72, dotRadius: 0.042 },
        { size: 64, dots: 120, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const bands = 6;
        const per = Math.max(6, Math.floor(c.dots / bands));
        for (let b = 0; b < bands; b++) {
            const y = -0.7 + (b / (bands - 1)) * 1.4;
            const dir = b % 2 === 0 ? 1 : -1;
            const off = (((c.t * 0.45 * dir + b * 0.31) % 1) + 1) % 1;
            for (let i = 0; i < per; i++) {
                const x = -0.9 + ((i / per + off) % 1) * 1.8;
                dots.push({ x, y, r: c.dotRadius, alpha: 0.75 });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=band-shuffle.js.map