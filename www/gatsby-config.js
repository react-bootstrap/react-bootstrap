const path = require('path');
const remarkSlug = require('remark-slug');
const { cleanDoclets } = require('gatsby-transformer-react-docgen/doclets');
const defaultDescriptions = require('./src/defaultPropDescriptions');

module.exports = {
  siteMetadata: {
    title: 'React-Bootstrap Documentation',
    author: 'react bootstrap contributors',
    browsers: [
      'last 4 Chrome versions',
      'last 4 Firefox versions',
      'last 2 Edge versions',
      'last 2 Safari versions',
    ],
  },
  plugins: [
    'gatsby-plugin-sorted-assets',
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayout: require.resolve('./src/layouts/ApiLayout'),
        mdPlugins: [remarkSlug],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, '../src'),
        name: 'source',
      },
    },
    {
      resolve: 'gatsby-transformer-react-docgen',
      options: {
        resolver: require('./resolveHocComponents'),
        handlers: [
          function defaultDescriptionsHandler(docs) {
            docs._props.forEach((_, name) => {
              if (defaultDescriptions[name]) {
                let prop = docs.getPropDescriptor(name);
                let dflt = defaultDescriptions[name];

                if (dflt && !cleanDoclets(prop.description))
                  prop.description = `${dflt}\n${prop.description}`;
              }
            });
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs'],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-astroturf',
      options: { extension: '.module.scss' },
    },
  ],
};
