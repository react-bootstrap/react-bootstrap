import * as React from 'react';
import { mount } from 'enzyme';

import Collapse from '../src/Collapse';

describe('<Collapse>', () => {
  let Component, wrapper;

  beforeEach(() => {
    Component = class extends React.Component {
      render() {
        let { children, ...props } = this.props;

        return (
          <Collapse
            ref={(r) => (this.collapse = r)}
            getDimensionValue={() => 15}
            {...props}
            {...this.state}
          >
            <div>
              <div>{children}</div>
            </div>
          </Collapse>
        );
      }
    };
  });

  it('should not throw an error with StrictMode', () => {
    wrapper = mount(
      <React.StrictMode>
        <Component>Panel content</Component>
      </React.StrictMode>,
    );

    wrapper.setState({ in: true });
  });

  it('should work with a class component as children', (done) => {
    const InnerComponent = class extends React.Component {
      render() {
        return <div {...this.props}>test</div>;
      }
    };

    function onEntering() {
      assert.equal(wrapper.getDOMNode().className, 'collapsing');
      done();
    }

    wrapper = mount(
      <Collapse onEntering={onEntering}>
        <InnerComponent />
      </Collapse>,
    );

    wrapper.setProps({ in: true });
  });

  it('Should default to collapsed', () => {
    wrapper = mount(<Component>Panel content</Component>);

    assert.ok(wrapper.find(Collapse).props().in === false);
  });

  it('Should have collapse class', () => {
    mount(<Component>Panel content</Component>).assertSingle('.collapse');
  });

  describe('from collapsed to expanded', () => {
    beforeEach(() => {
      wrapper = mount(<Component>Panel content</Component>);
    });

    it('Should have collapsing class', () => {
      wrapper.setState({ in: true });

      assert.equal(wrapper.getDOMNode().className, 'collapsing');
    });

    it('Should set initial 0px height', (done) => {
      let node = wrapper.getDOMNode();

      function onEnter() {
        assert.equal(node.style.height, '0px');
        done();
      }

      assert.equal(node.style.height, '');

      wrapper.setState({ in: true, onEnter });
    });

    it('Should set node to height', () => {
      let node = wrapper.getDOMNode();

      assert.equal(node.style.height, '');
      wrapper.setState({ in: true });
      assert.equal(node.style.height, `${node.scrollHeight}px`);
    });

    it('Should transition from collapsing to not collapsing', (done) => {
      let node = wrapper.getDOMNode();

      function onEntered() {
        assert.equal(node.className, 'collapse show');
        done();
      }

      wrapper.setState({ in: true, onEntered });

      assert.equal(node.className, 'collapsing');
    });

    it('Should clear height after transition complete', (done) => {
      let node = wrapper.getDOMNode();

      function onEntered() {
        assert.equal(node.style.height, '');
        done();
      }

      assert.equal(node.style.height, '');

      wrapper.setState({ in: true, onEntered });
      assert.equal(node.style.height, `${node.scrollHeight}px`);
    });
  });

  describe('from expanded to collapsed', () => {
    beforeEach(() => {
      wrapper = mount(<Component in>Panel content</Component>);
    });

    it('Should have collapsing class', () => {
      wrapper.setState({ in: false });
      let node = wrapper.getDOMNode();
      assert.equal(node.className, 'collapsing');
    });

    it('Should set initial height', () => {
      let node = wrapper.getDOMNode();

      function onExit() {
        assert.equal(node.style.height, '15px');
      }

      assert.equal(node.style.height, '');
      wrapper.setState({ in: false, onExit });
    });

    it('Should set node to height', () => {
      let node = wrapper.getDOMNode();
      assert.equal(node.style.height, '');

      wrapper.setState({ in: false });
      assert.equal(node.style.height, '');
    });

    it('Should transition from collapsing to not collapsing', (done) => {
      let node = wrapper.getDOMNode();

      function onExited() {
        assert.equal(node.className, 'collapse');
        done();
      }

      wrapper.setState({ in: false, onExited });

      assert.equal(node.className, 'collapsing');
    });

    it('Should have no height after transition complete', (done) => {
      let node = wrapper.getDOMNode();

      function onExited() {
        assert.equal(node.style.height, '');
        done();
      }

      assert.equal(node.style.height, '');

      wrapper.setState({ in: false, onExited });
    });
  });

  describe('expanded', () => {
    it('Should have collapse and in class', () => {
      mount(<Component in>Panel content</Component>).assertSingle(
        '.collapse.show',
      );
    });
  });

  describe('dimension', () => {
    beforeEach(() => {
      wrapper = mount(<Component>Panel content</Component>);
    });

    it('Should not have width in class', () => {
      let node = wrapper.getDOMNode();
      assert.ok(node.className.indexOf('width') === -1);
    });

    it('Should have width in class', () => {
      function dimension() {
        return 'width';
      }

      wrapper.setProps({ dimension });
      let node = wrapper.getDOMNode();
      assert.ok(node.className.indexOf('width') !== -1);
    });
  });

  describe('with a role', () => {
    beforeEach(() => {
      wrapper = mount(<Component role="note">Panel content</Component>);
    });

    it('sets aria-expanded true when expanded', () => {
      let node = wrapper.getDOMNode();
      wrapper.setState({ in: true });
      assert.equal(node.getAttribute('aria-expanded'), 'true');
    });

    it('sets aria-expanded false when collapsed', () => {
      let node = wrapper.getDOMNode();
      wrapper.setState({ in: false });
      assert.equal(node.getAttribute('aria-expanded'), 'false');
    });
  });
});
