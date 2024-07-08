class XWrap {
  f: any;
  constructor(fn: any) {
    this.f = fn;
  }

  ['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  ['@@transducer/result'] = function (acc: any) {
    return acc;
  };
  ['@@transducer/step'] = function (acc: any, x: any) {
    return this.f(acc, x);
  };
}

export const xwrap = (fn: any) => {
  return new XWrap(fn);
};
