export const isString = (x: any) => {
  return Object.prototype.toString.call(x) === '[object String]';
};
