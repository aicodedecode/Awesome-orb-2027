/**
 * slingshot — particles whip along a flyby trajectory around a central
 * mass, brightening as they swing past.
 */
import { defineState } from '../registry.js';
defineState({
    name: 'slingshot',
    label: 'Slingshot',
    description: 'Particles on a gravity-assist flyby past a central mass.',
    anchors: [
        { size: 20, dots: 30, dotRadius: 0.05 },
        { size: 32, dots: 48, dotRadius: 0.042 },
        { size: 64, dots: 80, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const n = Math.max(8, c.dots);
        for (let i = 0; i < n; i++) {
            const o = (i / n + c.t * 0.28) % 1;
            const x = (o - 0.5) * 1.8;
            const y = 0.52 * x * x - 0.34;
            if (Math.abs(x) > 0.95 || Math.abs(y) > 0.95)
                continue;
            // accelerate near the mass: stretch spacing via easing on the flyby
            const heat = Math.max(0, 1 - Math.abs(x) * 1.6);
            dots.push({
                x,
                y,
                r: c.dotRadius * (0.7 + 0.9 * heat),
                alpha: 0.35 + 0.65 * heat,
            });
        }
        // the central mass
        dots.push({ x: 0, y: -0.34, r: c.dotRadius * 2.6, alpha: 0.95 });
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=slingshot.js.map