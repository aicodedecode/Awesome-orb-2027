/**
 * decode — a dot matrix decoding itself column by column, left to right.
 */
import { defineState } from '../registry.js';
import { hash2 } from '../prng.js';
defineState({
    name: 'decode',
    label: 'Decode',
    description: 'A dot matrix decoding itself column by column.',
    anchors: [
        { size: 20, dots: 48, dotRadius: 0.05 },
        { size: 32, dots: 72, dotRadius: 0.042 },
        { size: 64, dots: 120, dotRadius: 0.034 },
    ],
    draw(c) {
        const dots = [];
        const cols = 8;
        const rows = 6;
        const active = Math.floor(c.t * 3.2) % cols;
        for (let ci = 0; ci < cols; ci++) {
            for (let ri = 0; ri < rows; ri++) {
                const x = -0.7 + (ci / (cols - 1)) * 1.4;
                const y = -0.55 + (ri / (rows - 1)) * 1.1;
                const id = ci * rows + ri;
                if (ci === active) {
                    const seq = (c.t * 14 + ri * 0.9) % 2;
                    dots.push({ x, y, r: c.dotRadius * 1.4, alpha: seq < 1 ? 0.95 : 0.3 });
                }
                else if (ci < active) {
                    // decoded region: steady
                    dots.push({ x, y, r: c.dotRadius, alpha: 0.85 });
                }
                else {
                    dots.push({ x, y, r: c.dotRadius, alpha: 0.18 + 0.12 * hash2(id, Math.floor(c.t * 6)) });
                }
            }
        }
        return { dots, lines: [] };
    },
});
//# sourceMappingURL=decode.js.map