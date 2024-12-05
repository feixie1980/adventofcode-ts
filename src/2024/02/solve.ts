import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { isUnsafe, parseInputFile, tmp, tryFixReport } from './utils';

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

  const answer1 = reports.reduce(
    (count, report) => (isUnsafe(report) === -1 ? count + 1 : count),
    0
  );
  console.log('part 1 answer:');
  console.log(answer1);

  console.log('part 2 answer:');
  const answer2 = reports.reduce(
    (count, report) => (tryFixReport(report) ? count + 1 : count),
    0
  );
  console.log(answer2);
})();
