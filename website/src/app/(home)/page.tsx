import type { FC } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Code, Gauge, Layers, Sparkles, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hyperse Pipeline',
  description:
    'A powerful TypeScript middleware engine and reactive pipeline library for handling data flow and middleware patterns.',
};

const features = [
  {
    icon: <Layers />,
    title: 'Middleware Engine',
    description:
      'Type-safe, Koa-style middleware composition with shared context and automatic error propagation.',
  },
  {
    icon: <Workflow />,
    title: 'Reactive Pipeline',
    description:
      'Functional pipe composition with early exit, context injection and up to 10 typed steps.',
  },
  {
    icon: <Sparkles />,
    title: 'Monad Integration',
    description:
      'Compose Either, Maybe and Validation from monet, fp-ts and purify-ts directly inside a pipe.',
  },
  {
    icon: <Gauge />,
    title: 'Built for speed',
    description:
      'Lazy evaluation, direct function composition and WeakMap-based bookkeeping for minimal overhead.',
  },
];

const pipeSnippet = `import { pipe } from '@hyperse/pipeline';

const result = await pipe(
  () => 123,
  (n) => n + 1
)();
// result => 124`;

const middlewareSnippet = `import { Pipeline } from '@hyperse/pipeline';

const engine = new Pipeline<{ logs: string[] }>(async (ctx, next) => {
  ctx.logs.push('first');
  await next();
});

engine.use(async (ctx, next) => {
  ctx.logs.push('second');
  await next();
});`;

const Snippet: FC<{ code: string }> = ({ code }) => (
  <pre className="bg-fd-card overflow-x-auto rounded-lg p-4 text-sm">
    <code>{code}</code>
  </pre>
);

const IndexPage: FC = () => {
  return (
    <>
      <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          A middleware engine and a reactive pipeline
        </h1>
        <p className="text-fd-muted-foreground max-w-2xl text-lg">
          Two complementary paradigms for handling data flow in TypeScript —
          with full type inference and zero runtime dependencies.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="bg-fd-primary text-fd-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            href="https://github.com/hyperse-io/pipeline"
            className="hover:bg-fd-accent rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            View on GitHub
          </Link>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 pb-24">
        <Cards>
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              description={feature.description}
            />
          ))}
        </Cards>
      </section>

      <section className="container mx-auto max-w-3xl px-4 pb-24">
        <h2 className="mb-4 text-2xl font-semibold">Quick look</h2>

        <p className="text-fd-muted-foreground mb-3">
          Compose transformations with <code>pipe</code>:
        </p>
        <Snippet code={pipeSnippet} />

        <p className="text-fd-muted-foreground mt-6 mb-3">
          Or build an ordered middleware chain with <code>Pipeline</code>:
        </p>
        <Snippet code={middlewareSnippet} />
      </section>

      <section className="container mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-4 text-2xl font-semibold">Explore the docs</h2>
        <Cards>
          <Card title="Installation" href="/docs/installation" icon={<Code />}>
            Add the package and verify it resolves.
          </Card>
          <Card
            title="Middleware Engine"
            href="/docs/middleware"
            icon={<Layers />}
          >
            Ordered, context-aware middleware chains.
          </Card>
          <Card
            title="Reactive Pipeline"
            href="/docs/reactive"
            icon={<Workflow />}
          >
            Compose typed data transformations.
          </Card>
          <Card title="Examples" href="/docs/examples" icon={<Code />}>
            Nested pipelines, monads and error handling.
          </Card>
        </Cards>
      </section>
    </>
  );
};

export default IndexPage;
