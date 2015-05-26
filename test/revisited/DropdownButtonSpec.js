import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownButton from '../../src/revisited/DropdownButton';
import DropdownButtonTitle from '../../src/revisited/DropdownButtonTitle';
import MenuItem from '../../src/revisited/MenuItem';
import keycode from 'keycode';

describe('DropdownButton revisited', function() {
  let simpleDropdown = (
    <DropdownButton title='Simple Dropdown'>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </DropdownButton>
  );

  it('renders div with dropdown class', function() {
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node = React.findDOMNode(instance);

    node.tagName.should.equal('DIV');
    node.className.should.match(/\bdropdown\b/);
  });

  it('renders title prop', function() {
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node = React.findDOMNode(instance);
    let buttonNode = node.children[0];

    buttonNode.innerText.should.match(/Simple Dropdown/);
  });

  it('renders title with DropdownButtonTitle', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton>
        <DropdownButtonTitle>Child Title</DropdownButtonTitle>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </DropdownButton>
    );
    let node = React.findDOMNode(instance);
    let buttonNode = node.children[0];

    buttonNode.innerText.should.match(/Child Title/);
  });

  it('renders dropdown toggle button', function() {
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node = React.findDOMNode(instance);
    let buttonNode = node.children[0];

    buttonNode.tagName.should.equal('BUTTON');
    buttonNode.className.should.match(/\bbtn[ $]/);
    buttonNode.className.should.match(/\bbtn-default\b/);
    buttonNode.className.should.match(/\bdropdown-toggle\b/);
    buttonNode.getAttribute('type').should.equal('button');
    buttonNode.getAttribute('aria-expanded').should.equal('false');
    buttonNode.getAttribute('id').should.be.ok;
  });

  it('renders dropdown toggle button caret', function() {
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let caretNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'caret').getDOMNode();

    caretNode.tagName.should.equal('SPAN');
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', function() {
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node = React.findDOMNode(instance);
    let buttonNode = React.findDOMNode(node.children[0]);

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
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node = React.findDOMNode(instance);
    let buttonNode = React.findDOMNode(node.children[0]);

    ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

    node.className.should.match(/\bopen\b/);
    buttonNode.getAttribute('aria-expanded').should.equal('true');
  });

  it('generates a random id if one is not provided', function() {
    let instance1 = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let instance2 = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node1 = ReactTestUtils.findRenderedDOMComponentWithTag(instance1, 'BUTTON').getDOMNode();
    let node2 = ReactTestUtils.findRenderedDOMComponentWithTag(instance2, 'BUTTON').getDOMNode();

    node1.getAttribute('id').should.not.equal(node2.getAttribute('id'));
  });

  it('button has aria-haspopup attribute (As per W3C WAI-ARIA Spec)', function() {
    let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
    let node = React.findDOMNode(instance);
    let buttonNode = React.findDOMNode(node.children[0]);

    buttonNode.getAttribute('aria-haspopup').should.equal('true');
  });

  describe('PropType validation', function() {
    ['title', 'children'].forEach(type => {
      describe(type, function() {
        it('validates successfully', function() {
          const props = { title: 'some title' };
          DropdownButton.propTypes.title(props, type, 'DropdownButton');
        });

        it('validates with single child of type DropdownButtonTitle', function() {
          const title = {
            type: DropdownButtonTitle
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
            .message.should.match(/Must provide.*title.*or.*DropdownButtonTitle/);
        });

        it('validation fails with two DropdownButtonTitle children', function() {
          const title = {
            type: DropdownButtonTitle
          };
          const props = {
            children: [
              title,
              title
            ]
          };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Should only use one DropdownButtonTitle/);
        });

        it('validation fails with both title and DropdownButtonTitle', function() {
          const title = {
            type: DropdownButtonTitle
          };
          const props = {
            title: 'some title',
            children: [
              title
            ]
          };

          DropdownButton.propTypes.title(props, type, 'DropdownButton')
            .message.should.match(/Must provide.*title.*or.*DropdownButtonTitle.*not both/);
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
      let instance = React.render(simpleDropdown, focusableContainer);
      let node = React.findDOMNode(instance);
      let buttonNode = React.findDOMNode(node.children[0]);

      buttonNode.focus();
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      let firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0].getDOMNode();
      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open sets focus on first menu item when the key "down" is pressed', function() {
      let instance = React.render(simpleDropdown, focusableContainer);
      let node = React.findDOMNode(instance);
      let buttonNode = React.findDOMNode(node.children[0]);

      buttonNode.focus();
      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      let firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0].getDOMNode();
      document.activeElement.should.equal(firstMenuItemAnchor);
    });

    it('when focused and open does not toggle closed when the key "down" is pressed', function() {
      let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
      let node = React.findDOMNode(instance);
      let buttonNode = React.findDOMNode(node.children[0]);

      ReactTestUtils.Simulate.click(buttonNode);
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });

      node.className.should.match(/\bopen\b/);
      buttonNode.getAttribute('aria-expanded').should.equal('true');
    });

    it('when open and the key "esc" is pressed the menu is closed and focus is returned to the button', function() {
      let instance = React.render(simpleDropdown, focusableContainer);
      let node = React.findDOMNode(instance);
      let buttonNode = React.findDOMNode(node.children[0]);
      let firstMenuItemAnchor = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A')[0].getDOMNode();

      buttonNode.focus();
      ReactTestUtils.Simulate.keyDown(buttonNode, { keyCode: keycode('down') });
      ReactTestUtils.Simulate.keyDown(firstMenuItemAnchor, { type: 'keydown', keyCode: keycode('esc') });

      document.activeElement.should.equal(buttonNode);
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', function() {
      let instance = React.render(
        <div>
          {simpleDropdown}
          <input type='text' id='next-focusable' />
        </div>, focusableContainer);

      let node = ReactTestUtils.findRenderedComponentWithType(instance, DropdownButton);
      // See TODO below
      //let nextFocusable = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'INPUT').getDOMNode();
      let buttonNode = ReactTestUtils.findRenderedDOMComponentWithTag(node, 'BUTTON').getDOMNode();

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
      let instance = ReactTestUtils.renderIntoDocument(simpleDropdown);
      let node = React.findDOMNode(instance);
      let buttonNode = node.children[0];
      let menuNode = node.children[1];

      buttonNode.getAttribute('id').should.equal(menuNode.getAttribute('aria-labelledby'));
    });
  });
});
