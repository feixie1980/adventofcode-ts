import {
  parseColumns,
  parseInputFile,
  totalDistance,
  similarityScore,
} from './utils';

const path = './src/2024/01';

describe('Parsing', () => {
  test('parseColumns should correctly parse two columns of numbers', () => {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

    const [column1, column2] = parseColumns(input);

    expect(column1).toEqual([3, 4, 2, 1, 3, 3]);
    expect(column2).toEqual([4, 3, 5, 3, 9, 3]);
  });
});

describe('Part 1', () => {
  test('example for part 1', () => {
    const [arr1, arr2] = parseInputFile(`${path}/example1.txt`);
    const d = totalDistance(arr1, arr2);
    expect(d).toEqual(11);
  });
});

describe('Part 2', () => {
  test('example for part 2', () => {
    const [arr1, arr2] = parseInputFile(`${path}/example1.txt`);
    const d = similarityScore(arr1, arr2);
    expect(d).toEqual(31);
  });
});
