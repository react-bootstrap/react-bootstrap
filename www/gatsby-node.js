const _ = require('lodash');
const path = require('path');

const config = require('./config');

const stringifiedConfig = Object.entries(config).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: JSON.stringify(value) }),
  {},
);

exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  plugins,
  loaders,
  stage,
  getConfig,
}) {
  actions.setWebpackConfig({
    devtool: stage.includes('develop')
      ? 'inline-module-source-map'
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
      symlinks: false,
      extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
      alias: {
        react: path.resolve(__dirname, '../node_modules/react'),
        'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
        'react-bootstrap': path.resolve(__dirname, '../src'),
      },
    },
    plugins: [
      // See https://github.com/FormidableLabs/react-live/issues/5
      plugins.ignore(/^(xor|props)$/),
      plugins.define({
        config: stringifiedConfig,
      }),
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
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
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
