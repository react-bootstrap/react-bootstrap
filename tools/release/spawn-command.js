var spawn = require('child_process').spawn;
var win32 = process.platform === 'win32';

// Normalize a command across OS and spawn it
//
// - command    - A String containing a command to run
// - arguments  - An Array of arguments to pass the command
//
// Returns ChildProcess object (of the spawned command)
module.exports = function spawnCommand(command, args, options) {
  var winCommand = win32 ? 'cmd' : command;
  var winArgs = win32 ? ['/c ' + command + ' ' + args.join(' ')] : args;

  options = options || {};
  options.stdio = 'inherit';

  return spawn(winCommand, winArgs, options);
};