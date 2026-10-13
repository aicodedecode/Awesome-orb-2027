/**
 * droplet — a teardrop outline gently pulsing.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'droplet',
    label: 'Droplet',
    description: 'A teardrop outline gently pulsing.',
    anchors: [
        { size: 20, dots: 36, dotRadius: 0.05 },
        { size: 32, dots: 56, dotRadius: 0.042 },
        { size: 64, dots: 96, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        const pulse = 1 + 0.05 * Math.sin(c.t * 2.4);
        for (let i = 0; i < n; i++) {
            const th = (i / n) * Math.PI * 2;
            const px = 0.62 * Math.sin(th) * Math.pow(Math.max(0, Math.sin(th / 2)), 0.65);
            const py = -0.68 * Math.cos(th);
            dots.push({ x: px * pulse, y: py * pulse, r: c.dotRadius, alpha: 0.9 });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=droplet.js.map