/**
 * bloom — dots burst outward from the center and fade, looping
 * like a flower opening.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'bloom',
    label: 'Bloom',
    description: 'Dots bursting outward like a flower opening.',
    anchors: [
        { size: 20, dots: 36, dotRadius: 0.05 },
        { size: 32, dots: 56, dotRadius: 0.042 },
        { size: 64, dots: 96, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        const ph = (c.t * 0.5) % 1;
        const ease = 1 - Math.pow(1 - ph, 3);
        for (let i = 0; i < n; i++) {
            const a = hash2(i, 21) * Math.PI * 2 + c.t * 0.15;
            const r = 0.08 + ease * 0.72;
            dots.push({
                x: Math.cos(a) * r,
                y: Math.sin(a) * r,
                r: c.dotRadius * (1.3 - 0.6 * ease),
                alpha: 0.95 * (1 - ph * 0.85),
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=bloom.js.map