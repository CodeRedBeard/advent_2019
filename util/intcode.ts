export type IntProgramCode = number[];
export interface IntProgram {
  readonly code: IntProgramCode;
  readonly input?: InputFunc;
  readonly output?: OutputFunc;
}
export type InputFunc = () => number;
export type OutputFunc = (out: number) => void;

interface ProgramInstance extends IntProgram {
  instIndex: number;
  instCount: number;
}

function runOpCode(program: ProgramInstance): number | undefined {
  const code = program.code;
  const idx = program.instIndex;
  const inst = code[idx];
  if (inst === 99) {
      return undefined;
  }
  const op = Math.floor(inst) % 100;
  function getParam(pIndex: number) {
    const pMode = Math.floor(inst / Math.pow(10, 1 + pIndex)) % 10;
    const pVal = code[idx + pIndex];
    switch (pMode) {
      case 0: // position (address)
        return code[pVal];
      case 1: // immediate
        return pVal;
      default:
        throw Error();
    }
  }
  function setParam(pIndex: number, val: number) {
    const pMode = Math.floor(inst / Math.pow(10, 1 + pIndex)) % 10;
    const pVal = code[idx + pIndex];
    switch (pMode) {
      case 0: // position (address)
        code[pVal] = val;
        return;
      case 1: // immediate
        throw Error();
      default:
        throw Error();
    }
  }
  switch (op) {
    case 1: { // add
      const val = getParam(1) + getParam(2);
      setParam(3, val);
      return 4;
    }
    case 2: { // mult
      const val = getParam(1) * getParam(2);
      setParam(3, val);
      return 4;
    }
    case 3: { // input
      const val = program.input();
      setParam(1, val);
      return 2;
    }
    case 4: { // output
      const val = getParam(1);
      program.output(val);
      return 2;
    }
    case 5: { // jump-if-true
      const val = getParam(1);
      const ptr = getParam(2);
      if (val !== 0) {
        program.instIndex = ptr;
        return 0;
      }
      return 3;
    }
    case 6: { // jump-if-false
      const val = getParam(1);
      const ptr = getParam(2);
      if (val === 0) {
        program.instIndex = ptr;
        return 0;
      }
      return 3;
    }
    case 7: { // less-than
      const a = getParam(1);
      const b = getParam(2);
      const val = (a < b) ? 1 : 0;
      setParam(3, val);
      return 4;
    }
    case 8: { // equals
      const a = getParam(1);
      const b = getParam(2);
      const val = (a === b) ? 1 : 0;
      setParam(3, val);
      return 4;
    }
  }
  throw new Error(`Invalid op: ${op} @ ${idx}`);
}

export function runProgram(program: IntProgram): ProgramInstance {
  const runningProgram = Object.assign({}, program, {
    instIndex: 0,
    instCount: 0,
  });
  while (true) {
    const result = runOpCode(runningProgram);
    ++runningProgram.instCount;
    if (result === undefined) {
      break;
    }
    runningProgram.instIndex += result;
  }
  return runningProgram;
}

export function printProgram(program: IntProgram) {
  for (let x = 0; x < program.code.length; x += 4) {
      const ops = program.code.slice(x, x + 4)
      console.log(ops);
  }
}
