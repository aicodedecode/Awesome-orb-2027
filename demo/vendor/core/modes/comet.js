/**
 * comet — a bright head on a circular orbit dragging a fading tail.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'comet',
    label: 'Comet',
    description: 'A bright head dragging a fading tail around an orbit.',
    anchors: [
        { size: 20, dots: 20, dotRadius: 0.05 },
        { size: 32, dots: 28, dotRadius: 0.042 },
        { size: 64, dots: 40, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const R = 0.66;
        const a = c.t * 1.5;
        const tail = Math.max(8, Math.min(28, c.dots));
        for (let k = 0; k < tail; k++) {
            const ak = a - k * 0.062;
            const u = k / tail;
            dots.push({
                x: Math.cos(ak) * R,
                y: Math.sin(ak) * R * 0.94,
                r: c.dotRadius * (2.1 - 1.5 * u),
                alpha: 0.95 * (1 - u),
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=comet.js.map