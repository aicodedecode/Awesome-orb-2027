/**
 * dial — gauge ticks around a 270° arc with a needle sweeping back
 * and forth.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'dial',
    label: 'Dial',
    description: 'Gauge ticks with a sweeping needle.',
    anchors: [
        { size: 20, dots: 20, dotRadius: 0.05 },
        { size: 32, dots: 24, dotRadius: 0.044 },
        { size: 64, dots: 32, dotRadius: 0.038 },
    ],
    draw(c) {
        const dots = [];
        const lines = [];
        const ticks = 18;
        const a0 = Math.PI * 0.75;
        const a1 = Math.PI * 2.25;
        for (let i = 0; i < ticks; i++) {
            const a = a0 + (i / (ticks - 1)) * (a1 - a0);
            const big = i % 6 === 0;
            dots.push({
                x: Math.cos(a) * 0.74,
                y: Math.sin(a) * 0.74,
                r: c.dotRadius * (big ? 1.5 : 0.9),
                alpha: big ? 0.95 : 0.55,
            });
        }
        const sweep = a0 + (0.5 + 0.5 * Math.sin(c.t * 1.4)) * (a1 - a0);
        lines.push({
            x1: 0, y1: 0,
            x2: Math.cos(sweep) * 0.62, y2: Math.sin(sweep) * 0.62,
            alpha: 0.9,
        });
        dots.push({ x: 0, y: 0, r: c.dotRadius * 1.6, alpha: 0.95 });
        return { dots, lines };
    },
});
//# sourceMappingURL=dial.js.map