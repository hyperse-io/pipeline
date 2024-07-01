import { Middleware } from './types.js';

/**
 * Helper function for invoking a chain of middlewares on a context.
 */
export async function invokeMiddlewares<T>(
  context: T,
  middlewares: Middleware<T>[],
  error?: Error
): Promise<void> {
  if (!middlewares.length) return;

  // Get the first middleware in the queue.
  const handler = middlewares[0];

  // Get the error handler middleware at the end of the queue.
  const errorHandler = middlewares[middlewares.length - 1];

  // If an error is detected, skip to the end and attempt to handle
  // the error before it throws.
  const mw: Middleware<T> = error ? errorHandler : handler;

  try {
    return await mw(
      context,
      async (err) => {
        return await invokeMiddlewares(context, middlewares.slice(1), err);
      },
      error
    );
  } catch (err: any) {
    if (errorHandler && errorHandler !== handler) {
      return errorHandler(context, async () => {}, err);
    }
  }
}
