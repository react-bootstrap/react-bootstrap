const { getConfig } = require('./run-babel');

require('babel-register')(getConfig());
