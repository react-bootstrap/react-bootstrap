
const fse = require('fs-extra');
const { srcRoot, esRoot } = require('./constants');
const runBabel = require('./run-babel');


module.exports = async function buildEsModules() {
  console.log('Building: '.cyan + 'es module'.green);

  const options = await fse.readJson(require.resolve('../.babelrc'));

  options.presets[0][1].modules = false;
  options.babelrc = false;

  if (fse.existsSync(esRoot)) await fse.remove(esRoot);

  await fse.mkdirp(esRoot);
  await runBabel(srcRoot, esRoot, options);

  console.log('Built: '.cyan + 'es module'.green);
};
