/**
 * ember — sparks rising and flickering out, like the last of a fire.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'ember',
    label: 'Ember',
    description: 'Sparks rising and flickering out.',
    anchors: [
        { size: 20, dots: 28, dotRadius: 0.05 },
        { size: 32, dots: 44, dotRadius: 0.042 },
        { size: 64, dots: 76, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(8, c.dots);
        for (let i = 0; i < n; i++) {
            const o = (i / n + c.t * 0.28) % 1;
            const bx = (hash2(i, 109) - 0.5) * 1.1;
            const flicker = 0.5 + 0.5 * Math.sin(c.t * 9 + i * 2.4);
            dots.push({
                x: bx + Math.sin(c.t * 3 + i) * 0.05,
                y: -0.88 + o * 1.76,
                r: c.dotRadius * (1.2 - 0.6 * o),
                alpha: (1 - o) * (0.35 + 0.65 * flicker),
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=ember.js.map