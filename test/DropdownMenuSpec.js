import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownMenu from '../src/DropdownMenu';
import MenuItem from '../src/MenuItem';
import keycode from 'keycode';

describe('DropdownMenu', () => {
  const simpleMenu = (
    <DropdownMenu>
      <MenuItem eventKey='1'>Item 1</MenuItem>
      <MenuItem eventKey='2'>Item 2</MenuItem>
      <MenuItem eventKey='3'>Item 3</MenuItem>
      <MenuItem eventKey='4'>Item 4</MenuItem>
    </DropdownMenu>
  );

  it('renders ul with dropdown-menu class', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleMenu);
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('UL');
    node.className.should.match(/\bdropdown-menu\b/);
  });

  it('has role="menu"', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleMenu);
    const node = React.findDOMNode(instance);

    node.getAttribute('role').should.equal('menu');
  });

  it('has aria-labelledby=<id>', () => {
    const instance1 = ReactTestUtils.renderIntoDocument(<DropdownMenu labelledBy='herpa' />);
    const instance2 = ReactTestUtils.renderIntoDocument(<DropdownMenu labelledBy='derpa' />);
    const node1 = React.findDOMNode(instance1);
    const node2 = React.findDOMNode(instance2);

    node1.getAttribute('aria-labelledby').should.equal('herpa');
    node2.getAttribute('aria-labelledby').should.equal('derpa');
  });

  it('forwards onSelect handler to MenuItems', (done) => {
    const selectedEvents = [];
    const onSelect = (event, eventKey) => {
      selectedEvents.push(eventKey);

      if (selectedEvents.length === 4) {
        selectedEvents.should.eql(['1', '2', '3', '4']);
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu onSelect={onSelect}>
        <MenuItem eventKey='1'>Item 1</MenuItem>
        <MenuItem eventKey='2'>Item 2</MenuItem>
        <MenuItem eventKey='3'>Item 3</MenuItem>
        <MenuItem eventKey='4'>Item 4</MenuItem>
      </DropdownMenu>
    );

    const menuItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');

    menuItems.forEach(item => {
      ReactTestUtils.Simulate.click(item);
    });
  });

  it('applies pull right', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu pullRight>
        <MenuItem>Item</MenuItem>
      </DropdownMenu>
    );
    const node = React.findDOMNode(instance);

    node.className.should.match(/\bdropdown-menu-right\b/);
  });

  it('handles empty children', () => {
    ReactTestUtils.renderIntoDocument(
      <DropdownMenu pullRight>
        <MenuItem>Item</MenuItem>
        { false && <MenuItem>Item 2</MenuItem> }
      </DropdownMenu>
    );
  });

  describe('focusable state', () => {
    let focusableContainer;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(() => {
      React.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('clicking anything outside the menu will request close', () => {
      const requestClose = sinon.stub();
      const instance = React.render(
        <div>
          <button>Something to click</button>
          <DropdownMenu onClose={requestClose} open>
            <MenuItem>Item</MenuItem>
          </DropdownMenu>
        </div>, focusableContainer);

      const button = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

      const evt = document.createEvent('MouseEvent');
      evt.initMouseEvent('click', true, true);
      button.dispatchEvent(evt);

      requestClose.should.have.been.calledOnce;
      requestClose.getCall(0).args.length.should.equal(0);
    });

    describe('Keyboard Navigation', () => {
      it('sets focus on next menu item when the key "down" is pressed', () => {
        const instance = React.render(simpleMenu, focusableContainer);

        const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');
        items.length.should.equal(4);
        items[0].getDOMNode().focus();

        for (let i = 1; i < items.length; i++) {
          ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: keycode('down') });
          document.activeElement.should.equal(items[i].getDOMNode());
        }
      });

      it('with last item is focused when the key "down" is pressed first item gains focus', () => {
        const instance = React.render(simpleMenu, focusableContainer);

        const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');
        items.length.should.equal(4);
        items[3].getDOMNode().focus();

        ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: keycode('down') });
        document.activeElement.should.equal(items[0].getDOMNode());
      });

      it('sets focus on previous menu item when the key "up" is pressed', () => {
        const instance = React.render(simpleMenu, focusableContainer);

        const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');
        items.length.should.equal(4);
        items[3].getDOMNode().focus();

        for (let i = 2; i >= 0; i--) {
          ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: keycode('up') });
          document.activeElement.should.equal(items[i].getDOMNode());
        }
      });

      it('with first item focused when the key "up" is pressed last item gains focus', () => {
        const instance = React.render(simpleMenu, focusableContainer);

        const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');
        items.length.should.equal(4);
        items[0].getDOMNode().focus();

        ReactTestUtils.Simulate.keyDown(document.activeElement, { keyCode: keycode('up') });
        document.activeElement.should.equal(items[3].getDOMNode());
      });

      ['esc', 'tab'].forEach(key => {
        it(`when the key "${key}" is pressed the requestClose prop is invoked with the originating event`, () => {
          const requestClose = sinon.spy();
          const instance = React.render(
            <DropdownMenu onClose={requestClose}>
              <MenuItem>Item</MenuItem>
            </DropdownMenu>, focusableContainer);

          const item = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A').getDOMNode();

          ReactTestUtils.Simulate.keyDown(item, { keyCode: keycode(key) });

          requestClose.should.have.been.calledOnce;
          requestClose.getCall(0).args[0].keyCode.should.equal(keycode(key));
        });
      });
    });
  });

  it('Should pass props to dropdown', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="new-fancy-class">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownMenu>
    );

    let node = React.findDOMNode(instance);
    assert.ok(node.className.match(/\bnew-fancy-class\b/));
  });
});
