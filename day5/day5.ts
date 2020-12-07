import { IntProgram, IntProgramCode, runProgram } from '../util/intcode';
import { test, TestCase } from '../util/test';

interface InOutTest {code: IntProgramCode; val: number;}
const testCasesInOut: TestCase<InOutTest, number>[] = [
  [{
    code: [3, 0, 4, 0, 99],
    val: 123
  }, 123],
  [{
    code: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    val: 8
  }, 1],
  [{
    code: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    val: 7
  }, 1],
  [{
    code: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    val: 8
  }, 0],
  [{
    code: [3,3,1108,-1,8,3,4,3,99],
    val: 8
  }, 1],
  [{
    code: [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
    val: 0
  }, 0],
  [{
    code: [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
    val: 10
  }, 1],
  [{
    code: [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
    val: 0
  }, 0],
  [{
    code: [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
    val: 10
  }, 1],
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
    code: inProgram.code.slice(),
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
  console.log(`Part1 (AC diag output): ${result_1}`);

  const result_2 = evalProgramOutput({
    code: program,
    input: () => 5,
  });
  console.log(`Part2 (Radiator diag output): ${result_2}`);
}
