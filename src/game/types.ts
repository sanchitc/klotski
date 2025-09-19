export type BlockType = 'HERO' | 'VERT_2' | 'HORIZ_2' | 'SINGLE';

export interface Block {
  id: string;
  type: BlockType;
  w: number; // width in cells
  h: number; // height in cells
  r: number; // top-left row
  c: number; // top-left col
}

export interface GameState {
  blocks: Block[];
  moves: number;
  isWon: boolean;
}

export interface BoardSpec {
  rows: number;
  cols: number;
  exit: { r: number; c: number; w: number }; // exit is beyond bottom edge; r = 5, c = 1, w = 2
}
