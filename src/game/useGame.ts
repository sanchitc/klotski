import { useCallback, useState } from 'react';
import { BOARD, CLASSIC_BLOCKS } from './classic';
import type { Block, GameState } from './types';

export function useGame() {
  const [state, setState] = useState<GameState>({
    blocks: CLASSIC_BLOCKS,
    moves: 0,
    isWon: false
  });

  const restart = useCallback(() => {
    setState({ blocks: CLASSIC_BLOCKS.map(b => ({ ...b })), moves: 0, isWon: false });
  }, []);

  const updateBlock = useCallback((id: string, r: number, c: number, countMove: boolean) => {
    setState(s => {
      const blocks = s.blocks.map(b => (b.id === id ? { ...b, r, c } : b));
      const isWon = checkWin(blocks);
      return { blocks, moves: countMove ? s.moves + 1 : s.moves, isWon };
    });
  }, []);

  const checkWin = (blocks: Block[]) => {
    const hero = blocks.find(b => b.id === 'H')!;
    // exit sits "beyond" bottom edge at r = 5, c in [1,2]
    const bottom = hero.r + hero.h;
    const inExitCols = hero.c === BOARD.exit.c && hero.w === BOARD.exit.w;
    return bottom >= BOARD.exit.r && inExitCols;
  };

  return { BOARD, state, restart, updateBlock };
}
