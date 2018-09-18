const path = require('path');
const _ = require('lodash');

exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  plugins,
  loaders,
  stage,
  getConfig,
}) {
  actions.setWebpackConfig({
    devtool: stage.includes('develop')
      ? 'cheap-inline-module-source-map'
      : 'source-map',
    module: {
      rules: [
        {
          include: path.resolve(__dirname, 'src/examples'),
          use: loaders.raw(),
        },
      ],
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, '../node_modules/react'),
        'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
        'react-bootstrap$': path.resolve(__dirname, '../src/index.js'),
        'react-bootstrap/lib': path.resolve(__dirname, '../src'),
      },
    },
    plugins: [
      // See https://github.com/FormidableLabs/react-live/issues/5
      plugins.ignore(/^(xor|props)$/),
    ],
  });

  getConfig().resolve.modules = ['node_modules'];
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      envName: 'docs',
      root: path.resolve(__dirname, '../'),
    },
  });
};

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/components/tooltips/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/components/overlays/#tooltips`,
  });
  createRedirect({
    fromPath: `/components/popovers/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/components/overlays/#popovers`,
  });
};
