import { Pipeline } from '../src/middleware/Pipeline.js';

describe('Pipeline tests', () => {
  interface TestContext {
    [key: string]: any;
  }

  it('Creates a new middleware pipeline.', async () => {
    const engine = new Pipeline<TestContext>((ctx, next) => {
      ctx.foobar = 'baz';
      next();
    });

    const ctx = {};
    await engine.execute(ctx);
    expect(ctx).toHaveProperty('foobar');
  });

  it('Context is correct when using async middleware', async () => {
    const engine = new Pipeline<TestContext>(async (ctx, next) => {
      ctx.foobar = 'baz';
      await next();
    });

    engine.use(async (ctx, next) => {
      ctx.another = 123;
      await new Promise((res) => setTimeout(res, 1000));
      await next();
    });

    engine.use(async (ctx, next) => {
      ctx.three = 123;
      await new Promise((res) => setTimeout(res, 1000));
      await next();
    });

    const context: TestContext = {};
    await engine.execute(context);
    expect(context.three).toEqual(123);
  });

  it('Errors are handled by error middleware', async () => {
    const engine = new Pipeline<TestContext>(async (ctx, next) => {
      ctx.foobar = 'baz';
      // Mock a real-world async function
      await new Promise((res) => setTimeout(res, 1000));
      await next();
    });

    engine.use(
      async (ctx, next) => {
        next(new Error('This is an error'));
      },
      async (ctx) => {
        ctx.another = 123;
      },
      async (ctx, next, error) => {
        if (error) ctx.error = error.message;
        await next();
      }
    );

    const context: TestContext = {};
    await engine.execute(context);
    expect(context.foobar).toBe('baz');
    expect(context.error).toBe('This is an error');
    expect(context.another).toBeUndefined();
  });

  it('Ignore throw error if only one pipe handle', async () => {
    const engine = new Pipeline<TestContext>(async (ctx, next) => {
      ctx.foobar = 'baz';
      // throw error here
      next(new Error(`This is an error`));
    });
    const context: TestContext = {};
    await engine.execute(context);
    expect(context.foobar).toBe('baz');
  });

  it('Ignore throw error if only one pipe handle 2', async () => {
    const engine = new Pipeline<TestContext>(async (ctx) => {
      ctx.foobar = 'baz';
      // throw error here
      throw new Error(`This is an error`);
    });

    const context: TestContext = {};
    await engine.execute(context);
    expect(context.foobar).toBe('baz');
  });

  it('Correct throw error when middleware use throw Error direclty', async () => {
    const engine = new Pipeline<TestContext>(async (ctx) => {
      ctx.foobar = 'baz';
      // throw error here
      throw new Error(`This is an error`);
    });

    engine.use(async (ctx, next, err) => {
      ctx.err = err;
      await next();
    });

    const context: TestContext = {};
    await engine.execute(context);
    expect(context.foobar).toBe('baz');
    expect(context.err).toBeDefined();
  });

  it('Correct throw when middleware use throw Error direclty 2', async () => {
    const engine = new Pipeline<TestContext>(async (ctx, next) => {
      ctx.foobar = 'baz';
      await next();
    });
    engine.use(
      async (ctx, next) => {
        throw new Error('This is an error');
      },
      async (ctx, next, err) => {
        ctx.another = 123;
        await next();
      },
      async (ctx, next, error) => {
        if (error) {
          ctx.error = error.message;
        }
        await next();
      }
    );
    const context: TestContext = {};
    await engine.execute(context);
    expect(context.foobar).toBe('baz');
    expect(context.error).toBe('This is an error');
    expect(context.another).toBeUndefined();
  });

  it('Should fail silently when middleware does not await next()', async () => {
    const engine = new Pipeline<TestContext>(async (ctx, next) => {
      ctx.initial = 'start';
      next();
    });

    engine.use(async (ctx, next) => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Add sleep
      ctx.first = 'first';
      next();
      ctx.afterNext = 'after';
    });

    engine.use(async (ctx, next) => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Add sleep
      ctx.second = 'second';
      await next();
    });

    const context: TestContext = {};
    await engine.execute(context);
    expect(context.initial).toBe('start');
    expect(context.first).toBeUndefined();
    expect(context.second).toBeUndefined();
    expect(context.afterNext).toBeUndefined();
  });
});
