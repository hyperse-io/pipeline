/**
 * 'next' function, passed to a middleware
 */
type Next<T> = (error?: Error) => Promise<Middleware<T>> | Promise<void>;

/**
 * A middleware
 */
export type Middleware<T> = (
  context: T,
  next: Next<T>,
  error?: Error
) => Promise<void> | void;

export type MiddlewarePipe<T> = {
  use: (...middlewares: Middleware<T>[]) => void;
  execute: (context: T) => Promise<void | T>;
};
