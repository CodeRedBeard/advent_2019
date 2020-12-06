import { test, TestCase } from '../test';

const testCases1: TestCase<string,number>[] = [
  ['12', 2],
  ['1969', 654],
  ['100756', 33583],
];
const testCases2: TestCase<string,number>[] = [
  ['14', 2],
  ['100756', 50346],
];

function calcFuel(line: string | number) {
  return Math.floor(Number(line) / 3) - 2;
}

function calcFuelFull(line: string | number) {
  let sum = 0;
  let prev = line;
  while (true) {
    let val = calcFuel(prev);
    if (val <= 0) {
      break;
    }
    sum += val;
    prev = val;
  }
  return sum;
}

export function run(lines: string[]) {
  test(calcFuel, testCases1);
  test(calcFuelFull, testCases2);

  lines = lines.filter(x => x.length > 0);
  let fuels = lines.map(calcFuel);
  let sum = fuels.reduce((p, c) => p + c);
  console.log(`Sum 1: ${sum}`);

  let fuels2 = lines.map(calcFuelFull);
  let sum2 = fuels2.reduce((p, c) => p + c);
  console.log(`Sum 2: ${sum2}`);

}
