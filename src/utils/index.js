import deprecationWarning from './deprecationWarning';

export childrenValueInputValidation from './childrenValueInputValidation';
export createChainedFunction from './createChainedFunction';

deprecationWarning('utils/domUtils', 'npm install dom-helpers');
export domUtils from './domUtils';

export ValidComponentChildren from './ValidComponentChildren';

deprecationWarning('utils/CustomPropTypes', 'npm install react-prop-types',
  'https://github.com/react-bootstrap/react-bootstrap/issues/937');
export CustomPropTypes from './CustomPropTypes';
