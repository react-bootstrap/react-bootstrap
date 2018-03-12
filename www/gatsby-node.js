const path = require('path');

exports.modifyWebpackConfig = function modifyWebpackConfig({
  actions,
  plugins,
  loaders
}) {
  actions.setWebpackConfig({
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
        react: path.resolve(__dirname, '../node_modules/react'),
        'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
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
  actions.setBabelPreset({
    name: `@babel/preset-flow`
  });
};

exports.onCreatePage = ({ page }) => {
  if (page.path.startsWith('/getting-started')) {
    page.layout = 'getting-started';
  } else if (page.path.startsWith('/layout')) {
    page.layout = 'layout';
  } else if (page.path.startsWith('/components')) {
    page.layout = 'components';
  } else if (page.path.startsWith('/utilities')) {
    page.layout = 'utilities';
  }
};
