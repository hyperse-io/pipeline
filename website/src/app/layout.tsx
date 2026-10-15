import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { basePath } from '@/lib/base-path';
import '@/styles/globals.css';

export const metadata: Metadata = {
  description:
    'Hyperse Pipeline is a powerful TypeScript middleware engine and reactive pipeline library for handling data flow.',
  metadataBase: new URL('https://hyperse-io.github.io/pipeline/'),
  keywords: [
    'Hyperse',
    'Pipeline',
    'Middleware',
    'Reactive',
    'TypeScript',
    'JavaScript',
  ],
  generator: 'Hyperse',
  applicationName: 'Hyperse Pipeline',
  appleWebApp: {
    title: 'Hyperse Pipeline',
  },
  title: {
    default: 'Hyperse Pipeline – TypeScript middleware & reactive pipeline',
    template: '%s | Hyperse Pipeline',
  },
  openGraph: {
    url: './',
    siteName: 'Hyperse Pipeline',
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'msapplication-TileColor': '#fff',
  },
  twitter: {
    site: 'https://hyperse-io.github.io/pipeline/',
  },
  alternates: {
    canonical: './',
  },
};

const RootLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href={`${basePath}/favicon.ico`}
          type="image/x-icon"
          sizes="32x32"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {/*
          Fumadocs' static search client builds its URL as
          `join(BASE_PATH, api)`, and `BASE_PATH` comes from Vite's
          `import.meta.env.BASE_URL` — which does not exist in Next.js, so it is
          always `'/'`. Next.js' `basePath` is therefore NOT applied
          automatically, and omitting it makes the client request
          `/api/search` (404) instead of `${basePath}/api/search`.
        */}
        <RootProvider
          search={{
            options: { type: 'static', api: `${basePath}/api/search` },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
