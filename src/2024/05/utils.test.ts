import { buildOrderGraph, fixOrder, validateOrder } from './utils';

const exampleOrders = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

describe('buildOrderGraph', () => {
  test('should correctly build an order graph from input orders', () => {
    const graph = buildOrderGraph(exampleOrders);

    // Check that all numbers from the orders are in the graph
    const allNumbers = new Set(exampleOrders.flat());
    expect(graph.size).toBe(allNumbers.size);

    // Specific checks for some known dependencies
    expect(graph.get(53)).toEqual(expect.arrayContaining([47, 97, 61, 75]));
    expect(graph.get(13)).toEqual(
      expect.arrayContaining([97, 61, 29, 47, 75, 53])
    );
    expect(graph.get(29)).toEqual(expect.arrayContaining([97, 75, 61, 47]));
    expect(graph.get(61)).toEqual(expect.arrayContaining([97, 47]));
    expect(graph.get(97)).toEqual([]);
  });

  it('should handle empty input', () => {
    const graph = buildOrderGraph([]);
    expect(graph.size).toBe(0);
  });

  it('should handle single order', () => {
    const orders = [[1, 2]];
    const graph = buildOrderGraph(orders);

    expect(graph.size).toBe(2);
    expect(graph.get(2)).toEqual([1]);
    expect(graph.get(1)).toEqual([]);
  });
});

describe('validateOrder', () => {
  test('valid orders', () => {
    expect(validateOrder([75, 47, 61, 53, 29], exampleOrders)).toBe(true);
    expect(validateOrder([97, 61, 53, 29, 13], exampleOrders)).toBe(true);
    expect(validateOrder([75, 29, 13], exampleOrders)).toBe(true);
  });

  test('invalid orders', () => {
    expect(validateOrder([75, 97, 47, 61, 53], exampleOrders)).toBe(false);
    expect(validateOrder([61, 13, 29], exampleOrders)).toBe(false);
    expect(validateOrder([97, 13, 75, 29, 47], exampleOrders)).toBe(false);
  });
});

describe('fixOrder', () => {
  test('one swap', () => {
    expect(fixOrder([75, 97, 47, 61, 53], exampleOrders)).toEqual([
      97, 75, 47, 61, 53,
    ]);

    expect(fixOrder([61, 13, 29], exampleOrders)).toEqual([61, 29, 13]);
  });

  test('multi swaps', () => {
    expect(fixOrder([97, 13, 75, 29, 47], exampleOrders)).toEqual([
      97, 75, 47, 29, 13,
    ]);
  });
});
