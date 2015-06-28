import position from '../../src/utils/overlayPositionUtils';

describe('calcOverlayPosition()', function() {
    [
      {
        placement: 'left',
        noOffset: [50, 300, null, '50%'],
        offsetBefore: [-200, 150, null, '0%'],
        offsetAfter: [300, 450, null, '100%']
      },
      {
        placement: 'top',
        noOffset: [200, 150, '50%', null],
        offsetBefore: [50, -100, '0%', null],
        offsetAfter: [350, 400, '100%', null]
      },
      {
        placement: 'bottom',
        noOffset: [200, 450, '50%', null],
        offsetBefore: [50, 200, '0%', null],
        offsetAfter: [350, 700, '100%', null]
      },
      {
        placement: 'right',
        noOffset: [350, 300, null, '50%'],
        offsetBefore: [100, 150, null, '0%'],
        offsetAfter: [600, 450, null, '100%']
      }
    ].forEach(function(testCase) {

      describe(`placement = ${testCase.placement}`, function() {
        let overlayStub, padding, placement;

        beforeEach(function() {
          placement = testCase.placement;
          padding = 50;
          overlayStub = {
            offsetHeight: 200, offsetWidth: 200
          };

          position.getContainerDimensions = sinon.stub().returns({
            width: 600, height: 600, scroll: 100
          });
        });

        function checkPosition(expected) {
          const [
            positionLeft,
            positionTop,
            arrowOffsetLeft,
            arrowOffsetTop
          ] = expected;

          it('Should calculate the correct position', function() {
            position.calcOverlayPosition(placement, overlayStub, {}, {}, padding).should.eql(
              { positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop }
            );
          });
        }

        describe('no viewport offset', function() {
          beforeEach(function() {
            position.getPosition = sinon.stub().returns({
              left: 250, top: 350, width: 100, height: 100
            });
          });

          checkPosition(testCase.noOffset);
        });

        describe('viewport offset before', function() {
          beforeEach(function() {
            position.getPosition = sinon.stub().returns({
              left: 0, top: 100, width: 100, height: 100
            });
          });

          checkPosition(testCase.offsetBefore);
        });

        describe('viewport offset after', function() {
          beforeEach(function() {
            position.getPosition = sinon.stub().returns({
              left: 500, top: 600, width: 100, height: 100
            });
          });

          checkPosition(testCase.offsetAfter);
        });
      });
    });
  });
