/**
 * searching — a dotted globe turning slowly while a bright scan meridian
 * sweeps around it. Reads as "looking through the library".
 */
import { defineState } from '../registry.js';
import { fibonacciSphere, project } from '../sphere.js';
// Precomputed once; states slice to their tuned dot budget.
const GLOBE_PTS = fibonacciSphere(150);
const TILT_X = 0.38;
defineState({
    name: 'searching',
    label: 'Searching',
    description: 'A scan meridian sweeps a dotted globe.',
    anchors: [
        { size: 20, dots: 40, dotRadius: 0.05 },
        { size: 32, dots: 70, dotRadius: 0.042 },
        { size: 64, dots: 120, dotRadius: 0.036 },
    ],
    draw(c) {
        const dots = [];
        const rotY = c.t * 0.45;
        // the globe itself
        const k = Math.min(GLOBE_PTS.length, c.dots);
        for (let i = 0; i < k; i++) {
            const p = project(GLOBE_PTS[i], rotY, TILT_X);
            if (p.x * p.x + p.y * p.y > 0.96)
                continue; // keep inside the disc
            dots.push({
                x: p.x,
                y: p.y,
                r: c.dotRadius * (0.5 + 0.65 * p.depth),
                alpha: 0.22 + 0.6 * p.depth,
            });
        }
        // the scan meridian: bright dots along one longitude, sweeping in
        // screen space while the globe turns beneath it
        const scanLon = c.t * 1.5;
        const scanCount = Math.max(10, Math.round(c.dots / 5));
        for (let i = 0; i < scanCount; i++) {
            const lat = -Math.PI / 2 + (i / (scanCount - 1)) * Math.PI;
            const p = project({
                x: Math.cos(lat) * Math.cos(scanLon),
                y: Math.sin(lat),
                z: Math.cos(lat) * Math.sin(scanLon),
            }, 0, TILT_X);
            if (p.depth < 0.5)
                continue; // glow only on the near face
            dots.push({
                x: p.x,
                y: p.y,
                r: c.dotRadius * 1.8,
                alpha: 0.95,
            });
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=searching.js.map