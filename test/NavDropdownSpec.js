import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import DropdownItem from '../src/DropdownItem';
import Nav from '../src/Nav';
import NavDropdown from '../src/NavDropdown';

describe('<NavDropdown>', () => {
  it('Should render li when in nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav>
        <NavDropdown title="Title" className="test-class" id="nav-test">
          <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
          <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
        </NavDropdown>
      </Nav>
    );

    const dropdown = ReactDOM.findDOMNode(
      ReactTestUtils.findRenderedComponentWithType(instance, NavDropdown)
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown-toggle'
    );

    assert.equal(dropdown.nodeName, 'LI');
    assert.ok(dropdown.className.match(/\bdropdown\b/));
    assert.ok(dropdown.className.match(/\btest-class\b/));
    assert.notOk(dropdown.className.match(/\bactive\b/));
    assert.equal(button.nodeName, 'A');
    assert.equal(button.textContent.trim(), 'Title');
  });

  it('renders div with active class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown active title="Title" className="test-class" id="nav-test">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
      </NavDropdown>
    );

    const li = ReactDOM.findDOMNode(instance);

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active')
    );
    assert.ok(li.className.match(/\btest-class\b/)); // it still has the given className
    assert.ok(li.className.match(/\bactive\b/)); // plus the active class
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
            <button
              className="outer-button"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              Outer button
            </button>
            <NavDropdown
              open={this.state.open}
              onToggle={() => {}}
              title="Prop open control"
              id="test-id"
            >
              <DropdownItem eventKey="1">Item 1</DropdownItem>
            </NavDropdown>
          </div>
        );
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(<OpenProp />);
    const outerToggle = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'outer-button'
    );
    const dropdownNode = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'dropdown'
    );

    dropdownNode.className.should.not.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(outerToggle);
    dropdownNode.className.should.match(/\bopen\b/);
    ReactTestUtils.Simulate.click(outerToggle);
    dropdownNode.className.should.not.match(/\bopen\b/);
  });

  it('should handle child active state', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown id="test-id" title="title" activeKey="2">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
        <DropdownItem eventKey="2">DropdownItem 2 content</DropdownItem>
        <DropdownItem eventKey="3">DropdownItem 3 content</DropdownItem>
      </NavDropdown>
    );

    expect(ReactDOM.findDOMNode(instance).className).to.match(/active/);

    const items = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      DropdownItem
    );
    expect(ReactDOM.findDOMNode(items[0]).className).to.not.match(/active/);
    expect(ReactDOM.findDOMNode(items[1]).className).to.match(/active/);
    expect(ReactDOM.findDOMNode(items[2]).className).to.not.match(/active/);
  });

  it('should handle nested child null active state', () => {
    class Container extends React.Component {
      render() {
        return null;
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown id="test-id" title="title">
        <Container>
          <DropdownItem>DropdownItem 1 content</DropdownItem>
        </Container>
      </NavDropdown>
    );

    const container = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Container
    );
    expect(container.props.active).to.not.be.false;
  });

  it('should derive bsClass from parent', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown title="title" id="test-id" bsClass="my-dropdown">
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </NavDropdown>
    );

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'my-dropdown-toggle'
      )
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'my-dropdown-menu'
      )
    );
  });
});
