const path = require('path');
const _ = require('lodash');

exports.onCreateWebpackConfig = function onCreateWebpackConfig({
  actions,
  plugins,
  loaders,
  getConfig
}) {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          include: path.resolve(__dirname, 'src/examples'),
          use: loaders.raw()
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, '../node_modules')],
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

  const current = getConfig();
  current.module.rules = current.module.rules.filter(r => r.enforce !== 'pre');
  console.log(
    _.flatMap(current.module.rules, r => r.oneOf)
      .filter(Boolean)
      .map(r => r.use)
  );
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
