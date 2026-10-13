/**
 * The state registry. Each file in modes/ calls defineState() once;
 * modes/index.ts imports them all so built-ins self-register.
 * Third parties can defineState() their own modes at runtime.
 */

import type { OrbState } from './types.js'

const states = new Map<string, OrbState>()

export function defineState(state: OrbState): void {
  if (!state.name) throw new Error('awesome-orbs-2027: state needs a name')
  if (states.has(state.name)) {
    throw new Error(`awesome-orbs-2027: duplicate state "${state.name}"`)
  }
  states.set(state.name, state)
}

export function getState(name: string): OrbState | undefined {
  return states.get(name)
}

export function stateNames(): string[] {
  return [...states.keys()]
}
