import 'es5-shim';

import { _resetWarned } from '../src/utils/deprecationWarning';

beforeEach(() => {
  sinon.stub(console, 'error', msg => {
    const nextExpected = console.error.expected.shift();
    if (nextExpected) {
      if (nextExpected instanceof RegExp) {
        expect(msg).to.match(nextExpected);
      } else {
        expect(msg).to.contain(nextExpected);
      }

      return;
    }

    throw new Error(msg);
  });

  console.error.expected = [];
});

afterEach(() => {
  expect(console.error.expected).to.be.empty;

  console.error.restore();
  _resetWarned();
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
