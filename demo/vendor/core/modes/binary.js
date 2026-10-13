/**
 * binary — two centers with dots orbiting each in opposite directions,
 * like a binary star system.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'binary',
    label: 'Binary',
    description: 'Two centers, counter-orbiting particle families.',
    anchors: [
        { size: 20, dots: 28, dotRadius: 0.05 },
        { size: 32, dots: 44, dotRadius: 0.042 },
        { size: 64, dots: 76, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const centers = [-0.36, 0.36];
        const per = Math.max(4, Math.floor(c.dots / 2));
        centers.forEach((cx, k) => {
            const dir = k === 0 ? 1 : -1;
            for (let i = 0; i < per; i++) {
                const a = (i / per) * Math.PI * 2 + c.t * 1.35 * dir + k * 1.7;
                dots.push({
                    x: cx + Math.cos(a) * 0.28,
                    y: Math.sin(a) * 0.26,
                    r: c.dotRadius,
                    alpha: 0.85,
                });
            }
            dots.push({ x: cx, y: 0, r: c.dotRadius * 2.2, alpha: 0.95 });
        });
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=binary.js.map