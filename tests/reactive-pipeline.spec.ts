import { Either, Maybe, Validation } from 'monet';
import { exitPipe, isExitPipeValue, pipe, pipeContext } from '../src/index.js';
import { fpTsLeft, fpTsRight } from '../src/types/types-fp-ts.js';
import {
  Either as PurifyEither,
  Left as PurifyLeft,
} from '../src/types/types-purify-either.js';
import { EitherAsync } from '../src/types/types-purify-either-async.js';
import { Maybe as PurifyMaybe } from '../src/types/types-purify-maybe.js';
import { MaybeAsync } from '../src/types/types-purify-maybe-async.js';

describe('Rocket pipes tests', () => {
  describe('Simple', () => {
    it('Simple passthrough test', async () => {
      const resp = await pipe(
        () => 123,
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Simple async error test', async () => {
      let error = new Error('unknown');
      try {
        await pipe(
          async () => {
            throw new Error('qwe');
          },
          (n) => n + 1
        )();
      } catch (e) {
        error = e as Error;
      } finally {
        expect(error.message).toEqual('qwe');
      }
    });

    it('Simple error test', async () => {
      let error = new Error('unknown');
      try {
        await pipe(
          () => {
            throw new Error('qwe');
          },
          (n) => n + 1
        )();
      } catch (e) {
        error = e as Error;
      } finally {
        expect(error.message).toEqual('qwe');
      }
    });

    it('Pass argument test', async () => {
      const resp = await pipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
      expect(resp + 1).toEqual(126);
    });
  });

  describe('Exit pipeline', () => {
    it('Exit pipeline', async () => {
      const resp = await pipe(
        () => 123,
        (n) => exitPipe(n + 1),
        () => 'qwe'
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(125);
      }
    });

    it('Exit promise pipeline', async () => {
      const resp = await pipe(
        () => 123,
        (n) => Promise.resolve(exitPipe(n + 1)),
        () => 'qwe'
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(125);
      }
    });

    it('Nested exit', async () => {
      const resp = await pipe(
        () => 123,
        pipe(
          (n: number) => n + 1,
          (n) => exitPipe(n + 1),
          () => true
        ),
        () => 'qwe'
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(126);
      }
    });

    it('Nested promise exit', async () => {
      const resp = await pipe(
        () => 123,
        pipe(
          (n: number) => n + 1,
          (n) => Promise.resolve(exitPipe(n + 1)),
          () => true
        ),
        () => 'qwe'
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(126);
      }
    });
  });

  describe('Context pipeline', () => {
    it('Context pass simple', async () => {
      const resp = await pipe(
        () => 123,
        pipeContext((ctx: { n: number }) => (n) => n + ctx.n),
        (n) => n + 1
      ).context({ n: 1 })();
      expect(resp + 1).toEqual(126);
    });

    it('Context compatibility with left', async () => {
      const resp = await pipe(
        () => Either.left(123),
        pipeContext((ctx: { n: number }) => (n, l) => l + ctx.n),
        (n) => n + 1
      ).context({ n: 1 })();
      expect(resp + 1).toEqual(126);
    });

    it('Context pass nested', async () => {
      const resp = await pipe(
        () => 123,
        pipe(
          (n: number) => n + 1,
          pipeContext((ctx: { n: number }) => (n) => n + ctx.n)
        ),
        (n) => n + 1
      ).context({ n: 1 })();
      expect(resp + 1).toEqual(127);
    });

    it('Override nested context', async () => {
      const resp = await pipe(
        () => 123,
        pipe(
          (n: number) => n + 1,
          pipeContext((ctx: { n: number }) => (n) => n + ctx.n)
        ).context({ n: 4 }),
        (n) => n + 1
      ).context({ n: 1 })();
      expect(resp + 1).toEqual(130);
    });

    it('Context not passed case', async () => {
      let error = new Error('unknown');
      try {
        await pipe(
          () => 123,
          pipeContext((ctx: { n: number }) => (n) => n + ctx.n),
          (n) => n + 1
        )();
      } catch (e) {
        error = e as Error;
      }
      expect(error).toEqual('context not passed');
    });
  });

  describe('Replace pipeline', () => {
    it('Replace fn on the fly', async () => {
      const fn = pipe(
        () => 123,
        (n) => n + 1
      );
      const resp = await fn.replace([[0, () => 124]])();
      expect(resp + 1).toEqual(126);
    });

    it('Undo replace', async () => {
      const fn = pipe(
        () => 123,
        (n) => n + 1
      );
      fn.replace([[0, () => 124]]);
      fn.replaceUndo();
      expect((await fn()) + 1).toEqual(125);
    });
  });

  describe('Promise', () => {
    it('Promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Promise reject test', async () => {
      let error = new Error('unknown');
      try {
        await pipe(
          () => Promise.reject(123),
          () => 'qwe'
        )();
      } catch (e) {
        error = e as Error;
      }
      expect(error).toEqual(123);
    });

    it('Promise thenable test', async () => {
      const resp = await pipe(
        () => {
          const obj = { n: 123 };
          return Promise.resolve().then(() => obj);
        },
        (obj) => obj.n + 1
      )();
      expect(resp + 1).toEqual(125);
    });
  });

  describe('Monet Either', () => {
    it('Either right passthrough test', async () => {
      const resp = await pipe(
        () => Either.right(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Either.right(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => Either.right(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left test', async () => {
      const resp = await pipe(
        () => Either.left(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left in promise test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => Either.left(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right default array', async () => {
      const resp = await pipe(
        () =>
          Either.fromPromise(
            Promise.all([Promise.resolve(123), Promise.reject<string>('qwe')])
          ),
        (arr = <[number, string]>[0, '']) => arr[0]
      )();
      expect(resp + 1).toEqual(1);
    });
  });

  describe('Monet Maybe', () => {
    it('Maybe some passthrough test', async () => {
      const resp = await pipe(
        () => Maybe.some(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Maybe some in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Maybe.some(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Maybe some result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Maybe.some(123)),
        (n) => Maybe.some(n + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Maybe none passthrough and result test', async () => {
      const resp = await pipe(
        () => Maybe.none(),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });

    it('Maybe none passthrough in promise test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Maybe.none()),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });
  });

  describe('Monet Validation', () => {
    it('Validation success passthrough test', async () => {
      const resp = await pipe(
        () => Validation.success(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Validation success in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Validation.success(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Validation success result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Validation.success(123)),
        (n) => Validation.success(n + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Validation fail passthrough test', async () => {
      const resp = await pipe(
        () => Validation.fail(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Validation fail in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Validation.fail(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Validation fail result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(Validation.fail(123)),
        (_, l) => Validation.fail(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });
  });

  describe('Purify Either', () => {
    it('Either right passthrough test', async () => {
      const resp = await pipe(
        () => PurifyEither.of(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyEither.of(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyLeft(123)),
        (_, l) => PurifyEither.of(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left test', async () => {
      const resp = await pipe(
        () => PurifyLeft(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left in promise test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyLeft(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyLeft(123)),
        (_, l) => PurifyLeft(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });
  });

  describe('Purify Maybe', () => {
    it('Maybe some passthrough test', async () => {
      const resp = await pipe(
        () => PurifyMaybe.of(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Maybe some in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyMaybe.of(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Maybe some result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyMaybe.of(123)),
        (n) => PurifyMaybe.of(n + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Maybe none passthrough and result test', async () => {
      const resp = await pipe(
        () => PurifyMaybe.zero(),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });

    it('Maybe none passthrough in promise test', async () => {
      const resp = await pipe(
        () => Promise.resolve(PurifyMaybe.zero()),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });
  });

  describe('Purify EitherAsync', () => {
    it('EitherAsync right passthrough test', async () => {
      const resp = await pipe(
        () => EitherAsync(() => Promise.resolve(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('EitherAsync right in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(EitherAsync(() => Promise.resolve(123))),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('EitherAsync right result test', async () => {
      const resp = await pipe(
        () =>
          Promise.resolve(
            EitherAsync<number, unknown>(({ liftEither }) =>
              liftEither(PurifyLeft(123))
            )
          ),
        (_, l) => PurifyEither.of(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('EitherAsync left test', async () => {
      const resp = await pipe(
        () =>
          EitherAsync<number, unknown>(({ liftEither }) =>
            liftEither(PurifyLeft(123))
          ),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('EitherAsync left in promise test', async () => {
      const resp = await pipe(
        () =>
          Promise.resolve(
            EitherAsync<number, unknown>(({ liftEither }) =>
              liftEither(PurifyLeft(123))
            )
          ),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('EitherAsync left result test', async () => {
      const resp = await pipe(
        () =>
          Promise.resolve(
            EitherAsync<number, unknown>(({ liftEither }) =>
              liftEither(PurifyLeft(123))
            )
          ),
        (_, l) =>
          EitherAsync<number, unknown>(({ liftEither }) =>
            liftEither(PurifyLeft(l + 1))
          )
      )();
      expect(resp + 1).toEqual(125);
    });
  });

  describe('Purify MaybeAsync', () => {
    it('MaybeAsync some passthrough test', async () => {
      const resp = await pipe(
        () => MaybeAsync(() => Promise.resolve(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('MaybeAsync some in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(MaybeAsync(() => Promise.resolve(123))),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('MaybeAsync some result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(MaybeAsync(() => Promise.resolve(123))),
        (n) => MaybeAsync(() => Promise.resolve(n + 1))
      )();
      expect(resp + 1).toEqual(125);
    });

    it('MaybeAsync none passthrough and result test', async () => {
      const resp = await pipe(
        () => MaybeAsync(({ liftMaybe }) => liftMaybe(PurifyMaybe.of(0))),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });

    it('MaybeAsync none passthrough in promise test', async () => {
      const resp = await pipe(
        () =>
          Promise.resolve(
            MaybeAsync(({ liftMaybe }) => liftMaybe(PurifyMaybe.of(0)))
          ),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });
  });

  describe('fp-ts Either', () => {
    it('Either right passthrough test', async () => {
      const resp = await pipe(
        () => fpTsRight(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right in promise passthrough test', async () => {
      const resp = await pipe(
        () => Promise.resolve(fpTsRight(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either right result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(fpTsLeft(123)),
        (_, l) => fpTsRight(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left test', async () => {
      const resp = await pipe(
        () => fpTsLeft(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left in promise test', async () => {
      const resp = await pipe(
        () => Promise.resolve(fpTsLeft(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Either left result test', async () => {
      const resp = await pipe(
        () => Promise.resolve(fpTsLeft(123)),
        (_, l) => fpTsLeft(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });
  });

  describe('Ramda', () => {
    it('Ramda ifElse', async () => {
      const fn1 = pipe(
        () => Promise.resolve(123),
        (n) => n + 1
      );
      const fn2 = pipe(
        () => Promise.resolve(123),
        (n) => n + 1
      );
      expect(await fn1()).toEqual(await fn2());
    });
  });

  describe('Aliases', () => {
    it('Simple passthrough test', async () => {
      const resp = await pipe(
        () => 123,
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it('Exit pipeline', async () => {
      const resp = await pipe(
        () => 123,
        (n) => exitPipe(n + 1),
        () => 'qwe'
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(125);
      }
    });

    it('Context pass', async () => {
      const resp = await pipe(
        () => 123,
        pipeContext((ctx: { n: number }) => (n) => n + ctx.n),
        (n) => n + 1
      ).context({ n: 1 })();
      expect(resp + 1).toEqual(126);
    });
  });
});
