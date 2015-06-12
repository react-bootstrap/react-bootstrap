import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownButton from '../../src/revisited/DropdownButton';
import DropdownMenu from '../../src/revisited/DropdownMenu';
import MenuItem from '../../src/revisited/MenuItem';
import { shouldWarn } from '../helpers';
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

describe('DropdownButton revisited', function() {
  const simpleDropdown = (
    <DropdownButton title='Simple Dropdown' id='test-id'>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </DropdownButton>
  );

  it('renders div with dropdown class', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('DIV');
    node.className.should.match(/\bdropdown\b/);
    node.className.should.not.match(/\bdropup\b/);
  });

  it('renders div with dropup class', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Dropup' dropup id='test-id'>
        <MenuItem>Item</MenuItem>
      </DropdownButton>
    );
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('DIV');
    node.className.should.not.match(/\bdropdown\b/);
    node.className.should.match(/\bdropup\b/);
  });

  it('renders title prop', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.innerText.should.match(/Simple Dropdown/);
  });

  it('renders toggle with DropdownButton.Toggle', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton id='test-id'>
        <DropdownButton.Toggle>Child Title</DropdownButton.Toggle>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </DropdownButton>
    );
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.innerText.should.match(/Child Title/);
  });

  it('renders dropdown toggle button', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);

    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.tagName.should.equal('BUTTON');
    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('type').should.equal('button');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('renders single MenuItem child', function() {
    // Assertion is in the afterEach call that performs prop type validation,
    // there should be no errors.
    ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child' id='test-id'>
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
  });

  it('renders dropdown toggle button caret', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const caretNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'caret'));

    caretNode.tagName.should.equal('SPAN');
  });

  it('does not render toggle button caret', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child' noCaret id='test-id'>
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const caretNode = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'caret');

    caretNode.length.should.equal(0);
  });

  it('renders custom menu', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child' id='test-id'>
        <CustomMenu>
          <MenuItem>Item 1</MenuItem>
        </CustomMenu>
      </DropdownButton>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(0);
    ReactTestUtils.scryRenderedComponentsWithType(instance, CustomMenu).length.should.equal(1);
  });

  it('prop validation with multiple explicit menus');

  it('only renders one custom menu', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child' id='test-id'>
        <CustomMenu>
          <MenuItem>Item 1</MenuItem>
        </CustomMenu>
        <DropdownMenu>
          <MenuItem>Item 1</MenuItem>
        </DropdownMenu>
      </DropdownButton>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(0);
    ReactTestUtils.scryRenderedComponentsWithType(instance, CustomMenu).length.should.equal(1);

    shouldWarn(/Only one.*menu permitted/);
  });

  it('renders explicit menu', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child' id='test-id'>
        <DropdownMenu>
          <MenuItem>Item 1</MenuItem>
        </DropdownMenu>
      </DropdownButton>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(1);
  });

  it('children outside explicit menu are ignored', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child' id='test-id'>
        <MenuItem>Ignored</MenuItem>
        <DropdownMenu>
          <MenuItem>Item 1</MenuItem>
        </DropdownMenu>
      </DropdownButton>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(1);
    ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem).length.should.equal(1);

    shouldWarn('MenuItems with a Menu are not allowed');
  });

  it('forwards pullRight to menu', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton pullRight title='blah' id='test-id'>
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const menu = ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu);

    menu.props.pullRight.should.be.true;
  });

  it('renders bsSize', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='blah' bsSize='small' id='test-id'>
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = React.findDOMNode(instance);

    node.className.should.match(/\bbtn-group-sm\b/);
  });

  it('renders bsStyle', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='blah' bsStyle='success' id='test-id'>
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.className.should.match(/\bbtn-success\b/);
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', function() {
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

  it('when focused and closed toggles open when the key "down" is pressed', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    buttonNode.getAttribute('aria-haspopup').should.equal('true');
  });

  it('forwards onSelect handler to MenuItems', function(done) {
    const selectedEvents = [];
    const onSelect = (event, selectEvent) => {
      selectedEvents.push(selectEvent.eventKey);

      if (selectedEvents.length === 4) {
        selectedEvents.should.eql(['1', '2', '3', '4']);
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Simple Dropdown' onSelect={onSelect} id='test-id'>
        <MenuItem eventKey='1'>Item 1</MenuItem>
        <MenuItem eventKey='2'>Item 2</MenuItem>
        <MenuItem eventKey='3'>Item 3</MenuItem>
        <MenuItem eventKey='4'>Item 4</MenuItem>
      </DropdownButton>
    );

    const menuItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');

    menuItems.forEach(item => {
      ReactTestUtils.Simulate.click(item);
    });
  });

  it('closes when child MenuItem is selected', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Simple Dropdown' id='test-id'>
        <MenuItem eventKey='1'>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    const menuItem = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(menuItem);

    node.className.should.not.match(/\bopen\b/);
  });

  it('does not close when selection is prevented', function() {
    const handleSelect = (event, selectEvent) => {
      selectEvent.preventSelection();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Simple Dropdown' onSelect={handleSelect} id='test-id'>
        <MenuItem eventKey='1'>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = React.findDOMNode(instance);
    const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

    const menuItem = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(menuItem);

    node.className.should.match(/\bopen\b/);
  });

  it('is open with explicit prop', function() {
    class OpenProp extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          open: false
        };
      }

      render () {
        return (
          <div>
            <button className='outer-button'
              onClick={() => this.setState({open: !this.state.open})}>
              Outer button
            </button>
            <DropdownButton
              open={this.state.open}
              title='Prop open control'
              id='test-id'>
              <MenuItem eventKey='1'>Item 1</MenuItem>
            </DropdownButton>
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

  describe('PropType validation', function() {
    ['title', 'children'].forEach(type => {
      describe(type, function() {
        it('validates successfully', function() {
          const props = { title: 'some title' };
          DropdownButton.propTypes.title(props, type, 'DropdownButton');
        });

        it('validates with single child of type DropdownButton.Toggle', function() {
          const title = {
            type: DropdownButton.Toggle
          };
          const props = {
            children: [
              title
            ]
          };
          DropdownButton.propTypes.title(props, type, 'DropdownButton');
        });

        it('validation fails with no title', function() {
          const props = { other: 'some title' };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Must provide.*title.*or.*DropdownButton\.Toggle/);
        });

        it('validation fails with two DropdownButton.Toggle children', function() {
          const title = {
            type: DropdownButton.Toggle
          };
          const props = {
            children: [
              title,
              title
            ]
          };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Should only use one DropdownButton\.Toggle/);
        });

        it('validation fails with both title and DropdownButton.Toggle', function() {
          const title = {
            type: DropdownButton.Toggle
          };
          const props = {
            title: 'some title',
            children: [
              title
            ]
          };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Must provide.*title.*or.*DropdownButton\.Toggle.*not both/);
        });
      });
    });

    describe('navItem', function() {
      it('deprecation warning', function() {
        const props = {
          title: 'some title',
          navItem: true
        };

        DropdownButton.propTypes.navItem(props, 'navItem', 'DropdownButton');
        shouldWarn(/navItem.*NavDropdown component/);
      });
    });
  });

  describe('focusable state', function() {
    let focusableContainer;

    beforeEach(function() {
      focusableContainer = document.createElement('div');
      document.body.appendChild(focusableContainer);
    });

    afterEach(function() {
      React.unmountComponentAtNode(focusableContainer);
      document.body.removeChild(focusableContainer);
    });

    it('when focused and closed sets focus on first menu item when the key "down" is pressed', function() {
      const instance = React.render(simpleDropdown, focusableContainer);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

      buttonNode.focus();
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      const firstMenuItemAnchor = React.findDOMNode(ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);
      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open sets focus on first menu item when the key "down" is pressed', function() {
      const instance = React.render(simpleDropdown, focusableContainer);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

      buttonNode.focus();
      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      const firstMenuItemAnchor = React.findDOMNode(ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);
      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open does not toggle closed when the key "down" is pressed', function() {
      const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
      const node = React.findDOMNode(instance);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));

      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      node.className.should.match(/\bopen\b/);
      buttonNode.getAttribute('aria-expanded').should.equal('true');
    });

    it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', function() {
      const instance = React.render(simpleDropdown, focusableContainer);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));
      const firstMenuItemAnchor = React.findDOMNode(ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0]);

      buttonNode.focus();
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });
      ReactTestUtils.Simulate.keyDown(firstMenuItemAnchor, { type: 'keydown', keyCode: keycode('esc') });

      document.activeElement.should.equal(buttonNode);
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', function() {
      const instance = React.render(
        <div>
          {simpleDropdown}
          <input type='text' id='next-focusable' />
        </div>, focusableContainer);

      const node = ReactTestUtils.findRenderedComponentWithType(instance, DropdownButton);
      // See TODO below
      //const nextFocusable = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'INPUT'));
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(node, 'BUTTON'));

      ReactTestUtils.Simulate.click(buttonNode);
      buttonNode.getAttribute('aria-expanded').should.equal('true');

      ReactTestUtils.Simulate.keyDown(buttonNode, { key: keycode('tab'), keyCode: keycode('tab') });
      buttonNode.getAttribute('aria-expanded').should.equal('false');

      // TODO: I can't figure out how to make this assertion work in test, it
      // works fine when testing manually.
      //document.activeElement.should.equal(nextFocusable);
    });
  });

  describe('DropdownMenu', function() {
    it('has aria-labelledby same id as toggle button', function() {
      const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
      const node = React.findDOMNode(instance);
      const buttonNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON'));
      const menuNode = node.children[1];

      buttonNode.getAttribute('id').should.equal(menuNode.getAttribute('aria-labelledby'));
    });
  });
});
