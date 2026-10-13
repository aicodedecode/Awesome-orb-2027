/**
 * Ink-color resolution. 'auto' walks up to the closest [data-theme]
 * attribute, then falls back to prefers-color-scheme. An explicit `color`
 * prop on the orb always wins (handled in the engine, not here).
 */
export const LIGHT_INK = '#1c1a17';
export const DARK_INK = '#f2efe9';
export function resolveInk(theme, el) {
    if (theme === 'light')
        return LIGHT_INK;
    if (theme === 'dark')
        return DARK_INK;
    const themed = el.closest('[data-theme]');
    const attr = themed?.getAttribute('data-theme');
    if (attr === 'dark')
        return DARK_INK;
    if (attr === 'light')
        return LIGHT_INK;
    if (typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return DARK_INK;
    }
    return LIGHT_INK;
}
/** True when the user asked for reduced motion. */
export function prefersReducedMotion() {
    return (typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
//# sourceMappingURL=themes.js.map