/**
 * vortex — three spiral arms winding inward, rotating steadily.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'vortex',
    label: 'Vortex',
    description: 'Three spiral arms winding inward.',
    anchors: [
        { size: 20, dots: 48, dotRadius: 0.05 },
        { size: 32, dots: 72, dotRadius: 0.042 },
        { size: 64, dots: 120, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const arms = 3;
        const per = Math.max(6, Math.floor(c.dots / arms));
        for (let k = 0; k < arms; k++) {
            for (let j = 0; j < per; j++) {
                const s = j / (per - 1);
                const ang = s * 4.2 * Math.PI + c.t * 1.6 + (k * Math.PI * 2) / arms;
                const r = 0.1 + 0.68 * s;
                dots.push({
                    x: Math.cos(ang) * r,
                    y: Math.sin(ang) * r,
                    r: c.dotRadius * (1.25 - 0.6 * s),
                    alpha: 0.95 - 0.4 * s,
                });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=vortex.js.map