/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      isArray([]); //=> true
 *      isArray(null); //=> false
 *      isArray({}); //=> false
 */
export const isArray =
  Array.isArray ||
  function isArray(val) {
    return (
      val != null &&
      val.length >= 0 &&
      Object.prototype.toString.call(val) === '[object Array]'
    );
  };
