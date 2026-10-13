# Awesome Orbs 2027

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/aicodedecode/Awesome-orbs-2027?style=social)](https://github.com/aicodedecode/Awesome-orbs-2027)

<p align="center">
  <img src="assets/demo.gif" alt="Awesome Orbs 2027 — animated dotted-orb loading states" width="320">
</p>

<p align="center">
  <a href="https://aicodedecode.github.io/Awesome-orbs-2027/demo/"><b>◉ Live demo — try all 65 states</b></a>
</p>

A dotted-orb animation library: 65 expressive loading states rendered as
animated dot fields on plain 2D canvas. Framework-agnostic core plus a thin
React wrapper. Zero runtime dependencies, no WebGL, no images.

## Packages

- `packages/core` — the engine. `createOrb(canvas, opts)`; everything else
  (React, Vue, Svelte…) builds on this.
- `packages/react` — `<Orb>` component.
- `demo/` — vanilla-JS preview page (serve over http; see below).

## Quick use

```ts
import { createOrb } from '@awesome-orbs-2027/core';

const orb = createOrb(document.querySelector('canvas')!, {
  state: 'searching',
  size: 64,
  theme: 'auto',   // 'auto' | 'light' | 'dark'
  speed: 1,
});
orb.setState('breathing');
orb.destroy();
```

```tsx
import { Orb } from '@awesome-orbs-2027/react';

<Orb state="searching" size={32} theme="auto" label="Searching articles" />
```

## How a state works

A state is **one file** in `packages/core/src/modes/` exporting a pure draw
function. The engine handles the canvas, the clock, theming, and pausing —
the state only decides where dots go at time `t`:

```ts
import { defineState } from '../registry';
import type { Dot, ModeContext } from '../types';

defineState({
  name: 'working',
  label: 'Working',
  description: 'Particles circling on tilted orbits.',
  // dot budget + base radius tuned per rendered size; engine lerps between anchors
  anchors: [
    { size: 20, dots: 36, dotRadius: 0.045 },
    { size: 32, dots: 60, dotRadius: 0.04 },
    { size: 64, dots: 110, dotRadius: 0.035 },
  ],
  draw(c: ModeContext) {
    const dots: Dot[] = [];
    // c.t = seconds on the shared clock (already × speed)
    // c.dots / c.dotRadius = interpolated tuning for this size
    // coordinates are orb-local: -1..1 on each axis
    return { dots, lines: [] };
  },
});
```

Helpers available to states: `fibonacciSphere(n)` + `project()` in
`sphere.ts` (even dot distribution on a globe, orthographic projection with
depth), `mulberry32` / `hash2` / `valueNoise1` in `prng.ts` (deterministic
randomness — same seed, same frame, every load).

Checklist for each new state: name + label + description, 3 size anchors,
looks right at 20px (tiny!) and 64px, calm at `speed: 0.5`, not nauseating at
`speed: 2`, meaningful static frame under `prefers-reduced-motion`.

## Engine guarantees

- One shared `requestAnimationFrame` loop for all orb instances on the page.
- DPR-aware rendering, capped at 2.
- `theme: 'auto'` reads the closest `[data-theme]` attribute, else
  `prefers-color-scheme`.
- `prefers-reduced-motion` → single static frame, no animation.
- `IntersectionObserver` pauses offscreen orbs automatically.
- `color` prop overrides the monochrome ink (brand tints).

## Demo

```sh
npm run build --workspace @awesome-orbs-2027/core
cd demo && python3 -m http.server 8123
# open http://localhost:8123
```

## State catalog (65)

working, searching, breathing, satellites, precession, slingshot, binary,
comet, pendulum, gyroscope, ripple, pulse-rings, cascade, tide, stream,
waterfall, current, undertow, constellation, packet-flow, mesh, hive, dial,
compass, clockwork, lattice, polygon-cycle, blob, petal, droplet, bloom,
scatter-gather, fountain, fireworks, radar, sonar, barcode, shutter, decode,
band-shuffle, pixel-sort, glitch, drift, halo, slow-orbit, ember, vortex,
helix, nautilus, cyclone, heartbeat, throb, signal, aurora, murmuration,
loom, sundial, metronome, abacus, chimes, infinity, spirograph, quasar,
eclipse, hourglass.

Groups covered: orbital, wave, network, geometric, morph, burst, scan,
scramble, calm, spiral, pulse, sky, craft, cosmic.

## Decisions needed before publishing

1. **Name** — decided: **Awesome Orbs 2027** (`awesome-orbs-2027`).
2. **License holder** — placeholder in LICENSE.
3. **npm scope/org** for publishing.
