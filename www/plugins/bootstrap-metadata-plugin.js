const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const bootstrapPackageJson = require('bootstrap/package.json');
const rbPackageJson = require('../../package.json');

async function getIntegrity(filePath) {
  const algo = 'sha384';
  const content = await fs.readFile(require.resolve(filePath), 'utf8');
  const hash = crypto.createHash(algo).update(content, 'utf8').digest('base64');

  return `${algo}-${hash}`;
}

module.exports = () => ({
  name: 'bootstrap-metadata-plugin',
  async loadContent() {
    const bsShortVersion = bootstrapPackageJson.version
      .split('.')
      .slice(0, 2)
      .join('.');

    const bootstrapCssHash = await getIntegrity(
      'bootstrap/dist/css/bootstrap.min.css',
    );

    return {
      bootstrapVersion: bootstrapPackageJson.version,
      bootstrapDocsUrl: `https://getbootstrap.com/docs/${bsShortVersion}`,
      bootstrapCssHash,
      rbVersion: rbPackageJson.version,
    };
  },
  async contentLoaded({ content, actions }) {
    const { setGlobalData } = actions;

    setGlobalData(content);
  },
});
