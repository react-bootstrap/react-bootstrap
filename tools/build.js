const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const cherryPick = require('cherry-pick').default;
const getConfig = require('./dist.webpack.config');

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '../src');
const typesRoot = path.join(__dirname, '../types');

const libRoot = path.join(__dirname, '../lib');
const distRoot = path.join(libRoot, 'dist');
const cjsRoot = path.join(libRoot, 'cjs');
const esRoot = path.join(libRoot, 'esm');

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = (cmd) =>
  execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const has = (t) => !targets.length || targets.includes(t);

const copyTypes = (dest) => shell(`cpy ${typesRoot}/components/*.d.ts ${dest}`);

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', async () => {
  await shell(`npx babel ${srcRoot} --out-dir ${cjsRoot} --env-name "cjs"`);
  await copyTypes(libRoot);
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await shell(`npx babel ${srcRoot} --out-dir ${esRoot} --env-name "esm"`);
  await copyTypes(esRoot);
});

/**
 * Bundles a minified and unminified version of react-bootstrap including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildDist = step(
  'browser distributable',
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

const buildDirectories = step('Linking directories', () =>
  cherryPick({
    inputDir: '../src',
    cjsDir: 'cjs',
    esmDir: 'esm',
    cwd: libRoot,
  }),
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
);

clean();

Promise.all([
  has('lib') && buildLib(),
  has('es') && buildEsm(),
  has('dist') && buildDist(),
])
  .then(buildDirectories)
  .catch((err) => {
    if (err) console.error(red(err.stack || err.toString()));
    process.exit(1);
  });
