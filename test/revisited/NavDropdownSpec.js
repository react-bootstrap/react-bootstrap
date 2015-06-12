import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import NavDropdown from '../../src/revisited/NavDropdown';
import MenuItem from '../../src/revisited/MenuItem';

describe('NavDropdown', function() {
  it('NavDropdown specific tests');

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
            <NavDropdown
              open={this.state.open}
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
