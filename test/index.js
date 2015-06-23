import 'es5-shim';

beforeEach(function() {
  sinon.stub(console, 'warn');
});

afterEach(function() {
  if (typeof console.warn.restore === 'function') {
    assert(!console.warn.called, () => {
      return `${console.warn.getCall(0).args[0]} \nIn '${this.currentTest.fullTitle()}'`;
    });
    console.warn.restore();
  }
});

describe('Process environment for tests', function () {
  it('Should be development for React console warnings', function () {
    assert.equal(process.env.NODE_ENV, 'development');
  });
});

// Ensure all files in src folder are loaded for proper code coverage analysis
const srcContext = require.context('../src', true, /.*\.js$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('.', true, /Spec$/);
testsContext.keys().forEach(testsContext);
