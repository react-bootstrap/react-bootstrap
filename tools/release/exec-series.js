var async = require('async'),
    spawnCommand = require('./spawn-command.js');

module.exports = function execSeries(args, cb, options) {
  async.eachSeries(
    args,
    function(args, callback) {
      console.log(args[0] + ' ' + args[1].join(' '));
      spawnCommand.apply(this, args.concat(options))
          .on('error', function(err) {
            throw err;
          })
          .on('exit', function(code) {
            if (code) {
              throw new Error('Failed executing ' + args);
            } else {
              callback();
            }
          });
    },
    cb);
};