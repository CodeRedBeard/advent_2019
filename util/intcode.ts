export type IntProgram = number[];

export function runOpCode(idx: number, program: IntProgram): boolean {
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

export function runProgram(program: IntProgram) {
  for (let idx = 0; runOpCode(idx, program); idx += 4) {
      //
  }
}

export function printProgram(program: IntProgram) {
  for (let x = 0; x < program.length; x += 4) {
      const ops = program.slice(x, x + 4)
      console.log(ops);
  }
}
