import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Position from '../src/Position';
import overlayPositionUtils from '../src/utils/overlayPositionUtils';

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

  // ToDo: add remaining tests
});
