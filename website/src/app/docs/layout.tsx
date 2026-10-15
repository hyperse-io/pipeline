import type { FC, ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

const DocsRootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions}
      sidebar={{ defaultOpenLevel: 1 }}
    >
      {children}
    </DocsLayout>
  );
};

export default DocsRootLayout;
