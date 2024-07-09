import type { Either, Maybe, Validation } from 'monet';
import type { FpTsEither } from './types-fp-ts.js';
import type { Either as PurifyEither } from './types-purify-either.js';
import type { EitherAsync } from './types-purify-either-async.js';
import type { Maybe as PurifyMaybe } from './types-purify-maybe.js';
import type { MaybeAsync } from './types-purify-maybe-async.js';
import type { ExitPipeReturnValue } from './types-reactive.js';

export type PipeFuncReturn<T, L, R> =
  | Promise<
      | FpTsEither<L, T>
      | MaybeAsync<T>
      | EitherAsync<L, T>
      | PurifyEither<L, T>
      | PurifyMaybe<T>
      | Either<L, T>
      | (T extends {} ? Maybe<T> : T)
      | ExitPipeReturnValue<R>
      | Validation<L, T>
      | T
    >
  | MaybeAsync<T>
  | EitherAsync<L, T>
  | PurifyMaybe<T>
  | Validation<L, T>
  | (T extends {} ? Maybe<T> : T)
  | ExitPipeReturnValue<R>
  | Either<L, T>
  | PurifyEither<L, T>
  | FpTsEither<L, T>
  | T;

export type PipeReturn1<FnResult, F1> = FnResult & {
  replace: (r: [0, F1][]) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn2<FnResult, F1, F2> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2]>) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn3<FnResult, F1, F2, F3> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3]>) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn4<FnResult, F1, F2, F3, F4> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4]>) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn5<FnResult, F1, F2, F3, F4, F5> = FnResult & {
  replace: (
    r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5]>
  ) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn6<FnResult, F1, F2, F3, F4, F5, F6> = FnResult & {
  replace: (
    r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6]>
  ) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn7<FnResult, F1, F2, F3, F4, F5, F6, F7> = FnResult & {
  replace: (
    r: Array<
      [0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6] | [6, F7]
    >
  ) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn8<FnResult, F1, F2, F3, F4, F5, F6, F7, F8> = FnResult & {
  replace: (
    r: Array<
      | [0, F1]
      | [1, F2]
      | [2, F3]
      | [3, F4]
      | [4, F5]
      | [5, F6]
      | [6, F7]
      | [7, F8]
    >
  ) => FnResult;
  replaceUndo: () => FnResult;
  context: (ctx: unknown) => FnResult;
};

export type PipeReturn9<FnResult, F1, F2, F3, F4, F5, F6, F7, F8, F9> =
  FnResult & {
    replace: (
      r: Array<
        | [0, F1]
        | [1, F2]
        | [2, F3]
        | [3, F4]
        | [4, F5]
        | [5, F6]
        | [6, F7]
        | [7, F8]
        | [8, F9]
      >
    ) => FnResult;
    replaceUndo: () => FnResult;
    context: (ctx: unknown) => FnResult;
  };

export type PipeReturn10<FnResult, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10> =
  FnResult & {
    replace: (
      r: Array<
        | [0, F1]
        | [1, F2]
        | [2, F3]
        | [3, F4]
        | [4, F5]
        | [5, F6]
        | [6, F7]
        | [7, F8]
        | [8, F9]
        | [9, F10]
      >
    ) => FnResult;
    replaceUndo: () => FnResult;
    context: (ctx: unknown) => FnResult;
  };
