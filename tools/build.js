require('colors');
const fse = require('fs-extra');

const bower = require('./build-bower');
const lib = require('./build-lib');
const es = require('./build-es');
const dist = require('./build-dist');
const { distRoot, bowerRoot } = require('./constants');


Promise.all([
  lib(),
  es(),
  bower(),
  dist(),
])
  .then(() => fse.copy(distRoot, bowerRoot))
  .catch((err) => {
    if (err.stack) {
      console.error(err.stack.red);
    } else {
      console.error(err.toString().red);
    }
    process.exit(1);
  });
