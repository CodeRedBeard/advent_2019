export type TestCase<T,Y> = [T,Y];
export function test<T, Y>(f: (t: T) => Y, cases: TestCase<T,Y>[]) {
  cases.forEach(([vIn, vOut], idx) => {
    let v = f(vIn);
    if (vOut !== v) {
      throw new Error(
        `case [${idx}]: ${vOut} != f(${vIn})`);
    }
  });
}
