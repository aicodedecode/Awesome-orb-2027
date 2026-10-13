/**
 * Deterministic randomness. Same seed -> same sequence, every load, every
 * machine. States use these (never Math.random) so a "static frame" for
 * prefers-reduced-motion is stable and re-renders are flicker-free.
 */
/** Seeded PRNG (mulberry32). Returns a function yielding 0..1. */
export function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
/** Deterministic 0..1 hash of two integer coordinates. */
export function hash2(x, y) {
    let h = (x * 374761393 + y * 668265263) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
}
function smooth(u) {
    return u * u * (3 - 2 * u);
}
/**
 * Smooth 1D value noise in 0..1. `t` is continuous time, `seed` picks the
 * noise field. Cheap: two hashes + smoothstep interpolation.
 */
export function valueNoise1(t, seed = 0) {
    const i = Math.floor(t);
    const f = t - i;
    const a = hash2(i, seed);
    const b = hash2(i + 1, seed);
    return a + (b - a) * smooth(f);
}
//# sourceMappingURL=prng.js.map