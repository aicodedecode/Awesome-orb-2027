/**
 * stream — dots flowing left to right on a gentle sine path,
 * like data moving through a pipe.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'stream',
    label: 'Stream',
    description: 'Dots flowing left to right on a sine path.',
    anchors: [
        { size: 20, dots: 30, dotRadius: 0.05 },
        { size: 32, dots: 48, dotRadius: 0.042 },
        { size: 64, dots: 84, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(8, c.dots);
        for (let i = 0; i < n; i++) {
            const o = (i / n + c.t * 0.3) % 1;
            const x = o * 1.8 - 0.9;
            const edge = Math.min(1, Math.min(o, 1 - o) * 6);
            dots.push({
                x,
                y: Math.sin(x * 3.2 + c.t * 2.2 + i * 0.35) * 0.24,
                r: c.dotRadius,
                alpha: 0.85 * edge,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=stream.js.map