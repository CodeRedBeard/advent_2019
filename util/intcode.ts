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

function runOpCode(idx: number, program: ProgramInstance): number | undefined {
  const code = program.code;
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
    case 1: {
      const val = getParam(1) + getParam(2);
      setParam(3, val);
      return 4;
    }
    case 2: {
      const val = getParam(1) * getParam(2);
      setParam(3, val);
      return 4;
    }
    case 3: {
      const val = program.input();
      setParam(1, val);
      return 2;
    }
    case 4: {
      const val = getParam(1);
      program.output(val);
      return 2;
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
    const result = runOpCode(runningProgram.instIndex, runningProgram);
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
