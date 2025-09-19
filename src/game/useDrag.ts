import { useCallback, useRef } from 'react';
import { canPlace } from './board';
import type { Block } from './types';

export function useDrag(
  rows: number,
  cols: number,
  blocks: Block[],
  onSnap: (id: string, r: number, c: number, countMove: boolean) => void
) {
  const dragState = useRef<{
    isDragging: boolean;
    blockId: string;
    startX: number;
    startY: number;
    startR: number;
    startC: number;
    axis: 'x' | 'y' | null;
  }>({
    isDragging: false,
    blockId: '',
    startX: 0,
    startY: 0,
    startR: 0,
    startC: 0,
    axis: null
  });

  const onPointerDown = useCallback((e: React.PointerEvent, b: Block) => {
    console.log('Pointer down on block:', b.id);
    e.preventDefault();
    e.stopPropagation();
    
    dragState.current = {
      isDragging: true,
      blockId: b.id,
      startX: e.clientX,
      startY: e.clientY,
      startR: b.r,
      startC: b.c,
      axis: null
    };
    
    (e.target as Element).setPointerCapture(e.pointerId);
    document.body.style.touchAction = 'none';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    if (!dragState.current.axis) {
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        dragState.current.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        console.log('Drag axis determined:', dragState.current.axis);
      }
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent, cellPx: number) => {
    if (!dragState.current.isDragging) return;
    
    console.log('Pointer up, processing drag...');
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    
    let targetR = dragState.current.startR;
    let targetC = dragState.current.startC;
    
    if (dragState.current.axis === 'x') {
      const deltaC = Math.round(dx / cellPx);
      console.log('X movement:', deltaC, 'cells');
      const step = deltaC > 0 ? 1 : -1;
      
      for (let i = 0; i < Math.abs(deltaC); i++) {
        const nextC = targetC + step;
        if (canPlace(blocks, rows, cols, dragState.current.blockId, targetR, nextC)) {
          targetC = nextC;
        } else {
          break;
        }
      }
    } else if (dragState.current.axis === 'y') {
      const deltaR = Math.round(dy / cellPx);
      console.log('Y movement:', deltaR, 'cells');
      const step = deltaR > 0 ? 1 : -1;
      
      for (let i = 0; i < Math.abs(deltaR); i++) {
        const nextR = targetR + step;
        if (canPlace(blocks, rows, cols, dragState.current.blockId, nextR, targetC)) {
          targetR = nextR;
        } else {
          break;
        }
      }
    }
    
    const changed = targetR !== dragState.current.startR || targetC !== dragState.current.startC;
    console.log('Final position:', targetR, targetC, 'Changed:', changed);
    
    if (changed) {
      onSnap(dragState.current.blockId, targetR, targetC, true);
    }
    
    dragState.current.isDragging = false;
    dragState.current.axis = null;
    document.body.style.touchAction = '';
  }, [blocks, rows, cols, onSnap]);

  return { onPointerDown, onPointerMove, onPointerUp };
}
