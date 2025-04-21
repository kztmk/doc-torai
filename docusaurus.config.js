// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

require('dotenv').config();
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '虎威サポート',
  tagline: '虎威サポートサイト',
  favicon: 'img/favicon.ico',
  staticDirectories: ['public', 'static'],

  // Set the production url of your site here
  url: 'https://doc-torai.try-try.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '今北産業', // Usually your GitHub org/user name.
  projectName: '虎威', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  future: {
    experimental_faster: true,
  },
  customFields: {
    googleTagManager: process.env.DOCUSAURUS_GOOGLE_TAG_MANAGER,
    emailjsPublicKey: process.env.DOCUSAURUS_EMAILJS_PUBLIC_KEY,
    emailjsServiceId: process.env.DOCUSAURUS_EMAILJS_SERVICE_ID,
    emailjsTemplateId: process.env.DOCUSAURUS_EMAILJS_TEMPLATE_ID,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/sources.scss')],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '虎威サポート',
        logo: {
          alt: '虎威ロゴ',
          src: 'img/torai_icon512.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'マニュアル',
          },
          { to: '/blog', label: 'ブログ', position: 'left' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'ドキュメント',
            items: [
              {
                label: 'マニュアル',
                to: '/docs/intro',
              },
              {
                label: '問合せ',
                to: '/contact',
              },
            ],
          },
          {
            title: '法務情報',
            items: [
              {
                label: '利用規約',
                to: '/terms-and-conditions-ja',
              },
              {
                label: 'プライバーシーポリシー',
                to: '/privacy-policy-ja',
              },
              {
                label: 'クッキーポリシー',
                to: '/cookie-policy-ja',
              },
              {
                label: '免責事項',
                to: '/disclaimer-ja',
              },
              {
                label: '使用許諾書',
                to: '/license-agreement-ja',
              },
            ],
          },
          {
            title: '関連サイト',
            items: [
              {
                label: 'ブログ',
                to: '/blog',
              },
              {
                label: '虎威',
                href: 'https://torai.try-try.com/',
              },
              {
                label: '虎威購入',
                href: 'https://sns-loong.imakita3gyo.com/ja/clp/torai',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://doc-torai.try-try.com" style="font-weight: bold;" target="_blank">今北産業</a>`,
      },
      prism: {
        theme: prismThemes.oneDark,
        darkTheme: prismThemes.oneDark,
      },
    }),
  plugins: [
    ['docusaurus-plugin-sass', {}],
    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      }),
    ],
    [
      './src/plugins/blog-plugin',
      {
        path: 'blog',
        editLocalizedFiles: false,
        blogTitle: 'ブログ',
        blogDescription: '虎威の不具合、アップデート情報、虎威の使い方などを紹介するブログです。',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'もくじ',
        routeBasePath: 'blog',
        include: ['**/*.md', '**/*.mdx'],
        exclude: ['**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**', '**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**'],
        postsPerPage: 6,
        truncateMarker: /<!--\s*(truncate)\s*-->/,
        showReadingTime: true,
        onUntruncatedBlogPosts: 'ignore',
        // Remove this to remove the "edit this page" links.
        editUrl: 'https://github.com/namnguyenthanhwork/docusaurus-material-ui-template/tree/master/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
      },
    ],
  ],
};

export default config;
