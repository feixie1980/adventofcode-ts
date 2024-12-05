import fs from 'fs';

export type MulInstruction = {
  left: number;
  right: number;
};

export function parseInputFile(inputFile: string) {
  const input = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  return parse(input);
}

export function parse(input: string): string[] | null {
  const pattern = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;
  return input.match(pattern);
}

export function sumMulInstructions(instructions: string[] | null): number {
  if (!instructions) {
    return -1;
  }

  let enabled = true;
  let sum = 0;

  for (const instruction of instructions) {
    if (instruction === 'do()') {
      enabled = true;
      continue;
    }

    if (instruction === "don't()") {
      enabled = false;
      continue;
    }

    if (enabled) {
      instruction.replaceAll(
        /(mul\()(\d+)(,)(\d+)(\))/g,
        (match, m1, v1, m2, v2, m3) => {
          sum += parseInt(v1) * parseInt(v2);
          return instruction;
        }
      );
    }
  }

  return sum;
}

export function tmp(): boolean {
  return false;
}
