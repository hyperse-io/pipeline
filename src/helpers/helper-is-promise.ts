/**
 * @param value The value to check.
 * @returns Returns true if value is a `Promise`, else false.
 */
export const isPromise = <T>(value: any): value is Promise<T> => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};
