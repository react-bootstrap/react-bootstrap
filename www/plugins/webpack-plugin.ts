import path from 'node:path';
import webpack from 'webpack';
import type { Plugin } from '@docusaurus/types';

const plugin: Plugin = () => ({
  name: 'webpack-plugin',
  configureWebpack(_, isServer, { getJSLoader }) {
    return {
      devtool: 'inline-cheap-module-source-map',
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            include: [path.resolve(__dirname, '../../src')],
            use: [
              getJSLoader(
                isServer,
                path.resolve(__dirname, '../babel.config.js'),
              ),
            ],
          },
        ],
      },
      resolve: {
        alias: {
          'react-bootstrap': path.resolve(__dirname, '../../src'),
        },
      },
      plugins: [
        new webpack.DefinePlugin({
          __DEV__: process.env.NODE_ENV === 'development',
        }),
      ],
    };
  },
});

export default plugin;
