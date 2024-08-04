import { pipe } from '../src/index.js';

type TrackerOptions<T> = {
  createCtx: () => Promise<T> | T;
};

class Tracker<Ctx, Result> {
  constructor(private options: TrackerOptions<Ctx>) {}
  private hooks: Array<(data: { ctx: Ctx; input: Result }) => Promise<Result>> =
    [];
  get ctx() {
    const fn = pipe(this.options.createCtx, (ctx) => {
      return ctx;
    });
    return fn();
  }

  get pipe() {
    return pipe;
  }

  async transform(fn: (data: { ctx: Ctx; input: Result }) => Promise<Result>) {
    this.hooks.push(fn);
  }
}

const tracker = new Tracker<{ env: string }, { name: string; pwd: number }>({
  createCtx: () => {
    return {
      env: 'env',
    };
  },
});

tracker.transform(async (data) => {
  const result = await pipe(
    ({ ctx, input }: typeof data) => {
      return { name: ctx.env };
    },
    (ctx) => {
      return { name: '1', pwd: 1 };
    }
  )(data);

  return result;
});
