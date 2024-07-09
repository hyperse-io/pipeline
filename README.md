# @hyperse/pipeline

<p align="left">
  <a aria-label="Build" href="https://github.com/hyperse-io/pipeline/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/hyperse-io/pipeline/ci-integrity.yml?branch=main&label=ci&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="stable version" href="https://www.npmjs.com/package/@hyperse/pipeline">
    <img alt="stable version" src="https://img.shields.io/npm/v/%40hyperse%2Fpipeline?branch=main&label=version&logo=npm&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/hyperse-io/pipeline/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hyperse-io/pipeline?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/hyperse-io/pipeline/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/hyperse-io/pipeline?style=flat-quare&labelColor=000000" />
  </a>
</p>

A middleware engine written in typescript, it will be used on a couples of projects, such as `tracker`

## Usage

### 1、Pipe With Middleware

When you call the pipeline function and assign it to a variable, you are able to pass a coma separated list of middleware functions to add to the middleware queue.

```ts
import { Pipeline } from '@hyperse/pipeline';

interface Context {
  [key: string]: any;
}

const engine = new Pipeline<Context>((ctx, next) => {
  ctx.foobar = 'baz';
  next();
});
```

Not all middleware has to be added when the factory function is first invoked. Instead, you can assign middldeware to the system later with the use method.

```ts
engine.use(async (ctx, next) => {
  await new Promise((res) => setTimeout(() => res, 2000));
  ctx.another = 123;
  next();
});
```

Then when we're ready to run the middleware engine, we'll create it's it's initial context, and then pass that context to the engine for processing.

```ts
(async () => {
  const context: Context = {};
  await engine.execute(context);
  console.log(context);
})();
// => { foobar: "baz", another: 123 }
```

### Errors

If an error happens in your middleware pipeline, you can assign an error handling middleware at the end of the queue.

```ts
engine.use((ctx, next) => {
  fs.readFile(ctx.path, {}, (err, file) => {
    if (err) next(err);
    // .. Do something
    next();
  });
});
// .. More middleware ...
engine.use((cyx, next, error) => {
  if (error) console.error(error.message);
});
```

### 2、Pipe With Array Function

You can easily use pipeline to manage a stream of events in the following ways

- Basic

```ts
const resp = await pipe(
  () => 123,
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

- Provides a global context for the pipeline (❗ mutable)

```ts
const resp = await pipe(
  () => 123,
  pc((ctx: { n: number }) => (n) => n + ctx.n),
  (n) => n + 1
).context({ n: 1 })();
expect(resp + 1).toEqual(126);
```

- Exit pipeline

```ts
const resp = await pipe(
  () => 123,
  (n) => ep(n + 1),
  (n) => 'qwe'
)();
iep(resp) && expect(resp.r + 1).toEqual(125);
```

- Dynamically replace nodes in the pipeline (❗ mutable)

```ts
const fn = pipe(
  () => 123,
  (n) => n + 1
);
const resp = await fn.replace([[0, () => 124]])();
expect(resp + 1).toEqual(126);

fn.replaceUndo();
expect(await fn()).toEqual(125);
```

- AOP beforeAll/afterAll hooks

```ts
beforeAll((label, n) => {
  expect(label).toEqual('(n) => n + 1\n(n) => n + 1');
  expect(n).toEqual(123);
});
afterAll((label, n) => {
  expect(label).toEqual('(n) => n + 1\n(n) => n + 1');
  expect(n).toEqual(125);
});
pipe(
  (n: number) => n + 1,
  (n) => n + 1
)(123);
```

- AOP clear hooks

```ts
clearAfterAll();
clearBeforeAll();
```

- Support promise

```ts
const resp = await pipe(
  () => Promise.resolve(123),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

- Promise can include anything supported

```ts
const resp = await pipe(
  () => Promise.resolve(Either.right(123)),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

## Development

yarn install

## Testing

yarn test
