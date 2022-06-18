const path = require('path');

module.exports = {
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, '../.babelrc.js'),
    },
  },
  globals: {
    graphql: false,
    config: false,
  },
  rules: {
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-arrow-callback': 'off',
    'jsx-a11y/label-has-associated-control': 'off', // this rule doesn't work..
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
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
        'max-classes-per-file': 'off',
        'no-console': 'off',
      },
    },
    {
      files: [
        '.eslintrc.js',
        'config.js',
        'gatsby-config.js',
        'gatsby-node.js',
      ],
      settings: {
        'import/resolver': 'node',
      },
    },
  ],
};
