const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const getConfig = require('./dist.webpack.config');

const targets = process.argv.slice(2);
const stdio = ['pipe', 'pipe', 'inherit'];

const srcRoot = path.join(__dirname, '../src/');
const distRoot = path.join(__dirname, '../dist/');
const libRoot = path.join(__dirname, '../lib/');
const esRoot = path.join(__dirname, '../es/');
const bowerRoot = path.join(__dirname, '../amd/');

const clean = async dir => fse.existsSync(dir) && fse.remove(dir);

const step = (name, root, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await clean(root);
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const has = t => !targets.length || targets.includes(t);

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', libRoot, () =>
  execa.shell(`npx babel ${srcRoot} --out-dir ${libRoot} --env-name "lib"`, {
    stdio
  })
);

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', esRoot, () =>
  execa.shell(`npx babel ${srcRoot} --out-dir ${esRoot} --env-name "esm"`, {
    stdio
  })
);

/**
 * Builds a `bower.json` file and outputs it to /amd.
 * Actual code is copied by the buildDist step
 */
const buildBower = step('browser package', bowerRoot, async () => {
  const pkgJson = require('../package.json');

  await fse.copy(
    path.resolve(__dirname, '../README.md'),
    path.join(bowerRoot, 'README.md')
  );

  await fse.writeJson(
    path.join(bowerRoot, 'bower.json'),
    {
      name: pkgJson.name,
      version: pkgJson.version,
      homepage: pkgJson.homepage,
      author: pkgJson.author,
      license: pkgJson.license,
      main: ['react-bootstrap.js'],
      keywords: pkgJson.keywords,
      ignore: ['**/.*'],
      dependencies: {
        react: pkgJson.peerDependencies.react,
        'react-dom': pkgJson.peerDependencies['react-dom']
      }
    },
    { spaces: 2 }
  );
});

/**
 * Bundles a minified and unminified version of react-bootstrap including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildDist = step(
  'browser distributable',
  distRoot,
  () =>
    new Promise((resolve, reject) => {
      webpack(
        [getConfig(distRoot, false), getConfig(distRoot, true)],
        async (err, stats) => {
          if (err || stats.hasErrors()) {
            reject(err || stats.toJson().errors);
            return;
          }

          if (has('bower')) {
            await fse.copy(distRoot, bowerRoot);
          }

          resolve();
        }
      );
    })
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`)
);

Promise.all([
  has('lib') && buildLib(),
  has('es') && buildEsm(),
  has('bower') && buildBower(),
  (has('dist') || has('bower')) && buildDist()
]).catch(err => {
  if (err) console.error(red(err.stack || err.toString()));
  process.exit(1);
});
