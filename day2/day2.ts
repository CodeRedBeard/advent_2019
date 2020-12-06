import { test, TestCase } from '../test';

type IntProgram = number[];
const testCases1: TestCase<IntProgram,number>[] = [
  [[1,9,10,3,2,3,11,0,99,30,40,50], 3500],
  [[1,0,0,0,99], 2],
  [[1,1,1,4,99,5,6,0,99], 30],
];

function runOpCode(idx: number, program: IntProgram): boolean {
    const op = program[idx];
    if (op === 99) {
        return false;
    }
    const ia = program[idx + 1];
    const ib = program[idx + 2];
    const ic = program[idx + 3];
    const a = program[ia];
    const b = program[ib];
    switch (op) {
        case 1: {
            program[ic] = a + b;
            return true;
        }
        case 2:
            program[ic] = a * b;
            return true;
    }
    throw new Error(`Invalid op: ${op} @ ${idx}`);
}

function runProgram(program: IntProgram) {
    for (let idx = 0; runOpCode(idx, program); idx += 4) {
        //
    }
}

function printProgram(program: IntProgram) {
    for (let x = 0; x < program.length; x += 4) {
        const ops = program.slice(x, x + 4)
        console.log(ops);
    }
}

function evalProgram(program: IntProgram): number {
    console.log(`RUNNING...`);
    runProgram(program);

    const result = program[0];
    console.log(`DONE: ${result}`);

    return result;
}

export function run(lines: string[]) {
    test(evalProgram, testCases1);

    const program = lines[0].split(',').map(Number);

    const program1 = program.slice();
    program1[1] = 12;
    program1[2] = 2;
    printProgram(program1);
    console.log(`Run 1: ${evalProgram(program1)}`);
}
