/**
 * sonar — expanding rings with echo dots that flash as each ring
 * passes their distance.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
const ECHOES = [];
for (let i = 0; i < 9; i++) {
    const a = hash2(i, 65) * Math.PI * 2;
    const r = 0.2 + hash2(i, 67) * 0.6;
    ECHOES.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, r });
}
defineState({
    name: 'sonar',
    label: 'Sonar',
    description: 'Expanding pings flashing echoes at their distance.',
    anchors: [
        { size: 20, dots: 48, dotRadius: 0.05 },
        { size: 32, dots: 72, dotRadius: 0.042 },
        { size: 64, dots: 110, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const waves = 3;
        const per = Math.max(8, Math.floor(c.dots / waves) - 3);
        const radii = [];
        for (let w = 0; w < waves; w++) {
            const ph = (c.t * 0.5 + w / waves) % 1;
            const r = 0.1 + ph * 0.75;
            radii.push(r);
            const alpha = (1 - ph) * 0.85;
            for (let i = 0; i < per; i++) {
                const a = (i / per) * Math.PI * 2;
                dots.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, r: c.dotRadius, alpha });
            }
        }
        for (const e of ECHOES) {
            let flash = 0;
            for (const r of radii)
                flash = Math.max(flash, Math.exp(-Math.pow((r - e.r) * 9, 2)));
            dots.push({
                x: e.x, y: e.y,
                r: c.dotRadius * (1 + 1.4 * flash),
                alpha: 0.25 + 0.75 * flash,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=sonar.js.map