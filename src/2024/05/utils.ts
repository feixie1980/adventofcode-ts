import fs from 'fs';

export function parseInputFile(inputFile: string) {
  const input = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  return parse(input);
}

export function parse(input: string) {
  const orders: number[][] = [];
  const prints: number[][] = [];

  input.split('\n').forEach((line) => {
    if (line.includes('|')) {
      orders.push(line.split('|').map(Number));
    }

    if (line.includes(',')) {
      prints.push(line.split(',').map(Number));
    }
  });

  return { orders, prints };
}

export function tmp(): boolean {
  return false;
}

export function buildOrderGraph(orders: number[][]): Map<number, number[]> {
  const map = new Map<number, number[]>();

  for (const [n1, n2] of orders) {
    if (!map.has(n1)) {
      map.set(n1, []);
    }
    if (!map.has(n2)) {
      map.set(n2, []);
    }

    map.get(n2)?.push(n1);
  }

  return map;
}

export function validateOrder(print: number[], orders: number[][]): boolean {
  for (const order of orders) {
    const index1 = print.indexOf(order[0]);
    const index2 = print.indexOf(order[1]);
    if (index1 === -1 || index2 === -1) {
      continue;
    }
    if (index1 > index2) {
      return false;
    }
  }
  return true;
}

export function fixOrder(print: number[], orders: number[][]): number[] {
  const newPrint = [...print];

  for (let i = 0; i < orders.length; i++) {
    if (validateOrder(newPrint, orders)) {
      break;
    }

    for (let j = i; j >= 0; j--) {
      const order = orders[j];
      const index1 = newPrint.indexOf(order[0]);
      const index2 = newPrint.indexOf(order[1]);
      if (index1 === -1 || index2 === -1) {
        continue;
      }
      if (index1 > index2) {
        [newPrint[index2], newPrint[index1]] = [
          newPrint[index1],
          newPrint[index2],
        ];
      }
    }
  }

  return newPrint;
}

export function sumValidPrints(prints: number[][], orders: number[][]): number {
  return prints.reduce((sum, print) => {
    const mIndex = Math.floor(print.length / 2);
    return validateOrder(print, orders) ? sum + print[mIndex] : sum;
  }, 0);
}

export function sumFixedValidPrints(
  prints: number[][],
  orders: number[][]
): number {
  return prints.reduce((sum, print) => {
    if (validateOrder(print, orders)) {
      return sum;
    }

    const mIndex = Math.floor(print.length / 2);
    const newPrint = fixOrder(print, orders);
    return sum + newPrint[mIndex];
  }, 0);
}
