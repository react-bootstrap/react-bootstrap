import baseConfig, { options } from './base.config';
import path from 'path';

export default {
  ...baseConfig,

  entry: {
    'react-bootstrap': path.resolve('./src/index.js'),
  },

  output: {
    path: path.resolve('dist'),
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'ReactBootstrap',
    libraryTarget: 'umd',
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
};
