import type { PipeWithFunction } from '../types/types-reactive.js';

const isPlaceholder = (a: any): boolean => {
  return (
    a != null && typeof a === 'object' && a['@@functional/placeholder'] === true
  );
};

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 */
export function curryOne(fn: Function) {
  return function f1(a: any) {
    if (arguments.length === 0 || isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 */
export function curryTwo(fn: PipeWithFunction) {
  return function f2(a: any, b?: any) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return isPlaceholder(a)
          ? f2
          : curryOne(function (_b: any) {
              return fn(a, _b);
            });
      default:
        return isPlaceholder(a) && isPlaceholder(b)
          ? f2
          : isPlaceholder(a)
            ? curryOne(function (_a: any) {
                return fn(_a, b);
              })
            : isPlaceholder(b)
              ? curryOne(function (_b: any) {
                  return fn(a, _b);
                })
              : fn(a, b);
    }
  };
}

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 */
export function curryThree(fn: PipeWithFunction) {
  return function f3(a: any, b: any, c?: any) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return isPlaceholder(a)
          ? f3
          : curryTwo(function (_b, _c) {
              return fn(a, _b, _c);
            });
      case 2:
        return isPlaceholder(a) && isPlaceholder(b)
          ? f3
          : isPlaceholder(a)
            ? curryTwo(function (_a, _c) {
                return fn(_a, b, _c);
              })
            : isPlaceholder(b)
              ? curryTwo(function (_b, _c) {
                  return fn(a, _b, _c);
                })
              : curryOne(function (_c: any) {
                  return fn(a, b, _c);
                });
      default:
        return isPlaceholder(a) && isPlaceholder(b) && isPlaceholder(c)
          ? f3
          : isPlaceholder(a) && isPlaceholder(b)
            ? curryTwo(function (_a, _b) {
                return fn(_a, _b, c);
              })
            : isPlaceholder(a) && isPlaceholder(c)
              ? curryTwo(function (_a, _c) {
                  return fn(_a, b, _c);
                })
              : isPlaceholder(b) && isPlaceholder(c)
                ? curryTwo(function (_b, _c) {
                    return fn(a, _b, _c);
                  })
                : isPlaceholder(a)
                  ? curryOne(function (_a: any) {
                      return fn(_a, b, c);
                    })
                  : isPlaceholder(b)
                    ? curryOne(function (_b: any) {
                        return fn(a, _b, c);
                      })
                    : isPlaceholder(c)
                      ? curryOne(function (_c: any) {
                          return fn(a, b, _c);
                        })
                      : fn(a, b, c);
    }
  };
}
