import { expect } from 'chai';
import getInitialPopperStyles from '../src/getInitialPopperStyles';

describe('getInitialPopperStyles', () => {
  it('defaults to absolute positioning when no strategy is provided', () => {
    expect(getInitialPopperStyles()).to.eql({
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
    });
  });

  it('sets the position to the provided strategy', () => {
    expect(getInitialPopperStyles('fixed')).to.eql({
      position: 'fixed',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
    });
  });
});
