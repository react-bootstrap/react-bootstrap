import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CarbonAds from '@site/src/components/CarbonAds';
import useBootstrapMetadata from '@site/src/hooks/useBootstrapMetadata';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { rbVersion } = useBootstrapMetadata();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/introduction"
          >
            Get started
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/components/accordion"
          >
            Components
          </Link>
        </div>

        <div className="my-2">Current version: {rbVersion}</div>

        <div className={styles.carbonads}>
          <CarbonAds />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The most popular front-end framework, rebuilt for React"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
