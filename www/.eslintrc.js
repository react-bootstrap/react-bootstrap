const path = require('path');

module.exports = {
  globals: {
    graphql: false,
    config: false,
  },
  rules: {
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'prefer-arrow-callback': 'off',
    'jsx-a11y/label-has-associated-control': 'off', // this rule doesn't work..
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              'react-bootstrap': path.resolve(__dirname, '../src'),
            },
          },
        },
      },
    },
  },
  overrides: [
    {
      files: ['src/examples/**'],
      rules: {
        'comma-dangle': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['config.js', 'gatsby-config.js', 'gatsby-node.js'],
      settings: {
        'import/resolver': 'node'
      }
    }
  ],
};
