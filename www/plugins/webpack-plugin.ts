import path from 'node:path';
import type { Plugin } from '@docusaurus/types';

export default () =>
  ({
    name: 'webpack-plugin',
    configureWebpack(_, isServer, { currentBundler, getJSLoader }) {
      return {
        devtool: 'inline-cheap-module-source-map',
        module: {
          rules: [
            {
              test: /\.(j|t)sx?$/,
              include: [path.resolve(__dirname, '../../src')],
              use: [
                // TODO: getJSLoader TS signature doesn't match usage in docs:
                // https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#utils
                (getJSLoader as any)(
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
          new currentBundler.instance.DefinePlugin({
            __DEV__: process.env.NODE_ENV === 'development',
          }),
        ],
      };
    },
  }) satisfies Plugin;
