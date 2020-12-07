import { test, TestCase } from "../util/test";

const testCases1: Array<TestCase<string, boolean>> = [
  ['111111', true],
  ['223450', false],
  ['123789', false],
];
const testCases2: Array<TestCase<string, boolean>> = [
  ['112233', true],
  ['123444', false],
  ['111122', true],
];

function isValidPass1(pass: string): boolean {
  let foundDouble = false;
  let digits = pass.split('');
  let prev = Number(digits[0]);
  for (let idx = 1; idx < digits.length; ++idx) {
    const curr = Number(digits[idx]);
    if (curr < prev) {
      return false;
    }
    if (curr === prev) {
      foundDouble = true;
    }
    prev = curr;
  }
  return foundDouble;
}

function isValidPass2(pass: string): boolean {
  if (!isValidPass1(pass)) {
    return false;
  }
  let foundDouble = false;
  let repeatCount = 0;
  let digits = pass.split('');
  let prev = Number(digits[0]);
  for (let idx = 1; idx < digits.length; ++idx) {
    const curr = Number(digits[idx]);
    if (curr === prev) {
      ++repeatCount;
    }
    else {
      if (repeatCount === 1) {
        foundDouble = true;
      }
      repeatCount = 0;
    }
    prev = curr;
  }
  if (repeatCount === 1) {
    foundDouble = true;
  }
  return foundDouble;
}

function solvePart1(input: string): number {
  let numValid = 0;
  let [min, max] = input.split('-').map(Number);
  for (let x = min; x <= max; ++x) {
    if (isValidPass1(String(x))) {
      ++numValid;
    }
  }
  return numValid;
}

function solvePart2(input: string): number {
  let numValid = 0;
  let [min, max] = input.split('-').map(Number);
  for (let x = min; x <= max; ++x) {
    if (isValidPass2(String(x))) {
      ++numValid;
    }
  }
  return numValid;
}

export function run(lines: string[]) {
  test(isValidPass1, testCases1);
  test(isValidPass2, testCases2);

  console.log(`Part1: ${solvePart1(lines[0])}`);
  console.log(`Part1: ${solvePart2(lines[0])}`);
}