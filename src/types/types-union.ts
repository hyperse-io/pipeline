/**
 * Describes the match strategy when matching types
 * * `default`     : `extends->`
 * * `contains->`  : X contains   Y ([[Contains]]<X, Y>)
 * * `extends->`   : X extends    Y ([[Extends]]<X, Y>)
 * * `<-contains`  : Y contains   X ([[Contains]]<Y, X>)
 * * `<-extends`   : Y extends    X ([[Extends]]<Y, X>)
 * * `equals`      : X equals     Y (([[Equals]]<X, Y>))
 */
export type Match =
  | 'default'
  | 'contains->'
  | 'extends->'
  | '<-contains'
  | '<-extends'
  | 'equals';

/**
 * Check whether `A1` is part of `A2` or not. The difference with
 * `extends` is that it forces a [[Boolean]] return.
 * @param A1
 * @param A2
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Extends<'a' | 'b', 'b'> // Boolean
 * type test1 = A.Extends<'a', 'a' | 'b'> // True
 *
 * type test2 = A.Extends<{a: string}, {a: any}>      // True
 * type test3 = A.Extends<{a: any}, {a: any, b: any}> // False
 *
 * type test4 = A.Extends<never, never> // False
 * /// Nothing cannot extend nothing, use `A.Equals`
 * ```
 */
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
  ? 0
  : A1 extends A2
    ? 1
    : 0;

/**
 * Check whether `A1` is equal to `A2` or not.
 * @param A1
 * @param A2
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Equals<42 | 0, 42 | 0>                    // true
 * type test1 = A.Equals<{a: string}, {b: string}>          // false
 * type test3 = A.Equals<{a: string}, {readonly a: string}> // false
 * ```
 */
export type Equals<A1 extends any, A2 extends any> =
  (<A>() => A extends A2 ? 1 : 0) extends <A>() => A extends A1 ? 1 : 0 ? 1 : 0;

/**
 * Check whether `A1` is part of `A2` or not. It works like
 * [[Extends]] but [[Boolean]] results are narrowed to [[False]].
 * @param A1
 * @param A2
 * @returns [[Boolean]]
 * @example
 * ```ts
 * type test0 = A.Contains<'a' | 'b', 'b'> // False
 * type test1 = A.Contains<'a', 'a' | 'b'> // True
 *
 * type test2 = A.Contains<{a: string}, {a: string, b: number}> // False
 * type test3 = A.Contains<{a: string, b: number}, {a: string}> // True
 *
 * type test4 = A.Contains<never, never> // False
 * /// Nothing cannot contain nothing, use `A.Equals`
 * ```
 */
export type Contains<A1 extends any, A2 extends any> =
  Extends<A1, A2> extends 1 ? 1 : 0;

/**
 * Check whether `A` is similar to `A1` or not. In other words, it is a compact
 * type that bundles [[Equals]], [[Extends]], [[Contains]], comparison types.
 * @param A to be compared
 * @param A1 to compare to
 * @param match (?=`'default'`) to change precision
 * @returns [[Boolean]]
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Is<'a', 'a' | 'b', 'extends->'> // True
 * type test1 = A.Is<'a' | 'b', 'a', 'extends->'> // Boolean
 *
 * type test2 = A.Is<'a', 'a' | 'b', '<-extends'> // Boolean
 * type test3 = A.Is<'a' | 'b', 'a', '<-extends'> // True
 *
 * type test4 = A.Is<'a', 'a' | 'b', 'contains->'> // True
 * type test5 = A.Is<'a' | 'b', 'a', 'contains->'> // False
 *
 * type test6 = A.Is<'a', 'a' | 'b', '<-contains'> // False
 * type test7 = A.Is<'a' | 'b', 'a', '<-contains'> // True
 *
 * type test8 = A.Is<'a', 'a' | 'b', 'equals'>      // False
 * type test9 = A.Is<'b' |'a', 'a' | 'b', 'equals'> // True
 * ```
 */
export type Is<
  A extends any,
  A1 extends any,
  match extends Match = 'default',
> = {
  default: Extends<A, A1>;
  'contains->': Contains<A, A1>;
  'extends->': Extends<A, A1>;
  '<-contains': Contains<A1, A>;
  '<-extends': Extends<A1, A>;
  equals: Equals<A1, A>;
}[match];

/**
 * Extract the part of `U` that matches `M`
 * @param U to extract from
 * @param M to select with
 * @returns [[Union]]
 * @example
 * ```ts
 * ```
 */
export type Select<
  U extends any,
  M extends any,
  match extends Match = 'default',
> = U extends unknown ? { 1: U & M; 0: never }[Is<U, M, match>] : never;
