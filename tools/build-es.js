const fse = require('fs-extra');
const { srcRoot, esRoot } = require('./constants');
const runBabel = require('./run-babel');

module.exports = async function buildEsModules() {
  console.log('Building: '.cyan + 'es module'.green);

  if (fse.existsSync(esRoot)) await fse.remove(esRoot);

  await fse.mkdirp(esRoot);
  await runBabel(srcRoot, esRoot, { modules: false });

  console.log('Built: '.cyan + 'es module'.green);
};
