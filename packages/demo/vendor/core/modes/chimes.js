/**
 * chimes — vertical bars struck in sequence by a traveling striker.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'chimes',
    label: 'Chimes',
    description: 'Bars struck in sequence by a traveling striker.',
    anchors: [
        { size: 20, dots: 16, dotRadius: 0.05 },
        { size: 32, dots: 20, dotRadius: 0.044 },
        { size: 64, dots: 28, dotRadius: 0.038 },
    ],
    draw(c) {
        const dots = [];
        const lines = [];
        const bars = 7;
        const strikerX = -0.75 + ((c.t * 0.55) % 1) * 1.5;
        for (let b = 0; b < bars; b++) {
            const x = -0.75 + (b / (bars - 1)) * 1.5;
            const len = 0.5 + 0.28 * Math.sin((b / (bars - 1)) * Math.PI);
            lines.push({ x1: x, y1: -len / 2, x2: x, y2: len / 2, alpha: 0.5 });
            // resonance after being struck
            const since = (strikerX - x) / 1.5;
            const rung = since > 0 && since < 0.45 ? Math.exp(-since * 6) : 0;
            dots.push({
                x, y: len / 2 + 0.06,
                r: c.dotRadius * (1 + 0.9 * rung),
                alpha: 0.4 + 0.6 * rung,
            });
        }
        dots.push({ x: strikerX, y: 0.62, r: c.dotRadius * 1.7, alpha: 0.95 });
        return { dots, lines };
    },
});
//# sourceMappingURL=chimes.js.map