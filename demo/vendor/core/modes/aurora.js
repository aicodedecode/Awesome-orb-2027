/**
 * aurora — vertical curtains of dots rippling like the northern lights.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'aurora',
    label: 'Aurora',
    description: 'Curtains of light rippling like the aurora.',
    anchors: [
        { size: 20, dots: 60, dotRadius: 0.05 },
        { size: 32, dots: 96, dotRadius: 0.042 },
        { size: 64, dots: 160, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const cols = 14;
        const per = Math.max(4, Math.floor(c.dots / cols));
        for (let ci = 0; ci < cols; ci++) {
            const x = -0.84 + (ci / (cols - 1)) * 1.68;
            for (let i = 0; i < per; i++) {
                const v = i / (per - 1); // 0 bottom → 1 top
                const wave = Math.sin(x * 5 + c.t * 1.8 + v * 3) * 0.1 * v +
                    Math.sin(x * 9 - c.t * 1.2) * 0.05 * v;
                dots.push({
                    x: x + wave,
                    y: -0.7 + v * 1.4,
                    r: c.dotRadius * (1.15 - 0.5 * v),
                    alpha: 0.85 * (1 - v * 0.75),
                });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=aurora.js.map