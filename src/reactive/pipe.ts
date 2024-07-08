import { fold } from 'fp-ts/Either';
import type { Union } from 'ts-toolbelt';
import pipeWith from '@ramda/pipewith';
import { isPromise } from '../helper/helper-is-promise.js';
import {
  Exists,
  ExitPipeReturnValue,
  isFpTsEither,
  isMonetCata,
  isPurifyEither,
  isPurifyEitherAsync,
  isPurifyMaybe,
  isPurifyMaybeAsync,
  PipeCallback,
} from '../types/types-reactive.js';
import {
  ExtractExitPipe1,
  ExtractExitPipe2,
  ExtractExitPipe3,
  ExtractExitPipe4,
  ExtractExitPipe5,
  ExtractExitPipe6,
  ExtractExitPipe7,
  ExtractExitPipe8,
  ExtractExitPipe9,
  ExtractExitPipe10,
} from '../types/types-reactive-extract.js';
import {
  PipeFuncReturn,
  PipeReturn1,
  PipeReturn2,
  PipeReturn3,
  PipeReturn4,
  PipeReturn5,
  PipeReturn6,
  PipeReturn7,
  PipeReturn8,
  PipeReturn9,
  PipeReturn10,
} from '../types/types-reactive-return.js';

const pipeSymbol = Symbol('pipe');
const pipeContextFns = new WeakSet();
const exitPipeReturnValues = new WeakSet();
const replacementFns = new WeakMap<Function, Array<Function>>();
const beforeAllFns = new Set<PipeCallback>();
const afterAllFns = new Set<PipeCallback>();

const compose = (fn: Function, res: unknown): unknown => {
  if (isExitPipeValue(res)) {
    return res;
  }
  if (isMonetCata(res)) {
    return res.cata(
      (l) => fn(void 0, l),
      (r) => fn(r)
    );
  }
  if (isPurifyEither(res)) {
    return res.either(
      (l) => fn(void 0, l),
      (r) => fn(r)
    );
  }
  if (isPurifyMaybe(res)) {
    return res.caseOf({
      Just: (x) => fn(x),
      Nothing: () => fn(void 0),
    });
  }
  if (isPurifyEitherAsync(res) || isPurifyMaybeAsync(res)) {
    const promise: Promise<unknown> = res.run();
    return promise.then((x) => compose(fn, x)).catch(() => promise);
  }
  if (isFpTsEither(res)) {
    return fold(
      (l) => fn(void 0, l),
      (r) => fn(r)
    )(res);
  }
  return fn(res);
};

export function pipe<T1, L1, R1>(
  fn0: () => PipeFuncReturn<T1, L1, R1>
): PipeReturn1<
  () => Promise<
    Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, 'extends->'>
  >,
  typeof fn0
>;
export function pipe<V0, T1, L1, R1>(
  fn0: (x0: V0) => PipeFuncReturn<T1, L1, R1>
): PipeReturn1<
  (
    x0: V0
  ) => Promise<
    Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, 'extends->'>
  >,
  typeof fn0
>;
export function pipe<V0, V1, T1, L1, R1>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>
): PipeReturn1<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, 'extends->'>
  >,
  typeof fn0
>;
export function pipe<V0, V1, V2, T1, L1, R1>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>
): PipeReturn1<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, 'extends->'>
  >,
  typeof fn0
>;

export function pipe<T1, T2, L1, L2, R1, R2>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>
): PipeReturn2<
  () => Promise<
    Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1
>;
export function pipe<V0, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>
): PipeReturn2<
  (
    x0: V0
  ) => Promise<
    Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1
>;
export function pipe<V0, V1, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>
): PipeReturn2<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1
>;
export function pipe<V0, V1, V2, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>
): PipeReturn2<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1
>;

export function pipe<T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>
): PipeReturn3<
  () => Promise<
    Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2
>;
export function pipe<V0, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>
): PipeReturn3<
  (
    x: V0
  ) => Promise<
    Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2
>;
export function pipe<V0, V1, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>
): PipeReturn3<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2
>;
export function pipe<V0, V1, V2, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>
): PipeReturn3<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, 'extends->'>
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2
>;

export function pipe<T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>
): PipeReturn4<
  () => Promise<
    Union.Select<
      ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3
>;
export function pipe<V0, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>
): PipeReturn4<
  (
    x: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3
>;
export function pipe<V0, V1, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>
): PipeReturn4<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  L1,
  L2,
  L3,
  L4,
  R1,
  R2,
  R3,
  R4,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>
): PipeReturn4<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3
>;

export function pipe<
  T1,
  T2,
  T3,
  T4,
  T5,
  L1,
  L2,
  L3,
  L4,
  L5,
  R1,
  R2,
  R3,
  R4,
  R5,
>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>
): PipeReturn5<
  () => Promise<
    Union.Select<
      ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4
>;
export function pipe<
  V0,
  T1,
  T2,
  T3,
  T4,
  T5,
  L1,
  L2,
  L3,
  L4,
  L5,
  R1,
  R2,
  R3,
  R4,
  R5,
>(
  fn0: (x: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>
): PipeReturn5<
  (
    x: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4
>;
export function pipe<
  V0,
  V1,
  T1,
  T2,
  T3,
  T4,
  T5,
  L1,
  L2,
  L3,
  L4,
  L5,
  R1,
  R2,
  R3,
  R4,
  R5,
>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>
): PipeReturn5<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  T5,
  L1,
  L2,
  L3,
  L4,
  L5,
  R1,
  R2,
  R3,
  R4,
  R5,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>
): PipeReturn5<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4
>;

export function pipe<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>
): PipeReturn6<
  () => Promise<
    Union.Select<
      ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;
export function pipe<
  V0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
>(
  fn0: (x: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>
): PipeReturn6<
  (
    x: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;
export function pipe<
  V0,
  V1,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>
): PipeReturn6<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>
): PipeReturn6<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;

export function pipe<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>
): PipeReturn7<
  () => Promise<
    Union.Select<
      ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;
export function pipe<
  V0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
>(
  fn0: (x: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>
): PipeReturn7<
  (
    x: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;
export function pipe<
  V0,
  V1,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>
): PipeReturn7<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>
): PipeReturn7<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;

export function pipe<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>
): PipeReturn8<
  () => Promise<
    Union.Select<
      ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;
export function pipe<
  V0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
>(
  fn0: (x: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>
): PipeReturn8<
  (
    x: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;
export function pipe<
  V0,
  V1,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>
): PipeReturn8<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>
): PipeReturn8<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;

export function pipe<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>
): PipeReturn9<
  () => Promise<
    Union.Select<
      ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;
export function pipe<
  V0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
>(
  fn0: (x0: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>
): PipeReturn9<
  (
    x0: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;
export function pipe<
  V0,
  V1,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>
): PipeReturn9<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>
): PipeReturn9<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;

export function pipe<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  L10,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => PipeFuncReturn<T10, L10, R10>
): PipeReturn10<
  () => Promise<
    Union.Select<
      ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;
export function pipe<
  V0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  L10,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
>(
  fn0: (x0: V0) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => PipeFuncReturn<T10, L10, R10>
): PipeReturn10<
  (
    x0: V0
  ) => Promise<
    Union.Select<
      ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;
export function pipe<
  V0,
  V1,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  L10,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
>(
  fn0: (x0: V0, x1: V1) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => PipeFuncReturn<T10, L10, R10>
): PipeReturn10<
  (
    x0: V0,
    x1: V1
  ) => Promise<
    Union.Select<
      ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;
export function pipe<
  V0,
  V1,
  V2,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  L10,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
>(
  fn0: (x0: V0, x1: V1, x2: V2) => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => PipeFuncReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => PipeFuncReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => PipeFuncReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => PipeFuncReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => PipeFuncReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => PipeFuncReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => PipeFuncReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => PipeFuncReturn<T10, L10, R10>
): PipeReturn10<
  (
    x0: V0,
    x1: V1,
    x2: V2
  ) => Promise<
    Union.Select<
      ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10,
      Exists,
      'extends->'
    >
  >,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;

export function pipe(
  ...functions: Array<Function>
): (...args: unknown[]) => unknown {
  const fns = Array.from(functions);
  const fnsStr = fns.map((fn) => fn.toString()).join('\n');

  const reactiveFun = async (...args: unknown[]) => {
    await Promise.all(
      Array.from(beforeAllFns.values()).map((f) => f(fnsStr, ...args))
    );
    return pipeWith(
      async (fn: Function, res: unknown) =>
        isPromise(res) ? res.then((x) => compose(fn, x)) : compose(fn, res),
      [
        ...fns.map(
          (fn) => async (r: unknown, l: unknown) =>
            pipeContextFns.has(fn)
              ? Promise.reject('context not passed')
              : fn(r, l)
        ),
        (r: unknown, l: unknown) => r ?? l,
        (resp: unknown) =>
          Promise.all(
            Array.from(afterAllFns.values()).map((f) => f(fnsStr, resp))
          ).then(() => resp),
      ]
    )(...args);
  };

  replacementFns.set(reactiveFun, Array.from(fns));

  reactiveFun.replace = (replacements: Array<[number, Function]>) => {
    replacements.forEach(([i, fn]) => {
      fns[i] = fn;
    });
    return reactiveFun;
  };

  reactiveFun.replaceUndo = () => {
    const origFns = replacementFns.get(reactiveFun) ?? [];
    fns.forEach((_, i) => {
      fns[i] = origFns[i];
    });
    return reactiveFun;
  };

  reactiveFun.context = (ctx: unknown) => {
    fns.forEach((fn, i) => {
      if (pipeContextFns.has(fn)) {
        return (fns[i] = fn(ctx));
      }
      if ((fn as any)[pipeSymbol]) {
        return (fns[i] = (fn as typeof reactiveFun).context(ctx));
      }
    });
    return reactiveFun;
  };

  (reactiveFun as any)[pipeSymbol] = true;

  return reactiveFun;
}

export const isExitPipeValue = <T>(x: unknown): x is ExitPipeReturnValue<T> =>
  exitPipeReturnValues.has(x as object);

export function exitPipe<T>(r: T) {
  const exitPipeReturnValue: ExitPipeReturnValue<T> = { r };
  exitPipeReturnValues.add(exitPipeReturnValue);
  return exitPipeReturnValue;
}

export function beforeAll(fn: PipeCallback) {
  beforeAllFns.add(fn);
}

export function afterAll(fn: PipeCallback) {
  afterAllFns.add(fn);
}

export function clearBeforeAll() {
  beforeAllFns.clear();
}

export function clearAfterAll() {
  afterAllFns.clear();
}

export function pipeContext<T, L, R, C>(
  fn: (x: C) => (r: T, l: L) => R
): (r: T, l: L) => R {
  pipeContextFns.add(fn);
  return fn as unknown as (r: T, l: L) => R;
}
