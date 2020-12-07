import { IntProgram, runProgram } from '../util/intcode';
import { test, TestCase } from '../util/test';

const testCases1: TestCase<IntProgram,number>[] = [
  [[1,9,10,3,2,3,11,0,99,30,40,50], 3500],
  [[1,0,0,0,99], 2],
  [[1,1,1,4,99,5,6,0,99], 30],
];

function evalProgram(program: IntProgram): number {
    runProgram(program);
    const result = program[0];
    return result;
}

function runProgramArgs(program: IntProgram, arg1: number, arg2: number): number {
    program = program.slice();
    program[1] = arg1;
    program[2] = arg2;
    //printProgram(program);
    const result = evalProgram(program);
    return result;
}

function findResultArgs(program: IntProgram, desired: number): { noun: number, verb: number } | undefined {
    for (let noun = 0; noun <= 99; ++noun) {
        for (let verb = 0; verb <= 99; ++verb) {
            const result2 = runProgramArgs(program, noun, verb);
            if (result2 === desired) {
                return {
                    noun: noun,
                    verb: verb,
                };
            }
        }
    }
    return undefined;
}

export function run(lines: string[]) {
    test(evalProgram, testCases1);

    const program = lines[0].split(',').map(Number);

    const result1 = runProgramArgs(program, 12, 2);
    console.log(`Run 1: ${result1}`);

    const result2 = findResultArgs(program, 19690720);
    console.log(`Run 2: ${100 * result2.noun + result2.verb}`);
}
