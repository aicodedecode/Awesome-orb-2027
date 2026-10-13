/**
 * The Orb: owns one <canvas>, paints one state's frames on the shared tick.
 */

import { getState, stateNames } from './registry.js'
import { sharedSeconds, subscribeTick } from './ticker.js'
import { prefersReducedMotion, resolveInk, type ThemeMode } from './themes.js'
import type { Frame, ModeContext, OrbState } from './types.js'

export interface OrbOptions {
  state?: string
  /** CSS pixel size (width = height). Default 64. */
  size?: number
  theme?: ThemeMode
  /** Playback rate multiplier. Default 1. */
  speed?: number
  paused?: boolean
  /** Brand-tint override; defaults to theme ink. */
  color?: string
  /** Per-instance seed for deterministic variety. */
  seed?: number
  onStateMissing?: (name: string) => void
}

/** Representative instant painted when the user prefers reduced motion. */
const STATIC_T = 2.3
const DPR_CAP = 2

function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * u
}

/** Interpolate a state's size anchors for the requested css size. */
function tuneFor(state: OrbState, size: number): { dots: number; dotRadius: number } {
  const anchors = [...state.anchors].sort((a, b) => a.size - b.size)
  const first = anchors[0]
  const last = anchors[anchors.length - 1]
  if (size <= first.size) return { dots: first.dots, dotRadius: first.dotRadius }
  if (size >= last.size) return { dots: last.dots, dotRadius: last.dotRadius }
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i]
    const b = anchors[i + 1]
    if (size >= a.size && size <= b.size) {
      const u = (size - a.size) / (b.size - a.size)
      return { dots: Math.round(lerp(a.dots, b.dots, u)), dotRadius: lerp(a.dotRadius, b.dotRadius, u) }
    }
  }
  return { dots: last.dots, dotRadius: last.dotRadius }
}

export class Orb {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private opts: Required<Omit<OrbOptions, 'color' | 'onStateMissing'>> & Pick<OrbOptions, 'color' | 'onStateMissing'>
  private state: OrbState
  private unsubscribe: (() => void) | null = null
  private observer: IntersectionObserver | null = null
  private onScreen = true
  private userPaused: boolean
  private seed: number

  constructor(canvas: HTMLCanvasElement, opts: OrbOptions = {}) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('awesome-orbs-2027: 2d canvas context unavailable')
    this.ctx = ctx

    const size = opts.size ?? 64
    this.opts = {
      state: opts.state ?? 'working',
      size,
      theme: opts.theme ?? 'auto',
      speed: opts.speed ?? 1,
      paused: opts.paused ?? false,
      color: opts.color,
      seed: opts.seed ?? ((Math.random() * 1e9) | 0),
      onStateMissing: opts.onStateMissing,
    }
    this.userPaused = this.opts.paused
    this.seed = this.opts.seed

    const dpr = Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
      DPR_CAP,
    )
    canvas.width = Math.round(size * dpr)
    canvas.height = Math.round(size * dpr)
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    this.state = this.resolveState(this.opts.state)

    if (prefersReducedMotion()) {
      // One meaningful static frame; no animation at all.
      this.paint(this.buildContext(STATIC_T))
      return
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        this.onScreen = entries.some((e) => e.isIntersecting)
      })
      this.observer.observe(canvas)
    }

    this.unsubscribe = subscribeTick((nowMs) => {
      if (this.userPaused || !this.onScreen) return
      this.paint(this.buildContext(sharedSeconds(nowMs) * this.opts.speed))
    })
  }

  private resolveState(name: string): OrbState {
    const found = getState(name)
    if (found) return found
    this.opts.onStateMissing?.(name)
    const fallback = getState(stateNames()[0])
    if (!fallback) throw new Error('awesome-orbs-2027: no states registered')
    return fallback
  }

  private buildContext(t: number): ModeContext {
    const tuning = tuneFor(this.state, this.opts.size)
    return { t, size: this.opts.size, dots: tuning.dots, dotRadius: tuning.dotRadius, seed: this.seed }
  }

  private paint(c: ModeContext): void {
    let frame: Frame
    try {
      frame = this.state.draw(c)
    } catch {
      return // a sick state must not blank the page with exceptions
    }
    const { ctx, canvas } = this
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, DPR_CAP)
    const scale = (this.opts.size * dpr) / 2 // orb-local -1..1 -> device px
    const ink = this.opts.color ?? resolveInk(this.opts.theme, canvas)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (frame.lines.length > 0) {
      ctx.strokeStyle = ink
      ctx.lineWidth = Math.max(1, dpr * 0.75)
      ctx.lineCap = 'round'
      for (const ln of frame.lines) {
        ctx.globalAlpha = ln.alpha ?? 1
        ctx.beginPath()
        ctx.moveTo((ln.x1 * 0.5 + 0.5) * scale * 2, (ln.y1 * 0.5 + 0.5) * scale * 2)
        ctx.lineTo((ln.x2 * 0.5 + 0.5) * scale * 2, (ln.y2 * 0.5 + 0.5) * scale * 2)
        ctx.stroke()
      }
    }

    ctx.fillStyle = ink
    for (const d of frame.dots) {
      const rPx = Math.max(0.4, d.r * scale * 2)
      ctx.globalAlpha = d.alpha ?? 1
      ctx.beginPath()
      ctx.arc((d.x * 0.5 + 0.5) * scale * 2, (d.y * 0.5 + 0.5) * scale * 2, rPx, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  setState(name: string): void {
    this.state = this.resolveState(name)
    this.opts.state = name
    if (prefersReducedMotion()) this.paint(this.buildContext(STATIC_T))
  }

  setPaused(paused: boolean): void {
    this.userPaused = paused
  }

  setSpeed(speed: number): void {
    this.opts.speed = speed
  }

  setColor(color: string | undefined): void {
    this.opts.color = color
  }

  destroy(): void {
    this.unsubscribe?.()
    this.unsubscribe = null
    this.observer?.disconnect()
    this.observer = null
  }
}

/** Convenience factory. */
export function createOrb(canvas: HTMLCanvasElement, opts?: OrbOptions): Orb {
  return new Orb(canvas, opts)
}
