import from 'es5-shim';
const testsContext = require.context('.', true, /Spec$/);
testsContext.keys().forEach(testsContext);
