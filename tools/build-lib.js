const fse = require('fs-extra');

const { srcRoot, libRoot } = require('./constants');

const runBabel = require('./run-babel');

module.exports = async function buildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  if (fse.existsSync(libRoot)) await fse.remove(libRoot);

  await runBabel(srcRoot, libRoot);

  console.log('Built: '.cyan + 'npm module'.green);
};
