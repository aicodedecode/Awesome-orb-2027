/**
 * Evenly-distributed points on a unit sphere (Fibonacci lattice) plus an
 * orthographic projection with Y-rotation and X-tilt. The classic
 * "dotted globe" look: dots shrink and fade toward the back hemisphere.
 */

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface Projected {
  /** Orb-local x, -1..1. */
  x: number
  /** Orb-local y, -1..1. */
  y: number
  /** 0 (far side) .. 1 (near side). */
  depth: number
}

/** n points spread evenly over the unit sphere. Deterministic. */
export function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = []
  if (n <= 0) return pts
  if (n === 1) return [{ x: 0, y: 1, z: 0 }]
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    pts.push({ x: Math.cos(theta) * rad, y, z: Math.sin(theta) * rad })
  }
  return pts
}

/**
 * Rotate point by rotY (around the Y axis), tilt by tiltX (around X),
 * then orthographically project to the view plane.
 */
export function project(p: Vec3, rotY: number, tiltX: number): Projected {
  const cosY = Math.cos(rotY)
  const sinY = Math.sin(rotY)
  const x1 = p.x * cosY + p.z * sinY
  const z1 = -p.x * sinY + p.z * cosY
  const cosX = Math.cos(tiltX)
  const sinX = Math.sin(tiltX)
  const y2 = p.y * cosX - z1 * sinX
  const z2 = p.y * sinX + z1 * cosX
  return { x: x1, y: y2, depth: (z2 + 1) / 2 }
}
