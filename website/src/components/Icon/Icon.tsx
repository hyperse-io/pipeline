'use client';

import type { FC } from 'react';
import { icons as lucideIcons } from 'lucide-react';

export type LucideIconProps = {
  /** The Lucide icon name in PascalCase, e.g. `Gauge` or `ShieldCheck`. */
  name: string;
  className?: string;
};

/**
 * Renders a [Lucide](https://lucide.dev) icon by name.
 *
 * MDX has no automatic import resolution, so naming an icon in a `<Card />` or
 * `<Callout />` requires an actual component. This keeps the content readable as
 * `<Icon name="Gauge" />` without an import per icon.
 */
export const Icon: FC<LucideIconProps> = ({ name, className }) => {
  const LucideIcon = lucideIcons[name as keyof typeof lucideIcons];

  if (!LucideIcon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] Unknown Lucide icon "${name}".`);
    }
    return null;
  }

  return <LucideIcon className={className} />;
};
