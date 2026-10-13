/**
 * glitch — a clean ring with digital jitter and occasional slice
 * displacement.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'glitch',
    label: 'Glitch',
    description: 'A clean ring with digital jitter and slice slips.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 104, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        const frame = Math.floor(c.t * 14);
        const sliceHot = hash2(Math.floor(c.t * 2.5), 91) > 0.62;
        const sliceShift = (hash2(Math.floor(c.t * 2.5), 93) - 0.5) * 0.5;
        for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2;
            let x = Math.cos(a) * 0.72;
            let y = Math.sin(a) * 0.72;
            // per-dot jitter
            x += (hash2(i, frame) - 0.5) * 0.09;
            y += (hash2(i, frame + 500) - 0.5) * 0.09;
            // horizontal slice slip
            if (sliceHot && Math.abs(y) < 0.22)
                x += sliceShift;
            dots.push({ x, y, r: c.dotRadius, alpha: 0.9 });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=glitch.js.map