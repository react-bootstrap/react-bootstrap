import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import type { Plugin } from '@docusaurus/types';
import bootstrapPackageJson from 'bootstrap/package.json';
import rbPackageJson from '../../package.json';

interface BootstrapMetadata {
  bootstrapVersion: string;
  bootstrapDocsUrl: string;
  bootstrapCssHash: string;
  rbVersion: string;
}

async function getIntegrity(filePath: string): Promise<string> {
  const algo = 'sha384';
  const content = await fs.readFile(require.resolve(filePath), 'utf8');
  const hash = crypto.createHash(algo).update(content, 'utf8').digest('base64');

  return `${algo}-${hash}`;
}

export default () =>
  ({
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
  }) satisfies Plugin<BootstrapMetadata>;
