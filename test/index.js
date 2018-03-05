import deprecated from 'prop-types-extra/lib/deprecated';

import { _resetWarned } from '../src/utils/deprecationWarning';

import Enzyme, { ShallowWrapper, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function assertLength(length) {
  return function $assertLength(selector) {
    let result = this.find(selector);
    expect(result).to.have.length(length);
    return result;
  };
}

ReactWrapper.prototype.assertSingle = assertLength(1);
ShallowWrapper.prototype.assertSingle = assertLength(1);

ReactWrapper.prototype.assertNone = assertLength(0);
ShallowWrapper.prototype.assertNone = assertLength(0);

beforeEach(() => {
  /* eslint-disable no-console */
  sinon.stub(console, 'error').callsFake(msg => {
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
  /* eslint-enable no-console */
});

afterEach(() => {
  /* eslint-disable no-console */
  if (!console.error.threw && console.error.expected.length) {
    expect(console.error.warned).to.have.keys(console.error.expected);
  }

  console.error.restore();
  /* eslint-enable no-console */

  _resetWarned();
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
