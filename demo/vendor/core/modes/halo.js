/**
 * halo — a soft ring with a wave of brightness traveling around it.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'halo',
    label: 'Halo',
    description: 'A soft ring with brightness traveling around it.',
    anchors: [
        { size: 20, dots: 32, dotRadius: 0.055 },
        { size: 32, dots: 48, dotRadius: 0.046 },
        { size: 64, dots: 80, dotRadius: 0.04 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(10, c.dots);
        for (let i = 0; i < n; i++) {
            const th = (i / n) * Math.PI * 2;
            const wave = Math.pow(0.5 + 0.5 * Math.sin(th * 2 - c.t * 1.2), 2);
            dots.push({
                x: Math.cos(th) * 0.7,
                y: Math.sin(th) * 0.7,
                r: c.dotRadius * (0.8 + 0.7 * wave),
                alpha: 0.3 + 0.65 * wave,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=halo.js.map