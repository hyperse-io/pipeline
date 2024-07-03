export type PipeCallback = (fns: string, ...args: unknown[]) => unknown;

export type Exists =
  | boolean
  | string
  | number
  | bigint
  | symbol
  | void
  | null
  | object;

export type ExitPipeReturnValue<T> = { r: T };
