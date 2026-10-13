/**
 * @awesome-orbs-2027/core — public API.
 * Importing this module registers the built-in states.
 */
import './modes/index.js'

export { createOrb, Orb, type OrbOptions } from './engine.js'
export { defineState, getState, stateNames } from './registry.js'
export { fibonacciSphere, project, type Projected, type Vec3 } from './sphere.js'
export { hash2, mulberry32, valueNoise1 } from './prng.js'
export { DARK_INK, LIGHT_INK, resolveInk, type ThemeMode } from './themes.js'
export type {
  Dot,
  Frame,
  Line,
  ModeContext,
  OrbState,
  SizeAnchor,
} from './types.js'
