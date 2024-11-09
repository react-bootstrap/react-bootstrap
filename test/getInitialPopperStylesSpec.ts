import { describe, expect, it } from 'vitest';
import getInitialPopperStyles from '../src/getInitialPopperStyles';

describe('getInitialPopperStyles', () => {
  it('defaults to absolute positioning when no strategy is provided', () => {
    expect(getInitialPopperStyles()).toEqual({
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
    });
  });

  it('sets the position to the provided strategy', () => {
    expect(getInitialPopperStyles('fixed')).toEqual({
      position: 'fixed',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
    });
  });
});
