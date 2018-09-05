/* eslint-disable global-require */
const path = require('path');
const escapeRegExp = require('lodash/escapeRegExp');
const defaultDescriptions = require('./src/defaultPropDescriptions');
const { addBootstrapPropTypes } = require('./bsPropUtils');

const root = escapeRegExp(path.resolve(__dirname, '../'));
const nodeModules = `${path.sep}node_modules${path.sep}`;

// eslint-disable-next-line
require('@babel/register')({
  ...require('../.babelrc.js')({ env: () => 'build' }),
  only: [
    // Only the src directory
    new RegExp(`^${escapeRegExp(path.join(root, '/src/'))}`, 'i')
  ],
  ignore: [
    // Ignore any node_modules inside the current working directory.
    new RegExp(`^${root}(?:${path.sep}.*)?${escapeRegExp(nodeModules)}`, 'i')
  ]
});

module.exports = {
  siteMetadata: {
    title: 'React-Bootstrap Documentation',
    author: 'Jason Quense',
    browsers: [
      'last 4 Chrome versions',
      'last 4 Firefox versions',
      'last 2 Edge versions',
      'last 2 Safari versions'
    ]
  },
  plugins: [
    'gatsby-plugin-layout',
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
            let Component = require(absolutePath);

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
