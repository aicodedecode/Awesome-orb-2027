/**
 * drift — slow motes floating on smooth noise, the quietest state.
 */
import { defineState } from '../registry.js';
import { hash2, valueNoise1 } from '../prng.js';
defineState({
    name: 'drift',
    label: 'Drift',
    description: 'Slow motes floating on smooth noise.',
    anchors: [
        { size: 20, dots: 24, dotRadius: 0.05 },
        { size: 32, dots: 36, dotRadius: 0.042 },
        { size: 64, dots: 60, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(8, c.dots);
        for (let i = 0; i < n; i++) {
            const bx = (hash2(i, 101) - 0.5) * 1.4;
            const by = (hash2(i, 103) - 0.5) * 1.4;
            const x = bx + (valueNoise1(c.t * 0.25 + i * 0.7, 5) - 0.5) * 0.4;
            const y = by + (valueNoise1(c.t * 0.22 + i * 1.3, 9) - 0.5) * 0.4;
            if (Math.abs(x) > 0.95 || Math.abs(y) > 0.95)
                continue;
            dots.push({
                x, y,
                r: c.dotRadius * (0.7 + 0.6 * hash2(i, 107)),
                alpha: 0.55,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=drift.js.map