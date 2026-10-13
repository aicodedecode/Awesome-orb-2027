/**
 * One shared requestAnimationFrame loop for every orb on the page.
 * Ten orbs cost one rAF, not ten. No-ops outside a browser (SSR-safe).
 */

export type TickFn = (nowMs: number) => void

const subscribers = new Set<TickFn>()
let rafId = 0
let running = false

function loop(nowMs: number): void {
  subscribers.forEach((fn) => {
    try {
      fn(nowMs)
    } catch {
      /* a sick orb must not kill the shared loop */
    }
  })
  if (subscribers.size > 0) {
    rafId = requestAnimationFrame(loop)
  } else {
    running = false
  }
}

/** Subscribe to the shared tick. Returns an unsubscribe function. */
export function subscribeTick(fn: TickFn): () => void {
  subscribers.add(fn)
  if (typeof window !== 'undefined' && !running) {
    running = true
    rafId = requestAnimationFrame(loop)
  }
  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0 && running) {
      cancelAnimationFrame(rafId)
      running = false
    }
  }
}

/**
 * Shared clock epoch (ms). All orbs derive `t` from the same origin so
 * instances of the same state stay in phase with each other.
 */
let epoch = -1
export function sharedSeconds(nowMs: number): number {
  if (epoch < 0) epoch = nowMs
  return (nowMs - epoch) / 1000
}
