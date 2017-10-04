const path = require('path');
const defaultDescriptions = require('./src/defaultPropDescriptions');
const { requireInNewContext, addBootstrapPropTypes } = require('./bsPropUtils');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter Blog',
    author: 'Kyle Mathews',
  },
  plugins: [
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
        handlers: [
          function applyBootstrapPropsHandler(docs, _, { absolutePath }) {
            let Component = requireInNewContext(absolutePath);

            if (Component) {
              addBootstrapPropTypes(docs, Component);
            }
          },
          function defaultDescriptionsHandler(docs) {
            docs._props.forEach((_, name) => {
              if (defaultDescriptions[name]) {
                let desc = docs.getPropDescriptor(name);
                desc.description = desc.description || defaultDescriptions[name];
              }
            });
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
        ],
      },
    },
    'gatsby-plugin-catch-links',
  ],
};
