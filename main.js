var path = require('path');
var LIB = 'cjs';

require('fs').readdirSync(path.join(__dirname, LIB)).forEach(function (file) {
  var name;

  if (file.match(/.+\.js/g)) {
    name = file.replace('.js', '');
    exports[name] = require(path('.', LIB, file));
  }
});