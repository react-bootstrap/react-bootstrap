import path from 'node:path';
import webpack from 'webpack';
import getConfig from './dist.webpack.config.js';

const __dirname = import.meta.dirname;
const distRoot = path.join(__dirname, '../dist');

webpack(
  [getConfig(distRoot, false), getConfig(distRoot, true)],
  async (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    if (stats?.hasErrors()) {
      console.error(stats.toJson().errors);
      process.exit(1);
    }

    process.exit(0);
  },
);
