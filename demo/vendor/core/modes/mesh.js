/**
 * mesh — a square grid rippling with two interfering waves.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'mesh',
    label: 'Mesh',
    description: 'A grid rippling with interfering waves.',
    anchors: [
        { size: 20, dots: 36, dotRadius: 0.05 },
        { size: 32, dots: 64, dotRadius: 0.042 },
        { size: 64, dots: 100, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(4, Math.round(Math.sqrt(c.dots)));
        for (let gx = 0; gx < n; gx++) {
            for (let gy = 0; gy < n; gy++) {
                const x0 = -0.78 + (gx / (n - 1)) * 1.56;
                const y0 = -0.78 + (gy / (n - 1)) * 1.56;
                const dx = Math.sin(y0 * 3.1 + c.t * 1.6) * 0.07;
                const dy = Math.cos(x0 * 2.7 + c.t * 1.25) * 0.07;
                dots.push({ x: x0 + dx, y: y0 + dy, r: c.dotRadius, alpha: 0.8 });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=mesh.js.map