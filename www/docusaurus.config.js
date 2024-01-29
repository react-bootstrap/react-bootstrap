// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const rbVersion = require('../package.json').version;

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Bootstrap',
  tagline: 'The most popular front-end framework, rebuilt for React.',
  url: 'https://react-bootstrap.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'react-bootstrap', // Usually your GitHub org/user name.
  projectName: 'react-bootstrap.github.io', // Usually your repo name.
  deploymentBranch: 'master',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    './plugins/react-resolver-plugin',
    './plugins/webpack-plugin',
    'docusaurus-plugin-sass',
    './plugins/bootstrap-metadata-plugin',
    './plugins/react-docgen-plugin',
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './src/css/docusaurus-theme.scss',
            './src/css/algolia.scss',
            './src/css/carbonads.scss',
            './src/css/examples.scss',
          ],
        },
      }),
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'top',
      },
      navbar: {
        title: 'React Bootstrap',
        logo: {
          alt: 'React Bootstrap Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/introduction',
            position: 'left',
            label: 'Getting Started',
          },
          {
            type: 'doc',
            docId: 'components/accordion',
            position: 'left',
            label: 'Components',
          },
          {
            type: 'dropdown',
            label: `v${rbVersion} (Bootstrap 5)`,
            items: [
              {
                label: 'v1.6.1 (Bootstrap 4)',
                href: 'https://react-bootstrap-v4.netlify.app/',
              },
              {
                label: 'v0.33.1 (Bootstrap 3)',
                href: 'https://react-bootstrap-v3.netlify.app/',
              },
            ],
            position: 'right',
          },
          {
            href: 'https://github.com/react-bootstrap/react-bootstrap',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/introduction',
              },
              {
                label: 'Layout',
                to: '/docs/layout/breakpoints',
              },
              {
                label: 'Forms',
                to: '/docs/forms/overview',
              },
              {
                label: 'Components',
                to: '/docs/components/accordion',
              },
              {
                label: 'Utilities',
                to: '/docs/utilities/transitions',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/react-bootstrap',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/AKfs9vpvRW',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/react-bootstrap/react-bootstrap',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} React Bootstrap. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'diff', 'json'],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'C38ZI55F9H',

        // Public API key: it is safe to commit it
        apiKey: '33985ee571397d832ef243988ff4c891',

        indexName: 'react_bootstrap_v4',

        contextualSearch: false,

        // // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },

        // // Optional: Algolia search parameters
        // searchParameters: {},

        // // Optional: path for search page that enabled by default (`false` to disable it)
        // searchPagePath: 'search',
      },
    }),
};

module.exports = config;
