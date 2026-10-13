/**
 * murmuration — a flock of dots wheeling together like starlings,
 * each on its own perturbed orbit.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'murmuration',
    label: 'Murmuration',
    description: 'A flock wheeling together like starlings.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 110, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        const swirl = c.t * 0.55;
        for (let i = 0; i < n; i++) {
            const r = 0.2 + hash2(i, 111) * 0.55;
            const w = 0.8 + hash2(i, 113) * 0.9;
            const p = hash2(i, 115) * Math.PI * 2;
            const a = p + c.t * w + swirl;
            // radial breathing of the whole flock
            const breathe = 1 + 0.18 * Math.sin(c.t * 0.9 + p);
            const x = Math.cos(a) * r * breathe;
            const y = Math.sin(a) * r * 0.8 * breathe + 0.1 * Math.sin(c.t * 1.7 + p * 3);
            if (Math.abs(x) > 0.96 || Math.abs(y) > 0.96)
                continue;
            dots.push({ x, y, r: c.dotRadius, alpha: 0.85 });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=murmuration.js.map