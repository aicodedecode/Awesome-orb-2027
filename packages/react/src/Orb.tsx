import { useEffect, useRef } from 'react';
import { Orb as CoreOrb, stateNames, type OrbOptions } from '@awesome-orbs-2027/core';

export interface OrbProps extends OrbOptions {
  /** Accessible label; defaults to "<state> indicator". */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

function warnOnce(msg: string): void {
  if (!(warnOnce as unknown as { seen?: Set<string> }).seen) {
    (warnOnce as unknown as { seen: Set<string> }).seen = new Set();
  }
  const seen = (warnOnce as unknown as { seen: Set<string> }).seen;
  if (!seen.has(msg)) {
    seen.add(msg);
    console.warn(msg);
  }
}

/**
 * <Orb> — an animated dotted-orb state indicator.
 *
 *   <Orb state="searching" size={32} theme="auto" label="Searching articles" />
 */
export function Orb({
  state = 'working',
  size = 64,
  theme = 'auto',
  speed = 1,
  paused = false,
  color,
  label,
  className,
  style,
}: OrbProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const orbRef = useRef<CoreOrb | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!stateNames().includes(state)) {
      warnOnce(
        `awesome-orbs-2027: unknown state "${state}". Available: ${stateNames().join(', ')}. Falling back.`,
      );
    }
    const orb = new CoreOrb(canvasRef.current, { state, size, theme, speed, paused, color });
    orbRef.current = orb;
    return () => {
      orb.destroy();
      orbRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    orbRef.current?.setState(state);
  }, [state]);
  useEffect(() => {
    orbRef.current?.setPaused(paused);
  }, [paused]);
  useEffect(() => {
    orbRef.current?.setSpeed(speed);
  }, [speed]);
  useEffect(() => {
    orbRef.current?.setColor(color);
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label ?? `${state} indicator`}
      className={className}
      style={{ width: size, height: size, display: 'inline-block', ...style }}
    />
  );
}

export { stateNames };
export type { OrbOptions };
