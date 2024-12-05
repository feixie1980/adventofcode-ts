import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { parseInputFile, tmp, sumMulInstructions } from './utils';

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
  const instructions = parseInputFile(inputFile);

  const answer1 = sumMulInstructions(instructions);
  console.log(answer1);
})();
