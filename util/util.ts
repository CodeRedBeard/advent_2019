export function notEmpty(x: string) {
  return (x.length > 0) && (x !== '\r');
}
