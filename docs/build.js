'use strict';

var fs = require('fs');
var path = require('path');
var nodejsx = require('node-jsx').install();
var Root = require('./src/Root');

Root.getPages()
  .forEach(function (fileName) {
    var RootHTML = Root.renderToString({initialPath: fileName});

    fs.writeFileSync(path.join(__dirname, fileName), RootHTML);
  });