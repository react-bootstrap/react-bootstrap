import pick from 'lodash/object/pick';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Position from '../src/Position';
import overlayPositionUtils from '../src/utils/overlayPositionUtils';

import {render} from './helpers';

describe('Position', function () {
  it('Should output a child', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Position>
        <span>Text</span>
      </Position>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'SPAN');
  });

  it('Should warn about several children', function () {
    expect(() => {
      ReactTestUtils.renderIntoDocument(
        <Position>
          <span>Text</span>
          <span>Another Text</span>
        </Position>
      );
    }).to.throw(Error, /onlyChild must be passed a children with exactly one child/);
  });

  describe('position recalculation', function () {
    beforeEach(function () {
      sinon.spy(overlayPositionUtils, 'calcOverlayPosition');
      sinon.spy(Position.prototype, 'componentWillReceiveProps');
    });

    afterEach(function () {
      overlayPositionUtils.calcOverlayPosition.restore();
      Position.prototype.componentWillReceiveProps.restore();
    });

    it('Should only recalculate when target changes', function () {
      class TargetChanger extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            target: 'foo',
            fakeProp: 0
          };
        }

        render() {
          return (
            <div>
              <div ref="foo" />
              <div ref="bar" />

              <Position
                target={() => this.refs[this.state.target]}
                fakeProp={this.state.fakeProp}
              >
                <div />
              </Position>
            </div>
          );
        }
      }

      const instance = ReactTestUtils.renderIntoDocument(<TargetChanger />);

      // Position calculates initial position.
      expect(Position.prototype.componentWillReceiveProps)
        .to.have.not.been.called;
      expect(overlayPositionUtils.calcOverlayPosition)
        .to.have.been.calledOnce;

      instance.setState({target: 'bar'});

      // Position receives new props and recalculates position.
      expect(Position.prototype.componentWillReceiveProps)
        .to.have.been.calledOnce;
      expect(overlayPositionUtils.calcOverlayPosition)
        .to.have.been.calledTwice;

      instance.setState({fakeProp: 1});

      // Position receives new props but should not recalculate position.
      expect(Position.prototype.componentWillReceiveProps)
        .to.have.been.calledTwice;
      expect(overlayPositionUtils.calcOverlayPosition)
        .to.have.been.calledTwice;
    });
  });

  describe('position calculation', function () {
    let mountPoint;

    beforeEach(function () {
      mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
    });

    afterEach(function () {
      React.unmountComponentAtNode(mountPoint);
      document.body.removeChild(mountPoint);
    });

    function checkPosition(placement, targetPosition, expected) {
      class FakeOverlay extends React.Component {
        render() {
          return (
            <div style={{
              position: 'absolute',
              width: 200,
              height: 200
            }} />
          );
        }
      }

      class FakeContainer extends React.Component {
        render() {
          return (
            <div style={{
              position: 'relative',
              width: 600,
              height: 600
            }}>
              <div ref="target" style={{
                position: 'absolute',
                width: 100,
                height: 100,
                ...targetPosition
              }}/>

              <Position
                target={() => React.findDOMNode(this.refs.target)}
                container={this}
                containerPadding={50}
                placement={placement}
              >
                <FakeOverlay ref="overlay" />
              </Position>
            </div>
          );
        }
      }

      const expectedPosition = {
        positionLeft: expected[0],
        positionTop: expected[1],
        arrowOffsetLeft: expected[2],
        arrowOffsetTop: expected[3]
      };

      it('Should calculate the correct position', function() {
        const instance = render(<FakeContainer />, mountPoint);

        const calculatedPosition = pick(
          instance.refs.overlay.props, Object.keys(expectedPosition)
        );
        expect(calculatedPosition).to.eql(expectedPosition);
      });
    }

    [
      {
        placement: 'left',
        noOffset: [50, 200, null, '50%'],
        offsetBefore: [-200, 50, null, '0%'],
        offsetAfter: [300, 350, null, '100%']
      },
      {
        placement: 'top',
        noOffset: [200, 50, '50%', null],
        offsetBefore: [50, -200, '0%', null],
        offsetAfter: [350, 300, '100%', null]
      },
      {
        placement: 'bottom',
        noOffset: [200, 350, '50%', null],
        offsetBefore: [50, 100, '0%', null],
        offsetAfter: [350, 600, '100%', null]
      },
      {
        placement: 'right',
        noOffset: [350, 200, null, '50%'],
        offsetBefore: [100, 50, null, '0%'],
        offsetAfter: [600, 350, null, '100%']
      }
    ].forEach(function(testCase) {
      const placement = testCase.placement;

      describe(`placement = ${placement}`, function() {
        describe('no viewport offset', function() {
          checkPosition(
            placement, {left: 250, top: 250}, testCase.noOffset
          );
        });

        describe('viewport offset before', function() {
          checkPosition(
            placement, {left: 0, top: 0}, testCase.offsetBefore
          );
        });

        describe('viewport offset after', function() {
          checkPosition(
            placement, {left: 500, top: 500}, testCase.offsetAfter
          );
        });
      });
    });
  });

  // ToDo: add remaining tests
});
