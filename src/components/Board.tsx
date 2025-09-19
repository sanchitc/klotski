import React from 'react';
import type { Block } from '../game/types';
import BlockView from './Block.tsx';

interface Props {
  blocks: Block[];
  onBlockHandlers: (b: Block) => {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
  };
}

export default function Board({ blocks, onBlockHandlers }: Props) {
  return (
    <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
      <div
        data-board
        style={{ 
          position: 'relative', 
          borderRadius: '12px', 
          backgroundColor: '#e5e7eb', 
          boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
          width: 'var(--board)', 
          height: 'calc(var(--cell) * 5)' 
        }}
      >
        {/* Exit indicator */}
        <div
          style={{ 
            position: 'absolute', 
            bottom: '-10px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            height: '8px', 
            borderRadius: '4px', 
            backgroundColor: '#f59e0b',
            width: 'calc(var(--cell) * 2)' 
          }}
          aria-hidden
        />
        {blocks.map(b => (
          <BlockView key={b.id} block={b} handlers={onBlockHandlers(b)} />
        ))}
      </div>
    </div>
  );
}
