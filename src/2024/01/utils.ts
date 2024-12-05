import fs from 'fs';

export function parseInputFile(inputFile: string) {
  const input = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  return parseColumns(input);
}

export function parseColumns(input: string): [number[], number[]] {
  const lines = input.trim().split('\n');
  const column1: number[] = [];
  const column2: number[] = [];

  for (const line of lines) {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    column1.push(num1);
    column2.push(num2);
  }

  return [column1, column2];
}

export function totalDistance(arr1: number[], arr2: number[]): number {
  const sortedArr1 = arr1.toSorted();
  const sortedArr2 = arr2.toSorted();

  let sum = 0;
  for (let i = 0; i < arr1.length; i++) {
    sum += Math.abs(sortedArr1[i] - sortedArr2[i]);
  }

  return sum;
}

export function similarityScore(arr1: number[], arr2: number[]): number {
  let score = 0;

  for (const num of arr1) {
    score += arr2.filter((n) => n === num).length * num;
  }

  return score;
}
