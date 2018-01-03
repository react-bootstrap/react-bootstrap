const fse = require('fs-extra');
const webpack = require('webpack');
const { plugins, rules } = require('webpack-atoms');

const { distRoot } = require('./constants');
const runBabel = require('./run-babel');

function config(optimize) {
  let babelOptions = runBabel.getConfig({ modules: false });

  return {
    entry: {
      'react-bootstrap': './src/index.js'
    },

    output: {
      path: distRoot,
      filename: optimize ? '[name].min.js' : '[name].js',
      library: 'ReactBootstrap',
      libraryTarget: 'umd'
    },
    module: {
      rules: [rules.js({ ...babelOptions, cacheDirectory: true })]
    },
    plugins: [
      optimize && plugins.uglify(),
      plugins.moduleConcatenation(),
      plugins.define({
        'process.env': {
          NODE_ENV: JSON.stringify(optimize ? 'production' : 'development')
        }
      })
    ].filter(Boolean),

    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  };
}

module.exports = async function buildDistributable() {
  console.log('Building: '.cyan + 'distributable'.green);

  if (fse.existsSync(distRoot)) await fse.remove(distRoot);

  await new Promise((resolve, reject) => {
    webpack([config(), config(true)], (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || stats.toJson().errors);
        return;
      }
      resolve();
    });
  });

  console.log('Built: '.cyan + 'distributable'.green);
};
