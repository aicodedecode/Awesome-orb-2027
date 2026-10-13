/**
 * @awesome-orbs-2027/core — public API.
 * Importing this module registers the built-in states.
 */
import './modes/index.js';
export { createOrb, Orb } from './engine.js';
export { defineState, getState, stateNames } from './registry.js';
export { fibonacciSphere, project } from './sphere.js';
export { hash2, mulberry32, valueNoise1 } from './prng.js';
export { DARK_INK, LIGHT_INK, resolveInk } from './themes.js';
//# sourceMappingURL=index.js.map