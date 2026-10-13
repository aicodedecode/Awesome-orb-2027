/**
 * pendulum — a row of swinging bobs on strings, phase-staggered so a
 * wave travels down the line.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'pendulum',
    label: 'Pendulum',
    description: 'A wave traveling down a row of swinging bobs.',
    anchors: [
        { size: 20, dots: 12, dotRadius: 0.055 },
        { size: 32, dots: 12, dotRadius: 0.048 },
        { size: 64, dots: 12, dotRadius: 0.042 },
    ],
    draw(c) {
        const dots = [];
        const lines = [];
        const count = 5;
        const L = 0.52;
        for (let i = 0; i < count; i++) {
            const px = -0.6 + (i / (count - 1)) * 1.2;
            const py = -0.62;
            const ang = 0.55 * Math.sin(c.t * 2.3 + i * 0.6);
            const bx = px + Math.sin(ang) * L;
            const by = py + Math.cos(ang) * L;
            lines.push({ x1: px, y1: py, x2: bx, y2: by, alpha: 0.4 });
            dots.push({ x: px, y: py, r: c.dotRadius * 0.7, alpha: 0.6 });
            dots.push({ x: bx, y: by, r: c.dotRadius * 1.8, alpha: 0.95 });
        }
        return { dots, lines };
    },
});
//# sourceMappingURL=pendulum.js.map