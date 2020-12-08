export function notEmpty(x: string) {
  return (x.length > 0) && (x !== '\r');
}

export function getFirst<T>(list: Iterable<T>): T | undefined {
  for (const first of list) {
    return first;
  }
  return undefined;
}
