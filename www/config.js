const crypto = require('crypto');
const fs = require('fs');

function getIntegrity(file) {
  const algo = 'sha384';
  const content = fs.readFileSync(require.resolve(file), 'utf8');
  const hash = crypto.createHash(algo).update(content, 'utf8').digest('base64');

  return `${algo}-${hash}`;
}

const bootstrapVersion = require('bootstrap/package.json').version;

const shortVersion = bootstrapVersion.split('.').slice(0, 2).join('.');

const netlify =
  process.env.NETLIFY === 'true'
    ? {
        pullRequest: process.env.PULL_REQUEST,
        reviewId: process.env.REVIEW_ID,
        branch: process.env.BRANCH,
      }
    : null;

const config = {
  bootstrapVersion,
  docsUrl: `https://getbootstrap.com/docs/${shortVersion}`,
  version: require('../package.json').version,
  cssHash: getIntegrity('bootstrap/dist/css/bootstrap.min.css'),
  netlify,
};

module.exports = config;
