import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import NavDropdown from '../src/NavDropdown';
import MenuItem from '../src/MenuItem';

describe('NavDropdown', () => {

  it('Should render li when in nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown title="Title" className="test-class" id='nav-test'>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </NavDropdown>
    );

    let li = React.findDOMNode(instance);
    let button = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'dropdown-toggle'));

    assert.equal(li.nodeName, 'LI');
    assert.ok(li.className.match(/\bdropdown\b/));
    assert.ok(li.className.match(/\btest-class\b/));
    assert.equal(button.nodeName, 'A');
    assert.equal(button.innerText.trim(), 'Title');
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
            <NavDropdown
              open={this.state.open}
              onToggle={() => {}}
              title='Prop open control'
              id='test-id'>
              <MenuItem eventKey='1'>Item 1</MenuItem>
            </NavDropdown>
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
});
