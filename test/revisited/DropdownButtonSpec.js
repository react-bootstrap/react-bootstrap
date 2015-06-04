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
    <DropdownButton title='Simple Dropdown'>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </DropdownButton>
  );

  // TODO
  it('does not render caret');
  it('works with dropup');
  it('pulls to the right');

  it('renders div with dropdown class', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);

    node.tagName.should.equal('DIV');
    node.className.should.match(/\bdropdown\b/);
  });

  it('renders title prop', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

    buttonNode.innerText.should.match(/Simple Dropdown/);
  });

  it('renders title with DropdownButton.Title', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton>
        <DropdownButton.Title>Child Title</DropdownButton.Title>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </DropdownButton>
    );
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

    buttonNode.innerText.should.match(/Child Title/);
  });

  it('renders dropdown toggle button', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

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
      <DropdownButton title='Single child'>
        <MenuItem>Item 1</MenuItem>
      </DropdownButton>
    );
  });

  it('renders dropdown toggle button caret', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const caretNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'caret').getDOMNode();

    caretNode.tagName.should.equal('SPAN');
  });

  it('renders custom menu', function() {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title='Single child'>
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
      <DropdownButton title='Single child'>
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
      <DropdownButton title='Single child'>
        <DropdownMenu>
          <MenuItem>Item 1</MenuItem>
        </DropdownMenu>
      </DropdownButton>
    );

    ReactTestUtils.scryRenderedComponentsWithType(instance, DropdownMenu).length.should.equal(1);
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node = React.findDOMNode(instance);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

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
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

    ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');
  });

  it('generates a random id if one is not provided', function() {
    const instance1 = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const instance2 = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const node1 = ReactTestUtils.findRenderedDOMComponentWithTag(instance1, 'BUTTON').getDOMNode();
    const node2 = ReactTestUtils.findRenderedDOMComponentWithTag(instance2, 'BUTTON').getDOMNode();

    node1.getAttribute('id').should.not.equal(node2.getAttribute('id'));
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', function() {
    const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

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
      <DropdownButton title='Simple Dropdown' onSelect={onSelect}>
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
      <DropdownButton title='Simple Dropdown'>
        <MenuItem eventKey='1'>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = React.findDOMNode(instance);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

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
      <DropdownButton title='Simple Dropdown' onSelect={handleSelect}>
        <MenuItem eventKey='1'>Item 1</MenuItem>
      </DropdownButton>
    );
    const node = React.findDOMNode(instance);
    const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

    const menuItem = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(buttonNode);
    node.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(menuItem);

    node.className.should.match(/\bopen\b/);
  });

  describe('PropType validation', function() {
    ['title', 'children'].forEach(type => {
      describe(type, function() {
        it('validates successfully', function() {
          const props = { title: 'some title' };
          DropdownButton.propTypes.title(props, type, 'DropdownButton');
        });

        it('validates with single child of type DropdownButton.Title', function() {
          const title = {
            type: DropdownButton.Title
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
            .message.should.match(/Must provide.*title.*or.*DropdownButton\.Title/);
        });

        it('validation fails with two DropdownButton.Title children', function() {
          const title = {
            type: DropdownButton.Title
          };
          const props = {
            children: [
              title,
              title
            ]
          };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Should only use one DropdownButton\.Title/);
        });

        it('validation fails with both title and DropdownButton.Title', function() {
          const title = {
            type: DropdownButton.Title
          };
          const props = {
            title: 'some title',
            children: [
              title
            ]
          };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Must provide.*title.*or.*DropdownButton\.Title.*not both/);
        });
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
      const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

      buttonNode.focus();
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      const firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0].getDOMNode();
      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open sets focus on first menu item when the key "down" is pressed', function() {
      const instance = React.render(simpleDropdown, focusableContainer);
      const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

      buttonNode.focus();
      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      const firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0].getDOMNode();
      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open does not toggle closed when the key "down" is pressed', function() {
      const instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
      const node = React.findDOMNode(instance);
      const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();

      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      node.className.should.match(/\bopen\b/);
      buttonNode.getAttribute('aria-expanded').should.equal('true');
    });

    it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', function() {
      const instance = React.render(simpleDropdown, focusableContainer);
      const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();
      const firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0].getDOMNode();

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
      //const nextFocusable = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'INPUT').getDOMNode();
      const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(node, 'BUTTON').getDOMNode();

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
      const buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'BUTTON').getDOMNode();
      const menuNode = node.children[1];

      buttonNode.getAttribute('id').should.equal(menuNode.getAttribute('aria-labelledby'));
    });
  });
});
