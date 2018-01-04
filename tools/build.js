require('colors');
const fse = require('fs-extra');

const bower = require('./build-bower');
const lib = require('./build-lib');
const es = require('./build-es');
const dist = require('./build-dist');
const { distRoot, bowerRoot } = require('./constants');

const targets = process.argv.slice(2);
const has = t => !targets.length || targets.includes(t);

console.log(
  `Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`.green
);

Promise.all([
  has('lib') && lib(),
  has('es') && es(),
  has('bower') && bower(),
  (has('dist') || has('bower')) && dist()
])
  .then(() => (has('dist') || has('bower')) && fse.copy(distRoot, bowerRoot))
  .catch(err => {
    if (err.stack) {
      console.error(err.stack.red);
    } else {
      console.error(err.toString().red);
    }
    process.exit(1);
  });
