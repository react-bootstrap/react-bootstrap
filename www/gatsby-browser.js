require('./src/css/global.scss');
require('@docsearch/css/dist/style.css');

// prevent FontAwesome icons' flash from a very large one down to a properly sized one
require('@fortawesome/fontawesome-svg-core/styles.css');
// Prevent fontawesome from adding its CSS since we did it manually above
const { config } = require('@fortawesome/fontawesome-svg-core');

config.autoAddCss = false;

exports.wrapPageElement = require(`./src/wrap-page`);
