import Board from './components/Board';
import HUD from './components/HUD';
import WinOverlay from './components/WinOverlay';
import { useGame } from './game/useGame';
import { useDrag } from './game/useDrag';
import { useCallback } from 'react';

export default function App() {
  const { BOARD, state, restart, updateBlock } = useGame();
  
  // Calculate cellPx based on the actual computed board size
  const cellPx = typeof window !== 'undefined' ? (() => {
    // Create a temporary element to get the computed value
    const temp = document.createElement('div');
    temp.style.width = 'var(--board)';
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    document.body.appendChild(temp);
    
    const boardSize = temp.offsetWidth;
    document.body.removeChild(temp);
    
    return boardSize / 4; // 4x4 grid
  })() : 80;
  
  const drag = useDrag(BOARD.rows, BOARD.cols, state.blocks, updateBlock);

  const handlersFor = useCallback((b: any) => ({
    onPointerDown: (e: any) => drag.onPointerDown(e, b),
    onPointerMove: (e: any) => drag.onPointerMove(e),
    onPointerUp:   (e: any) => drag.onPointerUp(e, cellPx),
  }), [drag.onPointerDown, drag.onPointerMove, drag.onPointerUp, cellPx]);

  return (
    <div style={{ 
      minHeight: '100dvh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '12px' 
    }}>
      <h1 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Klotski — Classic</h1>
      <Board blocks={state.blocks} onBlockHandlers={handlersFor} />
      <HUD moves={state.moves} onRestart={restart} />
      {state.isWon && <WinOverlay onReplay={restart} />}
    </div>
  );
}