import { Either as FpTsEither } from 'fp-ts/Either';
import type { Catamorphism, Either, Maybe, Validation } from 'monet';
import type {
  Either as PurifyEither,
  EitherAsync,
  Maybe as PurifyMaybe,
  MaybeAsync,
} from 'purify-ts';

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

export const isMonetCata = <L, R extends {}>(
  x: unknown
): x is Catamorphism<L, R> =>
  !!x &&
  typeof (x as Catamorphism<L, R>).cata === 'function' &&
  ((typeof (x as Either<L, R>).isLeft === 'function' &&
    typeof (x as Either<L, R>).isRight === 'function') ||
    (typeof (x as Maybe<R>).isSome === 'function' &&
      typeof (x as Maybe<R>).isNone === 'function') ||
    (typeof (x as Validation<L, R>).isSuccess === 'function' &&
      typeof (x as Validation<L, R>).isFail === 'function'));

export const isPurifyEither = <L, R>(x: unknown): x is PurifyEither<L, R> =>
  !!x &&
  typeof (x as PurifyEither<L, R>).either === 'function' &&
  typeof (x as PurifyEither<L, R>).isLeft === 'function' &&
  typeof (x as PurifyEither<L, R>).isRight === 'function';

export const isPurifyMaybe = <T>(x: unknown): x is PurifyMaybe<T> =>
  !!x &&
  typeof (x as PurifyMaybe<T>).caseOf === 'function' &&
  typeof (x as PurifyMaybe<T>).isJust === 'function' &&
  typeof (x as PurifyMaybe<T>).isNothing === 'function';

export const isPurifyEitherAsync = <L, R>(x: unknown): x is EitherAsync<L, R> =>
  !!x &&
  typeof (x as EitherAsync<L, R>).toMaybeAsync === 'function' &&
  typeof (x as EitherAsync<L, R>).run === 'function' &&
  typeof (x as EitherAsync<L, R>).chainLeft === 'function';

export const isPurifyMaybeAsync = <T>(x: unknown): x is MaybeAsync<T> =>
  !!x &&
  typeof (x as MaybeAsync<T>).toEitherAsync === 'function' &&
  typeof (x as MaybeAsync<T>).run === 'function' &&
  typeof (x as MaybeAsync<T>).chain === 'function';

export const isFpTsEither = <L, R>(x: unknown): x is FpTsEither<L, R> =>
  !!x &&
  ((x as FpTsEither<L, R>)._tag === 'Left' ||
    (x as FpTsEither<L, R>)._tag === 'Right');
