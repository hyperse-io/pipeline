import { curryOne, curryThree, curryTwo } from './helper-curry.js';
import { isArray } from './helper-is-array.js';
import { isString } from './helper-is-string.js';
import { arity, reduce } from './helper-reduce.js';

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 */
const headFunctions = curryTwo(function nth(offset, list) {
  const idx = offset < 0 ? list.length + offset : offset;
  return isString(list) ? list.charAt(idx) : list[idx];
})(0);

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
function checkForMethod(methodname: string, fn: Function): any {
  return function (...args: any[]): any {
    const length = args.length;
    if (length === 0) {
      return fn();
    }
    const obj = args[length - 1];
    return isArray(obj) || typeof obj[methodname] !== 'function'
      ? fn.apply(this, args)
      : // eslint-disable-next-line prefer-spread
        obj[methodname].apply(obj, args.slice(0, length - 1));
  };
}

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}            //=> 'ram'
 */
const slice = curryThree(
  checkForMethod(
    'slice',
    function slice(
      fromIndex: number | undefined,
      toIndex: number | undefined,
      list: any
    ) {
      return Array.prototype.slice.call(list, fromIndex, toIndex);
    }
  )
);

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 */
const tailFunctions = curryOne(checkForMethod('tail', slice(1, Infinity)));

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 */
const identity = curryOne((x: any) => x);

/**
 * Performs left-to-right function composition using transforming function. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 */
export const pipeWith: (
  composer: (fn: Function, res: unknown) => unknown,
  fns: Array<Function>
) => (...args: unknown[]) => unknown = curryTwo(function pipeWith(
  xf: (fn: Function, res: unknown) => unknown,
  list: Array<Function>
) {
  if (list.length <= 0) {
    return identity;
  }

  const headList = headFunctions(list);
  const tailList = tailFunctions(list);

  return arity(headList.length, function () {
    return reduce(
      function (result: unknown, f: Function) {
        return xf.call(this, f, result);
      },
      headList.apply(this, arguments),
      tailList
    );
  });
});
