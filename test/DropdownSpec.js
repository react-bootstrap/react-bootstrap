import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Dropdown from '../src/Dropdown';
import Container from '../src/Container';

describe('<Dropdown>', () => {
  const dropdownChildren = [
    <Dropdown.Toggle key="toggle">Child Title</Dropdown.Toggle>,
    <Dropdown.Menu key="menu">
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
      <Dropdown.Item>Item 4</Dropdown.Item>
    </Dropdown.Menu>,
  ];

  const simpleDropdown = <Dropdown id="test-id">{dropdownChildren}</Dropdown>;

  it('renders div with dropdown class', () => {
    mount(simpleDropdown).assertSingle('div.dropdown');
  });

  it('renders div with dropup class', () => {
    mount(simpleDropdown).assertSingle('div.dropdown');

    const node = mount(
      <Dropdown title="Dropup" drop="up" id="test-id">
        {dropdownChildren}
      </Dropdown>,
    ).getDOMNode();

    node.tagName.should.equal('DIV');
    node.className.should.not.match(/\bdropdown\b/);
    node.className.should.match(/\bdropup\b/);
  });

  it('renders toggle with Dropdown.Toggle', () => {
    const buttonNode = mount(simpleDropdown)
      .find('DropdownToggle')
      .assertSingle('button.dropdown-toggle.btn-primary[type="button"]')
      .getDOMNode();

    buttonNode.textContent.should.match(/Child Title/);

    buttonNode.getAttribute('aria-haspopup').should.equal('true');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('forwards alignRight to menu', () => {
    mount(
      <Dropdown alignRight id="test-id">
        {dropdownChildren}
      </Dropdown>,
    ).assertSingle('DropdownMenu[alignRight=true]');
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', () => {
    const wrapper = mount(simpleDropdown);

    wrapper.assertNone('.show');
    wrapper.assertSingle('button[aria-expanded=false]').simulate('click');

    wrapper.assertSingle('.dropdown.show');
    wrapper.assertSingle('.dropdown-menu.show');

    wrapper.assertSingle('button[aria-expanded=true]').simulate('click');

    wrapper.assertNone('.show');

    wrapper.assertSingle('button[aria-expanded=false]');
  });

  it('closes when clicked outside', () => {
    const closeSpy = sinon.spy();
    const wrapper = mount(
      <Dropdown onToggle={closeSpy} id="test-id">
        {dropdownChildren}
      </Dropdown>,
    );

    wrapper.find('button').simulate('click');

    // Use native events as the click doesn't have to be in the React portion
    const event = new MouseEvent('click');
    document.dispatchEvent(event);

    closeSpy.should.have.been.calledTwice;
    closeSpy.lastCall.args[0].should.equal(false);
  });

  it('closes when mousedown outside if rootCloseEvent set', () => {
    const closeSpy = sinon.spy();
    const wrapper = mount(
      <Dropdown onToggle={closeSpy} id="test-id">
        <Dropdown.Toggle>Child Title</Dropdown.Toggle>,
        <Dropdown.Menu rootCloseEvent="mousedown">
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
          <Dropdown.Item>Item 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    wrapper.find('button').simulate('click');

    // Use native events as the click doesn't have to be in the React portion
    const event = new MouseEvent('mousedown');
    document.dispatchEvent(event);

    closeSpy.should.have.been.calledTwice;
    closeSpy.lastCall.args[0].should.equal(false);
  });

  it('opens if dropdown contains no focusable menu item', () => {
    const wrapper = mount(
      <Dropdown title="custom child" id="dropdown">
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <li>Some custom nonfocusable content</li>
        </Dropdown.Menu>
      </Dropdown>,
    );

    wrapper.find('button').simulate('click');
    wrapper.assertSingle('.dropdown.show');
  });

  it('when focused and closed toggles open when the key "down" is pressed', () => {
    const wrapper = mount(simpleDropdown);

    wrapper.find('button').simulate('keyDown', { key: 'ArrowDown' });

    wrapper.assertSingle('.dropdown.show');
  });

  it('does not pass onSelect to DOM node', () => {
    expect(
      mount(simpleDropdown)
        .setProps({ onSelect: () => {} })
        .find('div.dropdown')
        .prop('onSelect'),
    ).to.not.exist;
  });

  it('closes when child Dropdown.Item is selected', () => {
    const onToggle = sinon.spy();

    const wrapper = mount(simpleDropdown).setProps({ show: true, onToggle });

    wrapper.assertSingle('.dropdown.show');

    wrapper
      .find('.dropdown-menu a')
      .first()
      .simulate('click');

    onToggle.should.have.been.calledWith(false);
  });

  it('does not close when onToggle is controlled', () => {
    const handleSelect = sinon.spy();

    const wrapper = mount(
      <Dropdown show onToggle={handleSelect} id="test-id">
        {dropdownChildren}
      </Dropdown>,
    );

    wrapper.find('button').simulate('click');
    wrapper
      .find('.dropdown-menu a')
      .first()
      .simulate('click');

    handleSelect.should.have.been.calledWith(false);
    wrapper
      .find('Dropdown')
      .prop('show')
      .should.equal(true);
  });

  it('has aria-labelledby same id as toggle button', () => {
    const wrapper = mount(simpleDropdown);

    wrapper
      .find('button')
      .getDOMNode()
      .getAttribute('id')
      .should.equal(
        wrapper
          .find('div.dropdown-menu')
          .getDOMNode()
          .getAttribute('aria-labelledby'),
      );
  });

  it('chains refs', () => {
    class RefDropdown extends React.Component {
      render() {
        return (
          <Dropdown
            ref={dropdown => {
              this.dropdown = dropdown;
            }}
            id="test"
          >
            <Dropdown.Toggle ref={toggle => (this.toggle = toggle)} />
            <Dropdown.Menu ref={menu => (this.menu = menu)} />
          </Dropdown>
        );
      }
    }

    let inst = mount(<RefDropdown />).instance();

    inst.menu.should.exist;
    inst.dropdown.menu.should.exist;

    inst.toggle.should.exist;
    inst.dropdown.toggle.should.exist;
  });

  describe('focusable state', () => {
    let focusableContainer;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('when focused and closed sets focus on first menu item when the key "down" is pressed', () => {
      const wrapper = mount(
        <Dropdown title="custom child" id="dropdown">
          <Dropdown.Toggle>Toggle</Dropdown.Toggle>
          <Dropdown.Menu role="menu">
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
        { attachTo: focusableContainer },
      );

      wrapper
        .find('button')
        .getDOMNode()
        .focus();

      wrapper.find('button').simulate('keyDown', { key: 'ArrowDown' });

      document.activeElement.should.equal(
        wrapper
          .find('a')
          .first()
          .getDOMNode(),
      );
    });

    it('when open and the key "Escape" is pressed the menu is closed and focus is returned to the button', () => {
      const wrapper = mount(
        <Dropdown defaultShow role="menu" id="test-id">
          {dropdownChildren}
        </Dropdown>,
        { attachTo: focusableContainer },
      );

      const firstAnchor = wrapper.find('a').first();

      firstAnchor.getDOMNode().focus();
      document.activeElement.should.equal(firstAnchor.getDOMNode());

      firstAnchor.simulate('keyDown', { key: 'Escape' });

      document.activeElement.should.equal(wrapper.find('button').getDOMNode());
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', done => {
      const wrapper = mount(
        <Container>
          <Dropdown defaultShow id="test-id">
            {dropdownChildren}
          </Dropdown>,
          <input type="text" id="next-focusable" />
        </Container>,
        focusableContainer,
      );

      // Need to use Container instead of div above to make instance a composite
      // element, to make this call legal.

      wrapper.find('button').simulate('keyDown', { key: 'Tab' });

      setTimeout(() => {
        wrapper
          .find('button')
          .getDOMNode()
          .getAttribute('aria-expanded')
          .should.equal('false');
        done();
      });

      // simulating a tab event doesn't actually shift focus.
      // at least that seems to be the case according to SO.
      // hence no assert on the input having focus.
    });
  });

  describe('DOM event and source passed to onToggle', () => {
    let focusableContainer;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('passes open, event, and source correctly when opened with click', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown id="test-id" onToggle={spy}>
          {dropdownChildren}
        </Dropdown>,
      );

      expect(spy).to.not.have.been.called;

      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.calledOnce;
      expect(spy.getCall(0).args.length).to.equal(3);
      expect(spy.getCall(0).args[0]).to.equal(true);
      expect(spy.getCall(0).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(0).args[2], { source: 'click' });
    });

    it('passes open, event, and source correctly when closed with click', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown id="test-id" onToggle={spy}>
          {dropdownChildren}
        </Dropdown>,
      );

      expect(spy).to.not.have.been.called;

      wrapper.find('button').simulate('click');
      expect(spy).to.have.been.calledOnce;

      wrapper.find('button').simulate('click');
      expect(spy).to.have.been.calledTwice;
      expect(spy.getCall(1).args.length).to.equal(3);
      expect(spy.getCall(1).args[0]).to.equal(false);
      expect(spy.getCall(1).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(1).args[2], { source: 'click' });
    });

    it('passes open, event, and source correctly when child selected', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown id="test-id" onToggle={spy}>
          <Dropdown.Toggle>Child Title</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1}>Item 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      expect(spy).to.not.have.been.called;
      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.calledOnce;

      wrapper
        .find('a')
        .first()
        .simulate('click');

      expect(spy).to.have.been.calledTwice;
      expect(spy.getCall(1).args.length).to.equal(3);
      expect(spy.getCall(1).args[0]).to.equal(false);
      expect(spy.getCall(1).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(1).args[2], { source: 'select' });
    });

    it('passes open, event, and source correctly when opened with keydown', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <Dropdown id="test-id" onToggle={spy}>
          {dropdownChildren}
        </Dropdown>,
      );

      wrapper.find('button').simulate('keyDown', { key: 'ArrowDown' });

      expect(spy).to.have.been.calledOnce;
      expect(spy.getCall(0).args.length).to.equal(3);
      expect(spy.getCall(0).args[0]).to.equal(true);
      expect(spy.getCall(0).args[1]).to.be.an('object');
      assert.deepEqual(spy.getCall(0).args[2], { source: 'keydown' });
    });
  });

  it('should use each components bsPrefix', () => {
    const wrapper = mount(
      <Dropdown bsPrefix="my-dropdown" id="test-id">
        <Dropdown.Toggle bsPrefix="my-toggle">Child Title</Dropdown.Toggle>
        <Dropdown.Menu bsPrefix="my-menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    wrapper.assertSingle('div.my-dropdown');
    wrapper.assertSingle('button.my-toggle');
    wrapper.assertSingle('div.my-menu');
  });
});
