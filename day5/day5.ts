import { IntProgram, IntProgramCode, runProgram } from '../util/intcode';
import { test, TestCase } from '../util/test';

interface InOutTest {code: IntProgramCode; val: number;}
const testCasesInOut: TestCase<InOutTest, number>[] = [
  [
    {
      code: [3, 0, 4, 0, 99],
      val: 123
    },
    123],
];

interface AddrTest {code: IntProgramCode; addr: number;}
const testCasesMult: TestCase<AddrTest, number>[] = [
  [{
    code: [1002, 4, 3, 4, 33],
    addr: 4
  },
    99
  ],
];

function evalProgramOutput(inProgram: IntProgram): number[] {
  let outVals = new Array<number>();
  let program: IntProgram = {
    code: inProgram.code,
    input: inProgram.input,
    output: (x) => {
      outVals.push(x);
      if (inProgram.output) {
        inProgram.output(x);
      }
    },
  };
  runProgram(program);
  return outVals;
}

function testProgramOutput(programCodeTest: InOutTest): number {
  const testVal = programCodeTest.val;
  const outVals = evalProgramOutput({
    code: programCodeTest.code,
    input: () => testVal,
  });
  return outVals[outVals.length - 1];
}

function evalProgramAddr(program: AddrTest): number {
  runProgram({code: program.code});
  const result = program.code[program.addr];
  return result;
}

export function run(lines: string[]) {
  test(testProgramOutput, testCasesInOut);
  test(evalProgramAddr, testCasesMult);

  const program = lines[0].split(',').map(Number);
  const result_1 = evalProgramOutput({
    code: program,
    input: () => 1,
  });
  console.log(`Part1 (Diag output): ${result_1}`);
}
