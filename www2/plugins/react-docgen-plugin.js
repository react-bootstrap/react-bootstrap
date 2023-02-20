const fs = require('node:fs/promises');
const path = require('node:path');
const reactDocgen = require('react-docgen');

module.exports = () => ({
  name: 'react-docgen-plugin',
  configureWebpack(config) {
    return {
      resolve: {
        alias: {
          '@react-docgen-plugin': path.join(
            config.resolve.alias['@generated'],
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

        const output = reactDocgen.parse(
          buffer,
          reactDocgen.resolver.findExportedComponentDefinition,
          null,
          {
            filename: filePath,
          },
        );

        return output;
      } catch (err) {
        return null;
      }
    });

    let data = await Promise.all(promises);
    data = data.flat().filter(Boolean);

    return data;
  },
  async contentLoaded({ content, actions }) {
    const { createData, setGlobalData } = actions;

    const promises = [];
    for (const componentData of content) {
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

    const jsonPaths = await Promise.all(promises);
    const map = jsonPaths.reduce((acc, jsonPath, idx) => {
      acc[content[idx].displayName] = jsonPath;
      return acc;
    }, {});

    setGlobalData(map);
  },
});
