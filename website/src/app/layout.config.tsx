import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'hyperse-io',
  repo: 'pipeline',
  branch: 'main',
};

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2">
        <span className="font-extralight">Hyperse Pipeline</span>
      </span>
    ),
  },
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};
