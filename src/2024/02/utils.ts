import fs from 'fs';
import { report } from 'process';
import { boolean } from 'yargs';

export function parseInputFile(inputFile: string) {
  const input = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  return parseNumberArrays(input);
}

export function parseNumberArrays(input: string): number[][] {
  return input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(/\s+/).map(Number));
}

export function tmp(): boolean {
  return false;
}

export function isUnsafe(report: number[]): number {
  const direction = report[1] - report[0];

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    if (direction * diff < 0) {
      // not in order
      return i + 1;
    }

    const absDiff = Math.abs(diff);
    if (absDiff <= 0 || absDiff > 3) {
      return i + 1;
    }
  }

  return -1;
}

export function tryFixReport(report: number[]): boolean {
  const unsafeIndex = isUnsafe(report);
  if (unsafeIndex === -1) {
    return true;
  }

  // try remove unsafeIndex
  for (let i = 0; i < 3; i++) {
    const fixedReport = [...report].toSpliced(unsafeIndex - i, 1);
    if (isUnsafe(fixedReport) === -1) {
      return true;
    }
  }

  return false;
}
