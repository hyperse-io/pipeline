import { Middleware } from '../types/types-middleware.js';
import { invokeMiddlewares } from './invoke.js';

/**
 * A middleware container and invoker
 */
export class Pipeline<T> {
  private middlewares: Middleware<T>[];

  constructor(...middlewares: Middleware<T>[]) {
    this.middlewares = middlewares;
  }

  /**
   * Add a middleware function.
   */
  use(...mw: Middleware<T>[]): Pipeline<T> {
    this.middlewares.push(...mw);
    return this;
  }

  /**
   * Execute the chain of middlewares, in the order they were added on a
   * given Context.
   */
  execute(context: T): Promise<void> {
    return invokeMiddlewares<T>(context, this.middlewares);
  }
}
