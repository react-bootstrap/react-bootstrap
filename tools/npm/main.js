var path = require('path');

require('fs').readdirSync('.').forEach(function (file) {
  var name;

  if (file.match(/.+\.js/g) && !file.match(/^main\.js/g)) {
    name = file.replace('.js', '');
    exports[name] = require(path.join('.', file));
  }
});