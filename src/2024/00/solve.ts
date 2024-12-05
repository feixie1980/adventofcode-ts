import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { parseInputFile, tmp } from './utils';

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
  const reports = parseInputFile(inputFile);

  const answer1 = tmp();
  console.log('part 1 answer:');
  console.log(answer1);

  console.log('part 2 answer:');
  const answer2 = tmp();
  console.log(answer2);
})();
