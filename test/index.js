import deprecated from 'react-prop-types/lib/deprecated';

import { _resetWarned } from '../src/utils/deprecationWarning';

beforeEach(() => {
  sinon.stub(console, 'error', msg => {
    let expected = false;

    console.error.expected.forEach(about => {
      if (msg.indexOf(about) !== -1) {
        console.error.warned[about] = true;
        expected = true;
      }
    });

    if (expected) {
      return;
    }

    console.error.threw = true;
    throw new Error(msg);
  });

  console.error.expected = [];
  console.error.warned = Object.create(null);
  console.error.threw = false;
});

afterEach(() => {
  if (!console.error.threw && console.error.expected.length) {
    expect(console.error.warned).to.have.keys(console.error.expected);
  }

  console.error.restore();
  _resetWarned();
  deprecated._resetWarned && deprecated._resetWarned();
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
