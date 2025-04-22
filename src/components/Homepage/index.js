import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/Homepage/Features';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import Heading from '@theme/Heading';
import LatestNews from '../LatestNews';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero', styles.heroBanner)}
      style={{
        backgroundImage: `url('/img/torai-background_base.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline} <br />
          <Link href="https://sns-loong.imakita3gyo.com/ja/clp/torai" target="_blank">
            Xで影響力を持つためのアカウント構築ツール 購入はこちらから
          </Link>
        </p>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            使い方を確認する
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home({ homePageBlogMetadata, recentPosts }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LatestNews recentPosts={recentPosts} homePageBlogMetadata={homePageBlogMetadata} />
      </main>
    </Layout>
  );
}
