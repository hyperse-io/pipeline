import { invokeMiddlewares } from './invoke.js';
import { Middleware } from './types.js';

/**
 * A middleware container and invoker
 */
export class Pipeline<T> {
  middlewares: Middleware<T>[];

  constructor(...middlewares: Middleware<T>[]) {
    this.middlewares = middlewares;
  }

  /**
   * Add a middleware function.
   */
  use(...mw: Middleware<T>[]): void {
    this.middlewares.push(...mw);
  }

  /**
   * Execute the chain of middlewares, in the order they were added on a
   * given Context.
   */
  execute(context: T): Promise<void> {
    return invokeMiddlewares(context, this.middlewares);
  }
}
