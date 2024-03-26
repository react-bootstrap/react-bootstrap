import deprecated from 'prop-types-extra/lib/deprecated';
import Util from 'util';

// Resolves "Error: Warning: The current testing environment is not configured to support act(...)"
global.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  sinon.stub(console, 'error').callsFake((msg, ...args) => {
    let expected = false;

    // When using the new JSX transform, React uses a different checkPropTypes
    // function that exists within react-jsx-dev-runtime.development.js that
    // sends in a string message with args. In contrast, without the JSX transform,
    // React (react.development.js) uses checkPropTypes from the prop-types package
    // and this formats the string prior to calling console.error.
    // We're going to need to format the string ourselves and check it.
    let formattedStr = msg;
    if (args.length) {
      formattedStr = Util.format(msg, ...args);
    }

    console.error.expected.forEach((about) => {
      if (formattedStr.indexOf(about) !== -1) {
        console.error.warned[about] = true;
        expected = true;
      }
    });

    if (expected) {
      return;
    }

    console.error.threw = true;
    throw new Error(formattedStr);
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

  deprecated._resetWarned();
});

describe('Process environment for tests', () => {
  it('should not be production for React console warnings', () => {
    expect(process.env.NODE_ENV).to.not.equal('production');
  });
});

// Ensure all files in src folder are loaded for proper code coverage analysis.
const srcContext = require.context('../src', true, /.*\.js$/);
srcContext.keys().forEach(srcContext);

const testsContext = require.context('.', true, /Spec$/);
testsContext.keys().forEach(testsContext);
