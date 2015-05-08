import config from './webpack.config';
import yargs from 'yargs';

const argv = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export default config({
  docs: true,
  development: argv.debug,
  optimize: argv.optimizeMinimize,
  port: parseInt(argv.port)
});
