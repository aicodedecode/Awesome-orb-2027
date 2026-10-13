/**
 * helix — a double helix turning around its vertical axis, with
 * faint rungs between the strands.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'helix',
    label: 'Helix',
    description: 'A double helix turning on its axis.',
    anchors: [
        { size: 20, dots: 32, dotRadius: 0.05 },
        { size: 32, dots: 48, dotRadius: 0.042 },
        { size: 64, dots: 80, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const lines = [];
        const n = Math.max(8, Math.floor(c.dots / 2));
        for (let i = 0; i < n; i++) {
            const y = -0.78 + (i / (n - 1)) * 1.56;
            const a = y * 4 + c.t * 1.7;
            const x1 = Math.cos(a) * 0.44;
            const x2 = -x1;
            const d1 = (Math.sin(a) + 1) / 2;
            const d2 = 1 - d1;
            dots.push({ x: x1, y, r: c.dotRadius * (0.6 + 0.7 * d1), alpha: 0.35 + 0.6 * d1 });
            dots.push({ x: x2, y, r: c.dotRadius * (0.6 + 0.7 * d2), alpha: 0.35 + 0.6 * d2 });
            if (i % 4 === 0) {
                lines.push({ x1, y1: y, x2, y2: y, alpha: 0.25 });
            }
        }
        return { dots, lines };
    },
});
//# sourceMappingURL=helix.js.map