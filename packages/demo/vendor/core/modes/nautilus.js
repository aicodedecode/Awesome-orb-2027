/**
 * nautilus — dots flowing along a logarithmic spiral shell.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'nautilus',
    label: 'Nautilus',
    description: 'Dots flowing along a logarithmic spiral.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 104, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        const flow = (c.t * 0.12) % 1;
        for (let i = 0; i < n; i++) {
            const s = ((i / n + flow) % 1);
            const ang = s * 5.2 * Math.PI;
            const r = 0.08 + 0.74 * Math.pow(s, 1.4);
            dots.push({
                x: Math.cos(ang) * r,
                y: Math.sin(ang) * r,
                r: c.dotRadius * (0.7 + 0.7 * s),
                alpha: 0.4 + 0.55 * s,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=nautilus.js.map