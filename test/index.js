import from 'es5-shim';

describe('Process environment for tests', function () {
  it('Should be development for React console warnings', function () {
    assert.equal(process.env.NODE_ENV, 'development');
  });
});

const testsContext = require.context('.', true, /Spec$/);
testsContext.keys().forEach(testsContext);
