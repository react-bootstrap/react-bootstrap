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
      sinon.spy(Position.prototype, 'render');
    });

    afterEach(function () {
      overlayPositionUtils.calcOverlayPosition.restore();
      Position.prototype.render.restore();
    });

    it('should recalculate when target changes', function () {
      class TargetChanger extends React.Component {
        constructor(props) {
          super(props);

          this.state = {target: 'foo'};
        }

        render() {
          return (
            <div>
              {this.renderTarget()}

              <Position target={() => this.refs[this.state.target]}>
                <div />
              </Position>
            </div>
          );
        }

        renderTarget() {
          if (this.state.target === 'foo') {
            return (<div ref="foo" style={{width: 100}} />);
          } else if (this.state.target === 'bar') {
            return (<div ref="bar" style={{width: 200}} />);
          }
        }
      }

      const instance = ReactTestUtils.renderIntoDocument(<TargetChanger />);

      expect(overlayPositionUtils.calcOverlayPosition).to.have.been.calledOnce;

      instance.setState({target: 'bar'});

      expect(overlayPositionUtils.calcOverlayPosition)
        .to.have.been.calledTwice;
    });

    it('should not recalculate when target doesn\'t change', function () {
      class FooChanger extends React.Component {
        constructor(props) {
          super(props);

          this.getTarget = this.getTarget.bind(this);

          this.state = {foo: 0};
        }

        getTarget() {
          return this.refs.target;
        }

        render() {
          return (
            <div>
              <div ref="target" style={{width: 100}} />

              <Position target={this.getTarget} foo={this.state.foo}>
                <div target="positioned" />
              </Position>
            </div>
          );
        }
      }

      const instance = ReactTestUtils.renderIntoDocument(<FooChanger />);

      expect(overlayPositionUtils.calcOverlayPosition).to.have.been.calledOnce;
      expect(Position.prototype.render).to.have.been.calledTwice;

      instance.setState({foo: 1});

      expect(overlayPositionUtils.calcOverlayPosition).to.have.been.calledOnce;
      expect(Position.prototype.render).to.have.been.calledThrice;
    });
  });

  // ToDo: add remaining tests
});
