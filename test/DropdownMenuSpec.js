import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Dropdown from '../src/Dropdown';
import DropdownMenu from '../src/DropdownMenu';
import DropdownItem from '../src/DropdownItem';

describe('<Dropdown.Menu>', () => {
  const simpleMenu = (
    <DropdownMenu>
      <DropdownItem eventKey="1">Item 1</DropdownItem>
      <DropdownItem eventKey="2">Item 2</DropdownItem>
      <DropdownItem eventKey="3">Item 3</DropdownItem>
      <DropdownItem eventKey="4">Item 4</DropdownItem>
    </DropdownMenu>
  );

  it('renders div with dropdown-menu class', () => {
    mount(simpleMenu).assertSingle('div.dropdown-menu');
  });

  it('Should pass props to dropdown', () => {
    mount(
      <DropdownMenu className="new-fancy-class">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </DropdownMenu>
    ).assertSingle('div.new-fancy-class');
  });

  it('applies alignRight', () => {
    mount(
      <DropdownMenu alignRight>
        <DropdownItem>Item</DropdownItem>
      </DropdownMenu>
    ).assertSingle('.dropdown-menu-right');
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

    it('clicking anything outside the menu will request close', () => {
      const requestClose = sinon.stub();
      const wrapper = mount(
        <div>
          <button>Something to click</button>
          <DropdownMenu onClose={requestClose} show>
            <DropdownItem>Item</DropdownItem>
          </DropdownMenu>
        </div>,
        { attachTo: focusableContainer }
      );

      wrapper
        .find('button')
        .getDOMNode()
        .click();

      requestClose.should.have.been.calledOnce;
      requestClose.getCall(0).args.length.should.equal(2);
    });

    describe('Keyboard Navigation', () => {
      ['Escape', 'Tab'].forEach(key => {
        it(`when the key "${key}" is pressed the requestClose prop is invoked with the originating event`, () => {
          const requestClose = sinon.spy();
          const wrapper = mount(
            <Dropdown
              defaultShow
              role="menu" // use menu role to auto focus the item for hte test
              id="test-id"
              onToggle={requestClose}
            >
              <Dropdown.Toggle />
              <DropdownMenu>
                <DropdownItem>Item</DropdownItem>
              </DropdownMenu>
            </Dropdown>,
            { attachTo: focusableContainer }
          );

          wrapper.find('a').simulate('keyDown', { key });

          requestClose.should.have.been.calledOnce;
          requestClose.getCall(0).args[1].key.should.equal(key);
        });
      });
    });
  });
});
