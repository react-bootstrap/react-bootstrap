import _ from 'lodash';
import path from 'path';
import { jsLoader } from './base.config';
import testConfig from './test.config';

const paths = {
  SRC: path.resolve('src'),
  TEST: path.resolve('test')
};

export default _.extend({}, testConfig, {
  module: {
    loaders: [
      {
        test: /\.js/,
        include: [paths.SRC, paths.TEST],
        loader: jsLoader,
        exclude: /node_modules/
      }
    ],
    preLoaders: [
      {
        test: /\.js/,
        loader: 'isparta',
        include: paths.SRC,
        exclude: /node_modules/
      }
    ]
  }
});
