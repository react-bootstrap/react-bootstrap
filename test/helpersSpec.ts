import { describe, expect, it } from 'vitest';
import { getOverlayDirection } from '../src/helpers';

describe('Helpers', () => {
  describe('getOverlayDirection', () => {
    it('should return start for left', () => {
      expect(getOverlayDirection('left', false)).toEqual('start');
    });

    it('should return end for left in RTL', () => {
      expect(getOverlayDirection('left', true)).toEqual('end');
    });

    it('should return end for right', () => {
      expect(getOverlayDirection('right', false)).toEqual('end');
    });

    it('should return start for right in RTL', () => {
      expect(getOverlayDirection('right', true)).toEqual('start');
    });
  });
});
