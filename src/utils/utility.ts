export function isVoid(arg: any): boolean {
  return arg === null || arg === undefined;
}

export function isNotVoid(arg: any): boolean {
  return !isVoid(arg);
}
