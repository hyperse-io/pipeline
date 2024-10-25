import type { PipeWithFunction } from '../types/types-reactive.js';
import { curryTwo } from './helper-curry.js';
import { isArrayLike } from './helper-is-array-like.js';
import { xwrap } from './helper-x-wrap.js';

const symIterator =
  typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

export function arity(n: number, fn: PipeWithFunction): PipeWithFunction {
  return function (...args: any[]) {
    return fn.apply(this, args);
  };
}

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 */
const bind = curryTwo(function bind(fn, thisObj) {
  return arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

const iterableReduce = (
  xf: any,
  acc: { [x: string]: any },
  iter: { next: () => any }
) => {
  let step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
};

const methodReduce = (
  xf: { [x: string]: any },
  acc: any,
  obj: { [x: string]: (arg0: any, arg1: any) => any },
  methodName: string
) => {
  return xf['@@transducer/result'](
    obj[methodName](bind(xf['@@transducer/step'], xf), acc)
  );
};

function arrayReduce(xf: any, acc: { [x: string]: any }, list: string | any[]) {
  let idx = 0;
  const len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

export const reduce = (fn: any, acc: any, list: any) => {
  if (typeof fn === 'function') {
    fn = xwrap(fn);
  }
  if (isArrayLike(list)) {
    return arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
};
