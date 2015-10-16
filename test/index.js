import 'es5-shim';

beforeEach(() => {
  sinon.stub(console, 'error');
});

afterEach(function checkNoUnexpectedWarnings() {
  if (typeof console.error.restore === 'function') {
    assert(!console.error.called, () => {
      return `${console.error.getCall(0).args[0]} \nIn '${this.currentTest.fullTitle()}'`;
    });
    console.error.restore();
  }
});

describe('Process environment for tests', () => {
  it('Should be development for React console warnings', () => {
    assert.equal(process.env.NODE_ENV, 'development');
  });
});

// Ensure all files in src folder are loaded for proper code coverage analysis
const srcContext = require.context('../src', true, /.*\.js$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('.', true, /Spec$/);
testsContext.keys().forEach(testsContext);
