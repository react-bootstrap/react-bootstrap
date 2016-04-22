import deprecationWarning from '../../src/utils/deprecationWarning';

import { shouldWarn } from '../helpers';

describe('deprecationWarning', () => {
  it('warns exactly once', () => {
    // console.error has already been stubbed out by test setup.
    shouldWarn('deprecated');
    deprecationWarning('foo', 'bar');

    // No second warning.
    deprecationWarning('foo', 'bar');
  });
});
