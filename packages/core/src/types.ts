/**
 * Shared vocabulary between the engine and every orb state.
 *
 * Coordinates are orb-local: -1..1 on each axis, (0,0) at the center.
 * The engine maps them onto the canvas; states never touch pixels.
 */

/** One dot to paint. */
export interface Dot {
  x: number
  y: number
  /** Radius in orb-local units (0.035 ≈ a few px at size 64). */
  r: number
  /** 0..1, defaults to 1. */
  alpha?: number
}

/** One straight connector line to stroke. */
export interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  /** 0..1, defaults to 1. */
  alpha?: number
}

/** Everything a state wants painted for a single instant. */
export interface Frame {
  dots: Dot[]
  lines: Line[]
}

/**
 * What the engine hands to a state's draw() every tick.
 * Pure data — draw() must be a pure function of this.
 */
export interface ModeContext {
  /** Seconds on the shared page clock, already multiplied by `speed`. */
  t: number
  /** CSS pixel size of the canvas (e.g. 64). */
  size: number
  /** Dot budget interpolated from the state's size anchors. */
  dots: number
  /** Base dot radius (orb-local units) interpolated from anchors. */
  dotRadius: number
  /** Per-instance deterministic seed for prng variety. */
  seed: number
}

/** One anchor of a state's per-size tuning. Engine lerps between anchors. */
export interface SizeAnchor {
  /** CSS size this anchor is tuned for. */
  size: number
  dots: number
  dotRadius: number
}

/** A single animation state: one file in modes/, one draw function. */
export interface OrbState {
  /** Machine name, e.g. 'searching'. */
  name: string
  /** Human label, e.g. 'Searching'. */
  label: string
  /** One-line description for the demo/docs. */
  description: string
  /** Tuning anchors, ascending by size. At least one; three recommended. */
  anchors: SizeAnchor[]
  /** Pure: (time, tuning) -> dots + lines for this instant. */
  draw: (c: ModeContext) => Frame
}
