/**
 * packet-flow — packets streaming along the spokes of a hub network.
 */
import { defineState } from '../registry.js';
const HUBS = [];
for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.5;
    HUBS.push({ x: Math.cos(a) * 0.68, y: Math.sin(a) * 0.68 });
}
defineState({
    name: 'packet-flow',
    label: 'Packet Flow',
    description: 'Packets streaming along hub-network spokes.',
    anchors: [
        { size: 20, dots: 24, dotRadius: 0.05 },
        { size: 32, dots: 36, dotRadius: 0.042 },
        { size: 64, dots: 60, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const lines = [];
        dots.push({ x: 0, y: 0, r: c.dotRadius * 2.2, alpha: 0.95 });
        for (const h of HUBS) {
            lines.push({ x1: 0, y1: 0, x2: h.x, y2: h.y, alpha: 0.25 });
            dots.push({ x: h.x, y: h.y, r: c.dotRadius * 1.5, alpha: 0.9 });
        }
        // packets: two per spoke, offset in phase
        const perSpoke = Math.max(1, Math.floor(c.dots / (HUBS.length * 2)));
        HUBS.forEach((h, hi) => {
            for (let k = 0; k < perSpoke * 2; k++) {
                const o = (c.t * 0.7 + k * 0.5 + hi * 0.13) % 1;
                dots.push({
                    x: h.x * o,
                    y: h.y * o,
                    r: c.dotRadius * 1.1,
                    alpha: 0.9 * Math.sin(o * Math.PI),
                });
            }
        });
        return { dots, lines };
    },
});
//# sourceMappingURL=packet-flow.js.map