import { curryOne } from './helper-curry.js';
import { isArray } from './helper-is-array.js';
import { isString } from './helper-is-string.js';

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      isArrayLike([]); //=> true
 *      isArrayLike(true); //=> false
 *      isArrayLike({}); //=> false
 *      isArrayLike({length: 10}); //=> false
 *      isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
export const isArrayLike = curryOne(function isArrayLike(x: {
  nodeType: number;
  length: number;
  hasOwnProperty: (arg0: number) => any;
}) {
  if (isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (isString(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return (
      Object.prototype.hasOwnProperty.call(x, 0) &&
      Object.prototype.hasOwnProperty.call(x, x.length - 1)
    );
  }
  return false;
});
