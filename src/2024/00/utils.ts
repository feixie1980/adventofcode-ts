import fs from 'fs';

export function parseInputFile(inputFile: string) {
  const input = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  return parse(input);
}

export function parse(input: string): void {}

export function tmp(): boolean {
  return false;
}
