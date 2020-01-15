import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import OverlayTrigger from '../src/OverlayTrigger';
import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';

describe('<OverlayTrigger>', () => {
  // Swallow extra props.
  const Div = React.forwardRef(({ className, children }, ref) => (
    <div ref={ref} className={className} role="tooltip" id="test-tooltip">
      {children}
    </div>
  ));

  it('Should render OverlayTrigger element', () => {
    mount(
      <OverlayTrigger overlay={<Div>test</Div>}>
        <button type="button">button</button>
      </OverlayTrigger>,
    ).assertSingle('button');
  });

  it('Should accept a function as an overlay render prop', () => {
    const overlay = () => <Div className="test" />;
    const wrapper = mount(
      <OverlayTrigger trigger="click" overlay={overlay}>
        <button type="button">button</button>
      </OverlayTrigger>,
    );

    wrapper.assertNone('.test');

    wrapper.find('button').simulate('click');

    wrapper.assertSingle('div.test');
  });

  it('Should call OverlayTrigger onClick prop to child', () => {
    const callback = sinon.spy();

    mount(
      <OverlayTrigger overlay={<Div>test</Div>} trigger="click">
        <button type="button" onClick={callback}>
          button
        </button>
      </OverlayTrigger>,
    )
      .find('button')
      .simulate('click');

    callback.should.have.been.called;
  });

  it('Should show after click trigger', () => {
    const wrapper = mount(
      <OverlayTrigger trigger="click" overlay={<Div className="test" />}>
        <button type="button">button</button>
      </OverlayTrigger>,
    );

    wrapper.assertNone('.test');

    wrapper.find('button').simulate('click');

    wrapper.assertSingle('div.test');
  });

  it('Should not set aria-describedby if the state is not show', () => {
    const [button] = mount(
      <OverlayTrigger trigger="click" overlay={<Div />}>
        <button type="button">button</button>
      </OverlayTrigger>,
    ).getDOMNode();

    assert.equal(button.getAttribute('aria-describedby'), null);
  });

  it('Should set aria-describedby for tooltips if the state is show', done => {
    const wrapper = mount(
      <OverlayTrigger trigger="click" overlay={<Div />}>
        <button type="button">button</button>
      </OverlayTrigger>,
    );

    wrapper.find('button').simulate('click');

    setTimeout(() => {
      wrapper
        .find('button')
        .getDOMNode()
        .matches('[aria-describedby="test-tooltip"]')
        .should.equal(true);
      done();
    });
  });

  describe('trigger handlers', () => {
    let mountPoint;

    beforeEach(() => {
      mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(mountPoint);
      document.body.removeChild(mountPoint);
    });

    it('Should keep trigger handlers', done => {
      mount(
        <div>
          <OverlayTrigger trigger="click" overlay={<Div>test</Div>}>
            <button type="button" onClick={() => done()}>
              button
            </button>
          </OverlayTrigger>
          <input id="target" />
        </div>,
      )
        .find('button')
        .simulate('click');
    });
  });

  it('Should maintain overlay classname', () => {
    const wrapper = mount(
      <OverlayTrigger
        trigger="click"
        overlay={<Div className="test-overlay">test</Div>}
      >
        <button type="button">button</button>
      </OverlayTrigger>,
    );
    wrapper.find('button').simulate('click');

    wrapper.assertSingle('div.test-overlay');
  });

  it('Should pass transition callbacks to Transition', done => {
    const increment = sinon.spy();

    const wrapper = mount(
      <OverlayTrigger
        trigger="click"
        overlay={<Div>test</Div>}
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(increment.callCount).to.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          wrapper.find('button').simulate('click');
        }}
      >
        <button type="button">button</button>
      </OverlayTrigger>,
    );

    wrapper.find('button').simulate('click');
  });

  it('Should forward requested context', () => {
    const contextTypes = {
      key: PropTypes.string,
    };

    const contextSpy = sinon.spy();

    class ContextReader extends React.Component {
      static contextTypes = contextTypes;

      render() {
        contextSpy(this.context.key);
        return <div />;
      }
    }

    class ContextHolder extends React.Component {
      static childContextTypes = contextTypes;

      getChildContext() {
        return { key: 'value' };
      }

      render() {
        return (
          <OverlayTrigger trigger="click" overlay={<ContextReader />}>
            <button type="button">button</button>
          </OverlayTrigger>
        );
      }
    }

    mount(<ContextHolder />)
      .find('button')
      .simulate('click');

    contextSpy.calledWith('value').should.be.true;
  });

  describe('overlay types', () => {
    [
      {
        name: 'Popover',
        overlay: <Popover id="test-popover">test</Popover>,
      },
      {
        name: 'Tooltip',
        overlay: <Tooltip id="test-tooltip">test</Tooltip>,
      },
    ].forEach(testCase => {
      describe(testCase.name, () => {
        it('Should handle trigger without warnings', () => {
          mount(
            <OverlayTrigger trigger="click" overlay={testCase.overlay}>
              <button type="button">button</button>
            </OverlayTrigger>,
          )
            .find('button')
            .simulate('click');
        });
      });
    });
  });

  describe('rootClose', () => {
    [
      {
        label: 'true',
        rootClose: true,
        shownAfterClick: false,
      },
      {
        label: 'default (false)',
        rootClose: null,
        shownAfterClick: true,
      },
    ].forEach(testCase => {
      describe(testCase.label, () => {
        it('Should have correct show state', () => {
          const wrapper = mount(
            <OverlayTrigger
              overlay={<Div>test</Div>}
              trigger="click"
              rootClose={testCase.rootClose}
            >
              <button type="button">button</button>
            </OverlayTrigger>,
          );
          wrapper.find('button').simulate('click');

          expect(wrapper.state('show')).to.equal(true);

          // Need to click this way for it to propagate to document element.
          document.documentElement.click();

          expect(wrapper.state('show')).to.equal(testCase.shownAfterClick);
        });
      });
    });

    describe('clicking on trigger to hide', () => {
      it('should hide after clicking on trigger', () => {
        const attachTo = document.createElement('div');
        document.body.appendChild(attachTo);

        const wrapper = mount(
          <OverlayTrigger overlay={<Div>test</Div>} trigger="click" rootClose>
            <button type="button">button</button>
          </OverlayTrigger>,
          { attachTo },
        );

        const [node] = wrapper.getDOMNode();
        expect(wrapper.state('show')).to.be.false;

        node.click();
        expect(wrapper.state('show')).to.be.true;

        // Need to click this way for it to propagate to document element.
        node.click();
        expect(wrapper.state('show')).to.be.false;

        wrapper.unmount();
      });
    });

    describe('replaced overlay', () => {
      it('Should still be shown', () => {
        class ReplacedOverlay extends React.Component {
          state = {
            replaced: false,
          };

          handleClick = () => {
            this.setState({ replaced: true });
          };

          render() {
            if (this.state.replaced) {
              return <div>replaced</div>;
            }

            return (
              <div>
                <a id="replace-overlay" onClick={this.handleClick}>
                  original
                </a>
              </div>
            );
          }
        }

        const wrapper = mount(
          <OverlayTrigger
            overlay={<ReplacedOverlay />}
            trigger="click"
            rootClose
          >
            <button type="button">button</button>
          </OverlayTrigger>,
        );

        wrapper.find('button').simulate('click');

        // Need to click this way for it to propagate to document element.
        document.getElementById('replace-overlay').click();

        wrapper.state('show').should.be.true;
      });
    });
  });
});
