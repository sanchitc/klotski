import React, { useMemo } from 'react';
import type { Block } from '../game/types';

const COLORS: Record<Block['type'], string> = {
  HERO: '#fbbf24', // yellow-400
  VERT_2: '#60a5fa', // blue-400
  HORIZ_2: '#60a5fa', // blue-400
  SINGLE: '#9ca3af' // gray-400
};

export default function BlockView({
  block,
  handlers
}: {
  block: Block;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
  };
}) {
  const style = useMemo((): React.CSSProperties => ({
    position: 'absolute',
    borderRadius: '8px',
    backgroundColor: COLORS[block.type],
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    touchAction: 'none',
    userSelect: 'none',
    transition: 'transform 180ms ease-out',
    width: `calc(var(--cell) * ${block.w})`,
    height: `calc(var(--cell) * ${block.h})`,
    transform: `translate3d(calc(var(--cell) * ${block.c}), calc(var(--cell) * ${block.r}), 0)`
  }), [block]);

  return (
    <div
      role="button"
      aria-label={`Block ${block.id}`}
      style={style}
      onPointerDown={handlers.onPointerDown}
      onPointerMove={handlers.onPointerMove}
      onPointerUp={handlers.onPointerUp}
    />
  );
}
