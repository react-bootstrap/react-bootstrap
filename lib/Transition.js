'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _reactOverlaysLibTransition = require('react-overlays/lib/Transition');

var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(_reactOverlaysLibTransition2['default'], {
  message: 'The Transition component is deprecated in react-bootstrap. It has been moved to a more generic library: react-overlays. ' + 'You can read more at: ' + 'http://react-bootstrap.github.io/react-overlays/examples/#transition and ' + 'https://github.com/react-bootstrap/react-bootstrap/issues/1084'
});
module.exports = exports['default'];