import fs from 'fs';

export function parseInputFile(inputFile: string) {
  const input = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  return parseBoard(input);
}

export function parseBoard(input: string): string[][] {
  return input.split('\n').map((line) => line.split(''));
}

export function tmp(): boolean {
  return false;
}

export function findMatchForBoard(board: string[][]): number {
  let match = 0;
  for (let i = 0; i < board[0].length; i++) {
    for (let j = 0; j < board.length; j++) {
      match += findMatch(board, i, j);
    }
  }
  return match;
}

export function findMatch(board: string[][], x: number, y: number): number {
  let match = 0;
  const targetWord = 'XMAS';

  // right
  let word = grepWord(board, x, y, 1, 0, 4);
  if (word === targetWord) {
    match++;
  }

  // left
  word = grepWord(board, x, y, -1, 0, 4);
  if (word === targetWord) {
    match++;
  }

  // down
  word = grepWord(board, x, y, 0, 1, 4);
  if (word === targetWord) {
    match++;
  }

  // up
  word = grepWord(board, x, y, 0, -1, 4);
  if (word === targetWord) {
    match++;
  }

  // southeast
  word = grepWord(board, x, y, 1, 1, 4);
  if (word === targetWord) {
    match++;
  }

  // southwest
  word = grepWord(board, x, y, -1, 1, 4);
  if (word === targetWord) {
    match++;
  }

  // northeast
  word = grepWord(board, x, y, 1, -1, 4);
  if (word === targetWord) {
    match++;
  }

  // northwest
  word = grepWord(board, x, y, -1, -1, 4);
  if (word === targetWord) {
    match++;
  }

  return match;
}

export function findCrossMasMatchForBoard(board: string[][]): number {
  let match = 0;
  for (let i = 0; i < board[0].length; i++) {
    for (let j = 0; j < board.length; j++) {
      match += findCrossMasMatch(board, i, j);
    }
  }
  return match;
}

export function findCrossMasMatch(
  board: string[][],
  x: number,
  y: number
): number {
  // only search against the center A
  if (board[y][x] !== 'A') {
    return 0;
  }

  // (x, y) should not be around the borders the board
  if (x <= 0 || x >= board[0].length - 1 || y <= 0 || y >= board.length - 1) {
    return 0;
  }

  let match = 0;

  const diagTLtoLR = grepWord(board, x - 1, y - 1, 1, 1, 3);
  const diagTRtoLL = grepWord(board, x + 1, y - 1, -1, 1, 3);

  // M.M
  // .A.
  // S.S
  match = match + (diagTLtoLR === 'MAS' && diagTRtoLL === 'MAS' ? 1 : 0);

  // M.S
  // .A.
  // M.S
  match = match + (diagTLtoLR === 'MAS' && diagTRtoLL === 'SAM' ? 1 : 0);

  // S.M
  // .A.
  // S.M
  match = match + (diagTLtoLR === 'SAM' && diagTRtoLL === 'MAS' ? 1 : 0);

  // S.S
  // .A.
  // M.M
  match = match + (diagTLtoLR === 'SAM' && diagTRtoLL === 'SAM' ? 1 : 0);

  return match;
}

export function grepWord(
  board: string[][],
  x: number,
  y: number,
  deltaX: number,
  deltaY: number,
  length: number
): string {
  let r = '';
  for (let i = 0; i < length; i++) {
    r += board[y][x];
    x += deltaX;
    y += deltaY;

    if (x < 0 || x >= board[0].length || y < 0 || y >= board.length) {
      break;
    }
  }
  return r;
}
