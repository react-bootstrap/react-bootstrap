import { getOverlayDirection } from '../src/helpers';

describe('Helpers', () => {
  describe('getOverlayDirection', () => {
    it('should return start for left', () => {
      getOverlayDirection('left', false).should.equal('start');
    });

    it('should return end for left in RTL', () => {
      getOverlayDirection('left', true).should.equal('end');
    });

    it('should return end for right', () => {
      getOverlayDirection('right', false).should.equal('end');
    });

    it('should return start for right in RTL', () => {
      getOverlayDirection('right', true).should.equal('start');
    });
  });
});
