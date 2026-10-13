/**
 * fireworks — radial bursts popping at wandering positions.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'fireworks',
    label: 'Fireworks',
    description: 'Radial bursts popping at wandering positions.',
    anchors: [
        { size: 20, dots: 48, dotRadius: 0.05 },
        { size: 32, dots: 72, dotRadius: 0.042 },
        { size: 64, dots: 120, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const bursts = 3;
        const per = Math.max(6, Math.floor(c.dots / bursts));
        for (let b = 0; b < bursts; b++) {
            const lt = (((c.t - b * 0.85) % 2.55) + 2.55) % 2.55;
            if (lt > 1.1)
                continue;
            const cx = (hash2(b, 51) - 0.5) * 0.9;
            const cy = (hash2(b, 53) - 0.5) * 0.9;
            for (let i = 0; i < per; i++) {
                const a = (i / per) * Math.PI * 2 + b;
                const r = lt * 0.55;
                dots.push({
                    x: cx + Math.cos(a) * r,
                    y: cy + Math.sin(a) * r,
                    r: c.dotRadius * (1.2 - lt * 0.6),
                    alpha: 0.95 * (1 - lt / 1.1),
                });
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=fireworks.js.map