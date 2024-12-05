import { isUnsafe, tryFixReport } from './utils';

describe('isUnsafe function', () => {
  test('should return -1 when in order and adjacent numbers have difference is 1 or 2 or 3', () => {
    expect(isUnsafe([7, 6, 4, 2, 1])).toBe(-1);
    expect(isUnsafe([1, 3, 6, 7, 9])).toBe(-1);
  });

  test('should return the index when adjacent numbers have difference is NOT 1 or 2 or 3', () => {
    expect(isUnsafe([1, 2, 7, 8, 9])).toBe(2);
    expect(isUnsafe([9, 7, 6, 2, 1])).toBe(3);
    expect(isUnsafe([8, 6, 4, 4, 1])).toBe(3);
  });

  test('should return the index when not in order', () => {
    expect(isUnsafe([1, 3, 2, 4, 5])).toBe(2);
  });
});

describe('fixReport function', () => {
  test('should return true if report is already save', () => {
    expect(tryFixReport([7, 6, 4, 2, 1])).toBe(true);
    expect(tryFixReport([1, 3, 6, 7, 9])).toBe(true);
  });

  test('should return true if report is fixable', () => {
    expect(tryFixReport([1, 3, 2, 4, 5])).toBe(true);
    expect(tryFixReport([8, 6, 4, 4, 1])).toBe(true);
    expect(tryFixReport([8, 9, 8, 6, 5])).toBe(true);
  });

  test('should return false if report is not fixable', () => {
    expect(tryFixReport([1, 2, 7, 8, 9])).toBe(false);
    expect(tryFixReport([9, 7, 6, 2, 1])).toBe(false);
  });
});
