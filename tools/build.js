const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const getConfig = require('./dist.webpack.config');

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '../src/');
const typesRoot = path.join(__dirname, '../types/');
const distRoot = path.join(__dirname, '../dist/');
const libRoot = path.join(__dirname, '../lib/');
const esRoot = path.join(__dirname, '../es/');

const clean = async dir => fse.existsSync(dir) && fse.remove(dir);

const step = (name, root, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await clean(root);
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = cmd => execa.shell(cmd, { stdio: ['pipe', 'pipe', 'inherit'] });

const has = t => !targets.length || targets.includes(t);

const copyTypes = dest => shell(`cpy ${typesRoot}/components/*.d.ts ${dest}`);

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', libRoot, async () => {
  await shell(`npx babel ${srcRoot} --out-dir ${libRoot} --env-name "lib"`);

  await copyTypes(libRoot);
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', esRoot, async () => {
  await shell(`npx babel ${srcRoot} --out-dir ${esRoot} --env-name "esm"`);
  await copyTypes(esRoot);
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

          resolve();
        },
      );
    }),
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
);

Promise.all([
  has('lib') && buildLib(),
  has('es') && buildEsm(),
  has('dist') && buildDist(),
]).catch(err => {
  if (err) console.error(red(err.stack || err.toString()));
  process.exit(1);
});
