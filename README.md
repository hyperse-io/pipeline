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

A powerful TypeScript middleware engine and reactive pipeline library that provides two main paradigms for handling data flow and middleware patterns.

## Features

### 🚀 Middleware Engine

- **Type-safe middleware composition** with full TypeScript support
- **Async/await support** for modern JavaScript patterns
- **Error handling middleware** with automatic error propagation
- **Context sharing** between middleware functions
- **Chaining and composition** of middleware functions

### ⚡ Reactive Pipeline

- **Functional programming patterns** with pipe composition
- **Promise and async support** throughout the pipeline
- **Early exit capabilities** with `exitPipe`
- **Global context injection** with `pipeContext`
- **Dynamic pipeline modification** with `replace` and `replaceUndo`
- **Monad support** for Either, Maybe, and Validation types
- **Library integrations** with fp-ts, monet, and purify-ts

### 🔧 Advanced Features

- **Type inference** with up to 10 function compositions
- **Multiple parameter support** (0-3 parameters per function)
- **Monad composition** for functional programming patterns
- **Before/after hooks** for pipeline lifecycle management
- **Memory efficient** with WeakMap and WeakSet usage

## Installation

```bash
npm install @hyperse/pipeline
# or
yarn add @hyperse/pipeline
```

## API Reference

### Middleware Engine

#### `Pipeline<T>`

A middleware container and invoker for handling context-based operations.

```typescript
class Pipeline<T> {
  constructor(...middlewares: Middleware<T>[]);
  use(...mw: Middleware<T>[]): Pipeline<T>;
  execute(context: T): Promise<void>;
}
```

**Parameters:**

- `T`: The context type that will be shared between middleware functions

**Methods:**

- `use(...middlewares)`: Add middleware functions to the pipeline
- `execute(context)`: Execute the middleware chain with the given context

#### `Middleware<T>`

Type definition for middleware functions.

```typescript
type Middleware<T> = (
  context: T,
  next: Next<T>,
  error?: Error
) => Promise<void> | void;

type Next<T> = (error?: Error) => Promise<Middleware<T>> | Promise<void>;
```

### Reactive Pipeline

#### `pipe(...functions)`

Creates a function that pipes input through a series of functions.

```typescript
function pipe<T1, T2, ..., T10>(
  fn0: () => PipeFuncReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => PipeFuncReturn<T2, L2, R2>,
  // ... up to 10 functions
): PipeReturn
```

**Features:**

- Supports up to 10 function compositions
- Handles 0-3 parameters per function
- Returns a callable function with additional methods

#### Returned Function Methods

```typescript
interface PipeFunction {
  (...args: unknown[]): Promise<unknown>;
  replace(replacements: Array<[number, Function]>): PipeFunction;
  replaceUndo(): PipeFunction;
  context(ctx: unknown): PipeFunction;
}
```

#### `exitPipe<T>(value: T)`

Exits the pipeline early and returns a wrapped value.

```typescript
function exitPipe<T>(value: T): ExitPipeReturnValue<T>;
```

#### `isExitPipeValue<T>(value: unknown)`

Type guard to check if a value is an exit pipe return value.

```typescript
function isExitPipeValue<T>(value: unknown): value is ExitPipeReturnValue<T>;
```

#### `pipeContext<T, L, R, C>(fn: (ctx: C) => (r: T, l: L) => R)`

Creates a context-aware function for the pipeline.

```typescript
function pipeContext<T, L, R, C>(
  fn: (ctx: C) => (r: T, l: L) => R
): (r: T, l: L) => R;
```

## Usage Examples

### 1. Middleware Engine

#### Basic Middleware Usage

```typescript
import { Pipeline } from '@hyperse/pipeline';

interface Context {
  [key: string]: any;
}

// Create a pipeline with initial middleware
const engine = new Pipeline<Context>((ctx, next) => {
  ctx.foobar = 'baz';
  await next();
});

// Add more middleware
engine.use(async (ctx, next) => {
  await new Promise((res) => setTimeout(() => res, 2000));
  ctx.another = 123;
  await next();
});

// Execute the pipeline
(async () => {
  const context: Context = {};
  await engine.execute(context);
  console.log(context);
  // => { foobar: "baz", another: 123 }
})();
```

#### Error Handling

```typescript
import { Pipeline } from '@hyperse/pipeline';

const engine = new Pipeline<Context>((ctx, next) => {
  ctx.foobar = 'baz';
  await next();
});

engine.use((ctx, next) => {
  fs.readFile(ctx.path, {}, (err, file) => {
    if (err) next(err);
    // ... Do something
    await next();
  });
});

// Error handling middleware
engine.use((ctx, next, error) => {
  if (error) console.error(error.message);
  await next();
});
```

### 2. Reactive Pipeline

#### Basic Pipeline

```typescript
import { pipe } from '@hyperse/pipeline';

const result = await pipe(
  () => 123,
  (n) => n + 1
)();
// result = 124
```

#### Pipeline with Arguments

```typescript
const result = await pipe(
  (n: number) => n + 1,
  (n) => n * 2
)(123);
// result = 248
```

#### Early Exit

```typescript
import { pipe, exitPipe, isExitPipeValue } from '@hyperse/pipeline';

const result = await pipe(
  () => 123,
  (n) => exitPipe(n + 1),
  () => 'qwe'
)();

if (isExitPipeValue(result)) {
  console.log(result.r); // 124
}
```

#### Context Injection

```typescript
import { pipe, pipeContext } from '@hyperse/pipeline';

const result = await pipe(
  () => 123,
  pipeContext((ctx: { n: number }) => (n) => n + ctx.n),
  (n) => n + 1
).context({ n: 1 })();
// result = 125
```

#### Dynamic Pipeline Modification

```typescript
const fn = pipe(
  () => 123,
  (n) => n + 1
);

// Replace a function in the pipeline
fn.replace([[0, () => 124]]);
const result1 = await fn(); // 125

// Undo the replacement
fn.replaceUndo();
const result2 = await fn(); // 124
```

#### Promise Support

```typescript
const result = await pipe(
  () => Promise.resolve(123),
  (n) => n + 1
)();
// result = 124
```

#### Complex Promise Pipeline

```typescript
const result = await pipe(
  () => 123,
  (n) => Promise.resolve(exitPipe(n + 1)),
  () => 'qwe'
)();

if (isExitPipeValue(result)) {
  console.log(result.r); // 124
}
```

### 3. Monad Integration

#### Either Support

```typescript
import { Either } from 'monet';

const result = await pipe(
  () => Either.left(123),
  (n, l) => l + 1 // l contains the left value
)();
// result = 124
```

#### Maybe Support

```typescript
import { Maybe } from 'monet';

const result = await pipe(
  () => Maybe.Some(123),
  (n) => n + 1
)();
// result = 124
```

#### Purify-ts Integration

```typescript
import { Either } from 'purify-ts';

const result = await pipe(
  () => Either.Left(123),
  (n, l) => l + 1
)();
// result = 124
```

### 4. Advanced Patterns

#### Nested Pipelines

```typescript
const result = await pipe(
  () => 123,
  pipe(
    (n: number) => n + 1,
    (n) => exitPipe(n + 1),
    () => true
  ),
  () => 'qwe'
)();

if (isExitPipeValue(result)) {
  console.log(result.r); // 125
}
```

#### Context with Nested Pipelines

```typescript
const result = await pipe(
  () => 123,
  pipe(
    (n: number) => n + 1,
    pipeContext((ctx: { n: number }) => (n) => n + ctx.n)
  ),
  (n) => n + 1
).context({ n: 1 })();
// result = 127
```

#### Error Handling in Pipeline

```typescript
try {
  const result = await pipe(
    async () => {
      throw new Error('Pipeline error');
    },
    (n) => n + 1
  )();
} catch (error) {
  console.error(error.message); // "Pipeline error"
}
```

## Type Safety

The library provides comprehensive TypeScript support with:

- **Generic type inference** for context and return types
- **Function signature preservation** across pipeline compositions
- **Monad type detection** for automatic composition
- **Parameter count validation** (0-3 parameters per function)
- **Return type inference** with exit pipe detection

## Performance Considerations

- **Lazy evaluation** - Pipelines are only executed when called
- **Memory efficient** - Uses WeakMap and WeakSet for internal state
- **Minimal overhead** - Direct function composition without unnecessary wrappers
- **Async optimization** - Efficient Promise handling and composition

## Browser Support

The library is built with modern JavaScript features and supports:

- Node.js 16+
- Modern browsers with ES2020+ support
- TypeScript 4.5+

## Development

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Build the project
yarn build
```

## License

MIT License - see [LICENSE](LICENSE) file for details.
