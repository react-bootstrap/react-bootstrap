const path = require('path');
const _ = require('lodash');

exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  plugins,
  loaders,
  getConfig,
}) {
  actions.setWebpackConfig({
    devtool: 'cheap-inline-module-source-map',
    module: {
      rules: [
        {
          include: path.resolve(__dirname, 'src/examples'),
          use: loaders.raw(),
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, '../node_modules')],
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

  const current = getConfig();
  current.module.rules = current.module.rules.filter(r => r.enforce !== 'pre');
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      babelrc: true,
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
