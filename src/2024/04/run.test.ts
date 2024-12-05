import {
  tmp,
  parseBoard,
  findMatch,
  grepWord,
  findMatchForBoard,
  parseInputFile,
  findCrossMasMatch,
} from './utils';

const path = './src/2024/04';

const example = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`;

describe('tmp', () => {
  test('tmp should return ', () => {
    expect(tmp()).toBe(false);
  });
});

describe('findMatchForBoard', () => {
  const board = parseBoard(example);

  test('small example', () => {
    expect(findMatchForBoard(board)).toEqual(4);
  });

  test('big example', () => {
    const board = parseInputFile(`${path}/example1.txt`);
    expect(findMatchForBoard(board)).toEqual(18);
  });
});

describe('hasMatch()', () => {
  const board = parseBoard(example);

  test('should return true for horizontal match', () => {
    expect(findMatch(board, 0, 3)).toEqual(1);
    expect(findMatch(board, 4, 1)).toEqual(1);
  });

  test('should return true for vertical match', () => {
    expect(findMatch(board, 1, 4)).toEqual(1);
  });

  test('should return true for diagonal match', () => {
    expect(findMatch(board, 2, 0)).toEqual(1);
  });

  test('should return false for no match', () => {
    expect(findMatch(board, 1, 3)).toEqual(0);
    expect(findMatch(board, 4, 2)).toEqual(0);
  });
});

describe('grepWord()', () => {
  const board = parseBoard(example);

  test('test word grepping horizontal', () => {
    expect(grepWord(board, 0, 0, 1, 0, 4)).toEqual('..X.');
    expect(grepWord(board, 0, 0, -1, 0, 4)).toEqual('.');
    expect(grepWord(board, 1, 3, -1, 0, 4)).toEqual('MX');
  });

  test('test word grepping vertical', () => {
    expect(grepWord(board, 1, 1, 0, 1, 4)).toEqual('SAMX');
    expect(grepWord(board, 1, 1, 0, -1, 4)).toEqual('S.');
  });

  test('test word grepping diagonal', () => {
    expect(grepWord(board, 0, 0, 1, 1, 4)).toEqual('.S.S');
    expect(grepWord(board, 2, 0, 1, 1, 4)).toEqual('XMAS');
    expect(grepWord(board, 3, 3, -1, -1, 3)).toEqual('S.S');
    expect(grepWord(board, 3, 3, 1, -1, 5)).toEqual('SA.');
  });
});

describe('findCrossMasMatch()', () => {
  const board = parseBoard(example);

  test('should return 0 when center is not A', () => {
    expect(findCrossMasMatch(board, 0, 0)).toBe(0);
    expect(findCrossMasMatch(board, 4, 1)).toBe(0);
  });

  test('should return 0 when A is at board border', () => {
    const borderBoard = parseBoard(`A....
.....
.....`);
    expect(findCrossMasMatch(borderBoard, 0, 0)).toBe(0);
  });

  test('should not find match', () => {
    const matchBoard = parseBoard(`...
.A.
M.S
.A.
S.M`);
    expect(findCrossMasMatch(matchBoard, 1, 1)).toBe(0);
  });

  test('should find match 1', () => {
    const matchBoard = parseBoard(`...
.A.
M.S
.A.
M.S`);
    expect(findCrossMasMatch(matchBoard, 1, 3)).toEqual(1);
  });

  test('should find match 2', () => {
    const matchBoard = parseBoard(`...
.A.
M.M
.A.
S.S`);
    expect(findCrossMasMatch(matchBoard, 1, 3)).toBe(1);
  });

  test('should find match 3', () => {
    const matchBoard = parseBoard(`...
.A.
S.M
.A.
S.M`);
    expect(findCrossMasMatch(matchBoard, 1, 3)).toBe(1);
  });

  test('should return 0 when no cross MAS match exists', () => {
    const noMatchBoard = parseBoard(`...
.A.
M.S
.A.
M.M`);
    expect(findCrossMasMatch(noMatchBoard, 1, 1)).toBe(0);
  });
});
