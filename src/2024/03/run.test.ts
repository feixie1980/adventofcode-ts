import { sumMulInstructions, tmp } from './utils';

describe('tmp', () => {
  test('tmp should return ', () => {
    expect(tmp()).toBe(false);
  });
});

describe('part 1', () => {
  test('sumMulInstructions', () => {
    expect(sumMulInstructions(['mul(2,4)', 'mul(13,0)'])).toEqual(8);
    expect(sumMulInstructions(['mul(2,4)', 'mul(1,3)'])).toEqual(11);
  });
});

describe('part 2', () => {
  test('sumMulInstructions', () => {
    expect(sumMulInstructions(['mul(2,4)', "don't()", 'mul(13,1)'])).toEqual(8);
    expect(
      sumMulInstructions([
        'mul(2,4)',
        "don't()",
        'mul(1,3)',
        'do()',
        'mul(2,7)',
      ])
    ).toEqual(22);
  });
});
