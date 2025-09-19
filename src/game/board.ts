import type { Block } from './types';

export function buildGrid(rows: number, cols: number, blocks: Block[]): (string | null)[][] {
  const grid: (string | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null)
  );
  for (const b of blocks) {
    for (let rr = b.r; rr < b.r + b.h; rr++) {
      for (let cc = b.c; cc < b.c + b.w; cc++) {
        if (rr >= 0 && cc >= 0 && rr < rows && cc < cols) grid[rr][cc] = b.id;
      }
    }
  }
  return grid;
}

export function canPlace(blocks: Block[], rows: number, cols: number, id: string, r: number, c: number): boolean {
  const b = blocks.find(x => x.id === id)!;
  if (r < 0 || c < 0 || r + b.h > rows || c + b.w > cols) return false;
  for (const other of blocks) {
    if (other.id === id) continue;
    if (!(c + b.w <= other.c || other.c + other.w <= c || r + b.h <= other.r || other.r + other.h <= r)) {
      return false;
    }
  }
  return true;
}
 