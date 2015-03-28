/* eslint no-var: 0 */
require('./register-babel');
var config = require('./webpack/webpack.config');
var result = config();
module.exports = result;
