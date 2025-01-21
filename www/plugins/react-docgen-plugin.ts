import fs from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from '@docusaurus/types';
import * as reactDocgen from 'react-docgen';

const DOCLET_PATTERN = /^@(\w+)(?:$|\s((?:[^](?!^@\w))*))/gim;

export default () =>
  ({
    name: 'react-docgen-plugin',
    configureWebpack(config) {
      return {
        resolve: {
          alias: {
            '@react-docgen-plugin': path.join(
              config.resolve?.alias?.['@generated'],
              'react-docgen-plugin',
              'default',
            ),
          },
        },
      };
    },
    async loadContent() {
      const srcPath = path.join(__dirname, '../../src');
      const files = await fs.readdir(srcPath);

      const promises = files.map(async (file) => {
        try {
          const filePath = path.join(srcPath, file);
          const buffer = await fs.readFile(filePath);

          const output = reactDocgen.parse(buffer, {
            filename: filePath,
          });

          return output;
        } catch (err) {
          return null;
        }
      });

      let data = await Promise.all(promises);
      return data.flat().filter(Boolean);
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;

      const promises: any[] = [];
      for (const componentData of content) {
        // Attach doclets to each prop.
        if (componentData.props) {
          Object.keys(componentData.props).forEach((propName) => {
            const prop = componentData.props[propName];
            prop.doclets = {};

            if (prop.description) {
              prop.doclets = reactDocgen.utils.docblock.getDoclets(
                prop.description,
              );

              // Strip out the doclets from the description.
              prop.description = prop.description
                .replace(DOCLET_PATTERN, '')
                .trim();
            }
          });
        }

        promises.push(
          createData(
            `${componentData.displayName}.json`,
            JSON.stringify({
              description: componentData.description,
              props: componentData.props,
            }),
          ),
        );
      }

      await Promise.all(promises);
    },
  }) satisfies Plugin<any[]>;
