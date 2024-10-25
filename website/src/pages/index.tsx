import React from 'react';
import clsx from 'clsx';
import { useCopyToClipboard } from 'usehooks-ts';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { CheckIcon } from '@heroicons/react/24/outline';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import LogoDark from '@site/static/img/logo-dark.svg';
import LogoWhite from '@site/static/img/logo-white.svg';
import Layout from '@theme/Layout';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import styles from './index.module.css';
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = React.useState(false);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container text-center">
        <div className="w-[200px] overflow-hidden mx-auto rounded-2xl">
          <LogoDark className="w-[200px] hidden dark:block rounded-2xl overflow-hidden" />
          <LogoWhite className="w-[200px] dark:hidden rounded-2xl overflow-hidden" />
        </div>
        <h1 className="hero__title mt-4">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <iframe
          className="mt-2 h-[30px] w-[160px]"
          src="https://ghbtns.com/github-btn.html?user=hyperse-io&repo=pipeline&type=star&count=true&size=large"
        />
        <div className={clsx(styles.buttons, 'my-4 gap-4')}>
          <Link
            className="button button--primary md:py-3 md:px-4 rounded-2xl dark:text-white"
            to="/docs/getting-started"
          >
            Watch
          </Link>
          <Link
            className="button button--danger md:py-3 md:px-4 rounded-2xl dark:text-white"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
          <Link
            className="button button--warning md:py-3 md:px-4 rounded-2xl"
            to="/docs/getting-started"
          >
            Donate
          </Link>
        </div>
        <div className="my-8 mx-auto max-w-md rounded-xl border border-solid border-gray-300 dark:border-gray-100 p-2">
          <Tabs>
            <TabItem value="npm" label="npm" default>
              <button
                onMouseLeave={() => setCopied(false)}
                onClick={() => {
                  copy('npm i @hyperse/pipeline');
                  setCopied(true);
                }}
                className="flex w-full border border-solid border-gray-400 dark:border-gray-800 dark:hover:border-gray-600 p-2 rounded-lg hover:border-gray-600 cursor-pointer text-slate-500 hover:text-slate-400 items-center bg-transparent justify-between"
              >
                <span className="text-base">npm i @hyperse/pipeline</span>
                {copied ? (
                  <CheckIcon className="h-4 w-4 dark:text-white text-gray-500" />
                ) : (
                  <DocumentDuplicateIcon className="h-4 w-4 dark:text-white text-gray-500" />
                )}
              </button>
            </TabItem>
            <TabItem value="yarn" label="yarn">
              <TabItem value="npm" label="npm" default>
                <button
                  onMouseLeave={() => setCopied(false)}
                  onClick={() => {
                    copy('yarn add @hyperse/pipeline');
                    setCopied(true);
                  }}
                  className="flex w-full border border-solid border-gray-400 dark:border-gray-800 dark:hover:border-gray-600 p-2 rounded-lg hover:border-gray-600 cursor-pointer text-slate-500 hover:text-slate-400 items-center bg-transparent justify-between"
                >
                  <span className="text-base">yarn add @hyperse/pipeline</span>
                  {copied ? (
                    <CheckIcon className="h-4 w-4 dark:text-white text-gray-500" />
                  ) : (
                    <DocumentDuplicateIcon className="h-4 w-4 dark:text-white text-gray-500" />
                  )}
                </button>
              </TabItem>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`A middleware engine written in typescript, it will be used on a couples of projects, such as @hyperse/tracker`}
      description={siteConfig.tagline}
    >
      <div className={styles.topBackground} />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
