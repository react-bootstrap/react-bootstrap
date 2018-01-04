const path = require('path');
const defaultDescriptions = require('./src/defaultPropDescriptions');
const { addBootstrapPropTypes } = require('./bsPropUtils');

module.exports = {
  siteMetadata: {
    title: 'React-Bootstrap Documentation',
    author: 'Jason Quense'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, '../src'),
        name: 'source'
      }
    },
    {
      resolve: 'gatsby-transformer-react-docgen',
      options: {
        handlers: [
          function applyBootstrapPropsHandler(docs, _, { absolutePath }) {
            // eslint-disable-next-line
            let Component = require(path
              .relative(__dirname, absolutePath)
              .replace('src', 'lib'));

            if (Component) {
              addBootstrapPropTypes(docs, Component);
            }
          },
          function defaultDescriptionsHandler(docs) {
            docs._props.forEach((_, name) => {
              if (defaultDescriptions[name]) {
                let desc = docs.getPropDescriptor(name);
                desc.description =
                  desc.description || defaultDescriptions[name];
              }
            });
          }
        ]
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs']
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-less'
  ]
};
