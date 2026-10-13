/**
 * infinity — dots tracing a lemniscate (figure-eight) with a bright
 * traveler looping the curve.
 */
import { defineState } from '../registry.js';
function lemniscate(u) {
    const s = Math.sin(u);
    const c = Math.cos(u);
    const d = 1 + s * s;
    return [(0.85 * c) / d, (0.85 * s * c) / d];
}
defineState({
    name: 'infinity',
    label: 'Infinity',
    description: 'Dots tracing a figure-eight with a bright traveler.',
    anchors: [
        { size: 20, dots: 36, dotRadius: 0.05 },
        { size: 32, dots: 56, dotRadius: 0.042 },
        { size: 64, dots: 96, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots - 1);
        for (let i = 0; i < n; i++) {
            const [x, y] = lemniscate((i / n) * Math.PI * 2);
            dots.push({ x, y, r: c.dotRadius * 0.85, alpha: 0.55 });
        }
        const [tx, ty] = lemniscate(c.t * 1.6);
        dots.push({ x: tx, y: ty, r: c.dotRadius * 2.1, alpha: 0.95 });
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=infinity.js.map