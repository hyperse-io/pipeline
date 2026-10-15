import { Popup, PopupContent, PopupTrigger } from 'fumadocs-twoslash/ui';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Icon } from '@/components/Icon';
import { Mermaid } from '@/components/Mermaid';
import { generator } from '@/lib/generator';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    Tabs,
    Tab,
    Popup,
    PopupContent,
    PopupTrigger,
    AutoTypeTable: (props: Record<string, unknown>) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    // Injected by `remarkMdxMermaid` for ```mermaid code fences.
    Mermaid,
    // `<Icon name="Gauge" />` — resolves a Lucide icon by name in MDX.
    Icon,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
