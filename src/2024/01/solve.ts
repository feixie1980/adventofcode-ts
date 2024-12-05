import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import {
  parseColumns,
  parseInputFile,
  similarityScore,
  totalDistance,
} from './utils';

interface ScriptOptions {
  input_file: string;
}

function getInputs(): ScriptOptions {
  return yargs(hideBin(process.argv))
    .option('input_file', {
      alias: 'i',
      type: 'string',
      description: 'input file',
      demandOption: true,
    })
    .usage('Usage: npx tsx solve.ts --input_file=/path/to/file')
    .help()
    .alias('help', 'h').argv as ScriptOptions;
}

(async () => {
  const { input_file: inputFile } = getInputs();
  const [arr1, arr2] = parseInputFile(inputFile);

  const answer1 = totalDistance(arr1, arr2);
  console.log('part 1 answer:');
  console.log(answer1);

  console.log('part 2 answer:');
  const answer2 = similarityScore(arr1, arr2);
  console.log(answer2);
})();
export { parseColumns };
