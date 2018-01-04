const path = require('path');
const webpack = require('webpack');

exports.modifyWebpackConfig = function modifyWebpackConfig({ config }) {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/));

  config.loader('raw-loader', {
    test: /src\/examples\//,
    loaders: ['raw-loader']
  });

  config._config.resolve.alias = {
    'react-bootstrap$': path.resolve(__dirname, '../lib/index.js'),
    'react-bootstrap/lib': path.resolve(__dirname, '../lib')
  };
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
