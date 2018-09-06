const path = require('path');

exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  plugins,
  loaders
}) {
  actions.setWebpackConfig({
    devtool: 'cheap-inline-module-source-map',
    module: {
      rules: [
        {
          test: /src\/examples\//,
          use: loaders.raw()
        }
      ]
    },
    resolve: {
      alias: {
        'react-bootstrap$': path.resolve(__dirname, '../src/index.js'),
        'react-bootstrap/lib': path.resolve(__dirname, '../src')
      }
    },
    plugins: [
      // See https://github.com/FormidableLabs/react-live/issues/5
      plugins.ignore(/^(xor|props)$/)
    ]
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      babelrc: true,
      envName: 'docs',
      root: path.resolve(__dirname, '../')
    }
  });
};
