const fs = require('fs');
const crypto = require('crypto');

function getIntegrity(file) {
  const algo = 'sha384';
  const content = fs.readFileSync(require.resolve(file), 'utf8');
  const hash = crypto
    .createHash(algo)
    .update(content, 'utf8')
    .digest('base64');

  return `${algo}-${hash}`;
}

const bootstrapVersion = require('bootstrap/package.json').version;

const shortVersion = bootstrapVersion
  .split('.')
  .slice(0, 2)
  .join('.');

const config = {
  bootstrapVersion,
  docsUrl: `https://getbootstrap.com/docs/${shortVersion}`,
  version: require('../package.json').version,
  cssHash: getIntegrity('bootstrap/dist/css/bootstrap.min.css'),
};

module.exports = config;
