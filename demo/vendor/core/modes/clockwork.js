/**
 * clockwork — two toothed gear rings counter-rotating around a hub.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'clockwork',
    label: 'Clockwork',
    description: 'Two toothed gear rings counter-rotating.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 56, dotRadius: 0.042 },
        { size: 64, dots: 88, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const gears = [
            { teeth: 24, r: 0.76, speed: 0.55 },
            { teeth: 16, r: 0.48, speed: -0.85 },
        ];
        for (const g of gears) {
            for (let i = 0; i < g.teeth; i++) {
                const a = (i / g.teeth) * Math.PI * 2 + c.t * g.speed;
                // teeth alternate slightly in radius
                const rr = g.r + (i % 2 === 0 ? 0.045 : -0.02);
                dots.push({
                    x: Math.cos(a) * rr,
                    y: Math.sin(a) * rr,
                    r: c.dotRadius,
                    alpha: 0.9,
                });
            }
        }
        dots.push({ x: 0, y: 0, r: c.dotRadius * 1.8, alpha: 0.95 });
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=clockwork.js.map