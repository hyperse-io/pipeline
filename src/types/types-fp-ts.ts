export interface FpTsLeft<E> {
  readonly _tag: 'Left';
  readonly left: E;
}

export interface FpTsRight<A> {
  readonly _tag: 'Right';
  readonly right: A;
}

export type FpTsEither<E, A> = FpTsLeft<E> | FpTsRight<A>;

export const fpTsLeft: <E = never, A = never>(e: E) => FpTsEither<E, A> = <
  E,
  A = never,
>(
  e: E
): FpTsEither<E, A> => ({
  _tag: 'Left',
  left: e,
});

export const fpTsRight: <E = never, A = never>(a: A) => FpTsEither<E, A> = <
  A,
  E = never,
>(
  a: A
): FpTsEither<E, A> => ({
  _tag: 'Right',
  right: a,
});

export const isLeft: <E>(ma: FpTsEither<E, unknown>) => ma is FpTsLeft<E> = <E>(
  ma: FpTsEither<E, unknown>
): ma is FpTsLeft<E> => ma._tag === 'Left';

export const isRight: <A>(ma: FpTsEither<unknown, A>) => ma is FpTsRight<A> = <
  A,
>(
  ma: FpTsEither<unknown, A>
): ma is FpTsRight<A> => ma._tag === 'Right';

export const matchW =
  <E, B, A, C>(onLeft: (e: E) => B, onRight: (a: A) => C) =>
  (ma: FpTsEither<E, A>): B | C =>
    isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);

export const match: <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (ma: FpTsEither<E, A>) => B = matchW;

export const fold: <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (ma: FpTsEither<E, A>) => B = match;
