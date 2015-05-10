import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownMenu from '../src/DropdownMenu';
import MenuItem from '../src/MenuItem';

describe('DropdownMenu', function () {
  it('Should render menu correctly', function () {
    let Parent = React.createClass({
      render(){
        return (
          <DropdownMenu>
            <MenuItem eventKey="1" ref="item1">MenuItem 1 content</MenuItem>
            <MenuItem eventKey="2" ref="item2">MenuItem 2 content</MenuItem>
          </DropdownMenu>
        );
      }
    });

    let instance = ReactTestUtils.renderIntoDocument(<Parent/>);

    let node = instance.getDOMNode();

    assert.ok(node.className.match(/\bdropdown-menu\b/));
    assert.equal(node.nodeName, 'UL');
    assert.equal(node.getAttribute('role'), 'menu');

    let allMenuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(allMenuItems.length, 2);
    assert.equal(allMenuItems[0], instance.refs.item1);
    assert.equal(allMenuItems[1], instance.refs.item2);
  });

  it('Should pass props to dropdown', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="new-fancy-class">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
      </DropdownMenu>
    );

    let node = instance.getDOMNode();
    assert.ok(node.className.match(/\bnew-fancy-class\b/));
  });

  it('should call onSelect with eventKey when MenuItem is clicked', function (done) {
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu onSelect={handleSelect}>
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2'>MenuItem 2 content</MenuItem>
      </DropdownMenu>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should call all onSelect handlers when MenuItem is clicked', function (done) {
    let i = 0;
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      i += 1;
      if ( i >= 2 ) {
        done();
      }
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu onSelect={handleSelect}>
        <MenuItem eventKey='1' onSelect={handleSelect}>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2' onSelect={handleSelect}>MenuItem 2 content</MenuItem>
      </DropdownMenu>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should call not preventDefault with no onSelect handlers when MenuItem is clicked', function (done) {
    window.__someGlobalTestCallback = function() {
      delete window.__someGlobalTestCallback;
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu>
        <MenuItem eventKey={1}>MenuItem 1 content</MenuItem>
        <MenuItem eventKey={2} href='javascript:window.__someGlobalTestCallback();'>MenuItem 2 content</MenuItem>
      </DropdownMenu>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', true, true);
    ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a').getDOMNode()
      .dispatchEvent(evt);
  });
});
