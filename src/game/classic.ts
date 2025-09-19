import type { Block, BoardSpec } from './types';

export const BOARD: BoardSpec = {
  rows: 5,
  cols: 4,
  exit: { r: 5, c: 1, w: 2 }
};

export const CLASSIC_BLOCKS: Block[] = [
  { id: 'H',  type: 'HERO',    w: 2, h: 2, r: 0, c: 1 },
  { id: 'V1', type: 'VERT_2',  w: 1, h: 2, r: 0, c: 0 },
  { id: 'V2', type: 'VERT_2',  w: 1, h: 2, r: 0, c: 3 },
  { id: 'V3', type: 'VERT_2',  w: 1, h: 2, r: 2, c: 0 },
  { id: 'V4', type: 'VERT_2',  w: 1, h: 2, r: 2, c: 3 },
  { id: 'H1', type: 'HORIZ_2', w: 2, h: 1, r: 2, c: 1 },
  { id: 'S1', type: 'SINGLE',  w: 1, h: 1, r: 3, c: 1 },
  { id: 'S2', type: 'SINGLE',  w: 1, h: 1, r: 3, c: 2 },
  { id: 'H2', type: 'HORIZ_2', w: 2, h: 1, r: 4, c: 1 }
];
