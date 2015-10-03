import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Dropdown from '../src/Dropdown';
import DropdownMenu from '../src/DropdownMenu';
import MenuItem from '../src/MenuItem';
import { shouldWarn } from './helpers';
import keycode from 'keycode';

class CustomMenu extends React.Component {
  render() {
    return (
      <div className='custom-menu'>
        {this.props.children}
      </div>
    );
  }
}

describe('Dropdown', () => {
  let BaseDropdown = Dropdown.ControlledComponent;

  const dropdownChildren = [
    <Dropdown.Toggle>
      Child Title
    </Dropdown.Toggle>,
    <Dropdown.Menu>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </Dropdown.Menu>
  ];

  const simpleDropdown = (
    <Dropdown id='test-id'>
      {dropdownChildren}
    </Dropdown>
  );

  it('renders div with dropdown class', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('DIV');
    node.className.should.match(/\bdropdown\b/);
    node.className.should.not.match(/\bdropup\b/);
  });

  it('renders div with dropup class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title='Dropup' dropup id='test-id'>
        {dropdownChildren}
      </Dropdown>
    );
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('DIV');
    node.className.should.not.match(/\bdropdown\b/);
    node.className.should.match(/\bdropup\b/);
  });

  it('renders toggle with Dropdown.Toggle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      simpleDropdown
    );

    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.innerText.should.match(/Child Title/);

    buttonNode.tagName.should.equal('BUTTON');
    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('type').should.equal('button');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });


  it('renders dropdown toggle button caret', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const caretNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'caret'));

    caretNode.tagName.should.equal('SPAN');
  });

  it('does not render toggle button caret', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown.Toggle noCaret>
        Child Text
      </Dropdown.Toggle>
    );
    const caretNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'caret');

    caretNode.length.should.equal(0);
  });

  it('renders custom menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title='Single child' id='test-id'>
        <Dropdown.Toggle>Child Text</Dropdown.Toggle>

        <CustomMenu bsRole='menu'>
          <MenuItem>Item 1</MenuItem>
        </CustomMenu>
      </Dropdown>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(0);
    ReactTestUtils.scryRenderedComponentsWithType(instance, CustomMenu).length.should.equal(1);
  });

  it('prop validation with multiple menus', () => {
    const props = {
      title: 'herpa derpa',
      children: [(
        <Dropdown.Toggle>Child Text</Dropdown.Toggle>
      ), (
        <Dropdown.Menu>
          <MenuItem>Item 1</MenuItem>
        </Dropdown.Menu>
      ), (
        <Dropdown.Menu>
          <MenuItem>Item 1</MenuItem>
        </Dropdown.Menu>
      )]
    };

    let err = BaseDropdown.propTypes.children(props, 'children', 'DropdownButton');
    err.message.should.match(/Duplicate children.*bsRole: menu/);
  });

  it('only renders one menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title='Single child' id='test-id'>
        <Dropdown.Toggle>Child Text</Dropdown.Toggle>

        <CustomMenu bsRole='menu'>
          <MenuItem>Item 1</MenuItem>
        </CustomMenu>
        <DropdownMenu>
          <MenuItem>Item 1</MenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(0);
    ReactTestUtils.scryRenderedComponentsWithType(instance, CustomMenu).length.should.equal(1);

    shouldWarn(/Duplicate children.*bsRole: menu/);
  });


  it('forwards pullRight to menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown pullRight id='test-id'>
        {dropdownChildren}
      </Dropdown>
    );
    const menu = ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu);

    menu.props.pullRight.should.be.true;
  });


  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');

    ReactTestUtils.Simulate.click(buttonNode);

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');

    ReactTestUtils.Simulate.click(buttonNode);

    node.className.should.not.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('false');
  });

  it('opens if dropdown contains no focusable menu item', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown title='custom child' id='dropdown'>
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <li>Some custom nonfocusable content</li>
        </Dropdown.Menu>
      </Dropdown>
    );
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));
    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
  });

  it('when focused and closed toggles open when the key "down" is pressed', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.getAttribute('aria-haspopup').should.equal('true');
  });


  it('closes when child MenuItem is selected', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      simpleDropdown
    );

    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    const menuItem = React.findDOMNode(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);

    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(menuItem);
    node.className.should.not.match(/\bopen\b/);
  });

  it('does not close when onToggle is controlled', () => {
    const handleSelect = () => {};

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown open={true} onToggle={handleSelect} id='test-id'>
        {dropdownChildren}
      </Dropdown>
    );

    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    const menuItem = React.findDOMNode(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);

    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(menuItem);

    node.className.should.match(/\bopen\b/);
  });

  it('is open with explicit prop', () => {
    class OpenProp extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          open: false
        };
      }

      render() {
        return (
          <div>
            <button className='outer-button'
              onClick={() => this.setState({open: !this.state.open})}>
              Outer button
            </button>
            <Dropdown
              open={this.state.open}
              onToggle={() => {}}
              title='Prop open control'
              id='test-id'
            >
              {dropdownChildren}
            </Dropdown>
          </div>
        );
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(<OpenProp />);
    const outerToggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'outer-button');
    const dropdownNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown'));

    dropdownNode.className.should.not.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(outerToggle);
    dropdownNode.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(outerToggle);
    dropdownNode.className.should.not.match(/\bopen\b/);
  });

  it('has aria-labelledby same id as toggle button', () => {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));
    const menuNode = node.children[1];

    buttonNode.getAttribute('id').should.equal(menuNode.getAttribute('aria-labelledby'));
  });

  describe('PropType validation', () => {

    describe('children', () => {

      it('menu is exclusive', () => {

        const props = {
          children: [
            <Dropdown.Toggle/>,
            <Dropdown.Menu/>,
            <Dropdown.Menu/>
          ]
        };
        BaseDropdown.propTypes.children(props, 'children', 'Dropdown')
          .message.should.match(/Duplicate children.*bsRole: menu/);
      });

      it('menu is required', () => {

        const props = {
          children: [
            <Dropdown.Toggle/>
          ]
        };

        BaseDropdown.propTypes.children(props, 'children', 'Dropdown')
          .message.should.match(/Missing a required child.*bsRole: menu/);
      });

      it('toggles are not exclusive', () => {

        const props = {
          children: [
            <Dropdown.Toggle/>,
            <Dropdown.Toggle/>,
            <Dropdown.Menu/>
          ]
        };

        expect(BaseDropdown.propTypes.children(props, 'children', 'Dropdown'))
          .to.not.exist;
      });

      it('toggle is required', () => {

        const props = {
          children: [
            <Dropdown.Menu/>
          ]
        };

        BaseDropdown.propTypes.children(props, 'children', 'Dropdown')
          .message.should.match(/Missing a required child.*bsRole: toggle/);
      });

    });

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

    it('when focused and closed sets focus on first menu item when the key "down" is pressed', () => {
      const instance = React.render(simpleDropdown, focusableContainer);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

      buttonNode.focus();

      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      const firstMenuItemAnchor = React.findDOMNode(
        ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);

      document.activeElement.should.equal(firstMenuItemAnchor);
    });


    it('when focused and open does not toggle closed when the key "down" is pressed', () => {
      const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
      const node = React.findDOMNode(instance);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      node.className.should.match(/\bopen\b/);
      buttonNode.getAttribute('aria-expanded').should.equal('true');
    });

    // This test is more complicated then it appears to need. This is
    // because there was an intermittent failure of the test when not structured this way
    // The failure occured when all tests in the suite were run together, but not a subset of the tests.
    //
    // I am fairly confident that the failure is due to a test specific conflict and not an actual bug.
    it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', () => {
      const instance = React.render(
        <Dropdown defaultOpen role="menuitem" id="test-id">
          {dropdownChildren}
        </Dropdown>
      , focusableContainer);

      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));
      const firstMenuItemAnchor = React.findDOMNode(ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);

      document.activeElement.should.equal(firstMenuItemAnchor);

      ReactTestUtils.Simulate.keyDown(firstMenuItemAnchor, { type: 'keydown', keyCode: keycode('esc') });

      document.activeElement.should.equal(buttonNode);
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', done => {
      const instance = React.render(
        <div>
          {simpleDropdown}
          <input type='text' id='next-focusable' />
        </div>, focusableContainer);

      const node = ReactTestUtils.findRenderedComponentWithType(instance, Dropdown);

      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(node, 'BUTTON'));

      ReactTestUtils.Simulate.click(buttonNode);
      buttonNode.getAttribute('aria-expanded').should.equal('true');

      ReactTestUtils.Simulate.keyDown(buttonNode, { key: keycode('tab'), keyCode: keycode('tab') });

      setTimeout(() => {
        buttonNode.getAttribute('aria-expanded').should.equal('false');
        done();
      });


      // simulating a tab event doesn't actually shift focus.
      // at least that seems to be the case according to SO.
      // hence no assert on the input having focus.
    });
  });

});
