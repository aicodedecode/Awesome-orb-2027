/**
 * spirograph — dots on a hypotrochoid curve, the whole pattern
 * slowly rotating.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'spirograph',
    label: 'Spirograph',
    description: 'A hypotrochoid curve slowly rotating.',
    anchors: [
        { size: 20, dots: 60, dotRadius: 0.05 },
        { size: 32, dots: 96, dotRadius: 0.04 },
        { size: 64, dots: 160, dotRadius: 0.032 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(16, c.dots);
        const R = 0.62;
        const r = 0.23;
        const d = 0.34;
        const rot = c.t * 0.3;
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        const k = (R - r) / r;
        for (let i = 0; i < n; i++) {
            const th = (i / n) * Math.PI * 2;
            const x0 = (R - r) * Math.cos(th) + d * Math.cos(k * th);
            const y0 = (R - r) * Math.sin(th) - d * Math.sin(k * th);
            dots.push({
                x: (x0 * cosR - y0 * sinR) * 1.05,
                y: (x0 * sinR + y0 * cosR) * 1.05,
                r: c.dotRadius,
                alpha: 0.85,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=spirograph.js.map