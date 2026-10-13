/**
 * breathing — a single ring of dots slowly morphing: a three-lobed wave
 * travels around the ring while the whole thing gently pulses.
 * The calm state: idle, waiting, "I'm here".
 */

import { defineState } from '../registry.js'
import type { Dot, ModeContext } from '../types.js'

defineState({
  name: 'breathing',
  label: 'Breathing',
  description: 'A ring slowly morphing — the calm idle state.',
  anchors: [
    { size: 20, dots: 28, dotRadius: 0.055 },
    { size: 32, dots: 44, dotRadius: 0.046 },
    { size: 64, dots: 72, dotRadius: 0.04 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = []
    const n = Math.max(8, c.dots)
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2
      // traveling 3-lobed morph + a slower 2-lobed undertow
      const wobble =
        Math.sin(th * 3 - c.t * 0.9) * 0.1 + Math.sin(th * 2 + c.t * 0.45) * 0.045
      const rad = 0.76 + wobble
      const glow = 0.55 + 0.35 * Math.sin(c.t * 0.9 - th)
      dots.push({
        x: Math.cos(th) * rad,
        y: Math.sin(th) * rad,
        r: c.dotRadius * (0.85 + 0.35 * Math.sin(c.t * 0.9 + th * 2)),
        alpha: Math.min(1, Math.max(0.25, glow)),
      })
    }
    return { dots, lines: [] }
  },
})
