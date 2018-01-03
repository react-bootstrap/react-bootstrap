const path = require('path');
const fse = require('fs-extra');
const { bowerRoot } = require('./constants');
const pkgJson = require('../package.json');

module.exports = async function buildBower() {
  console.log('Building: '.cyan + 'bower module'.green);

  if (fse.existsSync(bowerRoot)) await fse.remove(bowerRoot);

  await fse.mkdirp(bowerRoot);

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

  console.log('Built: '.cyan + 'bower module'.green);
};
