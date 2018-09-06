const path = require('path');

module.exports = {
  globals: {
    graphql: false
  },
  rules: {
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'prefer-arrow-callback': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              'react-bootstrap$': path.resolve(__dirname, '../src/index.js'),
              'react-bootstrap/lib': path.resolve(__dirname, '../src')
            }
          }
        }
      }
    }
  },
  overrides: [
    {
      files: ['src/examples/**'],
      rules: {
        'comma-dangle': 'off',
        'no-console': 'off'
      }
    }
  ]
};
