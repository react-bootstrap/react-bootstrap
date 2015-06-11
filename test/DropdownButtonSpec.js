import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import DropdownButton from '../src/DropdownButton';
import MenuItem from '../src/MenuItem';
import DropdownMenu from '../src/DropdownMenu';
import Button from '../src/Button';

describe('DropdownButton', function () {
  let instance;

  afterEach(function() {
    if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
      React.unmountComponentAtNode(React.findDOMNode(instance));
    }
  });

  it('Should render button correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" className="test-class">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let button = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Button));
    assert.ok(React.findDOMNode(instance).className.match(/\bbtn-group\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\btest-class\b/));
    assert.ok(button.className.match(/\bbtn\b/));
    assert.equal(button.nodeName, 'BUTTON');
    assert.equal(button.type, 'button');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });

  it('Should render menu correctly', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let menu = ReactTestUtils.findRenderedComponentWithType(instance, DropdownMenu);
    let allMenuItems = ReactTestUtils.scryRenderedComponentsWithType(menu, MenuItem);
    assert.equal(allMenuItems.length, 2);
  });

  it('Should pass props to button', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" bsStyle="primary" id="testId" disabled>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let button = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Button));
    assert.ok(button.className.match(/\bbtn-primary\b/));
    assert.equal(button.getAttribute('id'), 'testId');
    assert.ok(button.disabled);
  });

  it('Should be closed by default', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>);

    assert.notOk(React.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('Should open when clicked', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    ReactTestUtils.SimulateNative.click(React.findDOMNode(instance.refs.dropdownButton));
    assert.ok(React.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('should call onSelect with eventKey when MenuItem is clicked', function (done) {
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      assert.equal(instance.state.open, false);
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" onSelect={handleSelect}>
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2'>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should call MenuItem onSelect with eventKey when MenuItem is clicked', function (done) {
    function handleSelect(eventKey) {
      assert.equal(eventKey, '2');
      assert.equal(instance.state.open, false);
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2' onSelect={handleSelect}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.equal(menuItems.length, 2);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(menuItems[1], 'a')
    );
  });

  it('should not set onSelect to child with no onSelect prop', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title">
        <MenuItem eventKey={1}>MenuItem 1 content</MenuItem>
        <MenuItem eventKey={2}>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let menuItems = ReactTestUtils.scryRenderedComponentsWithType(instance, MenuItem);
    assert.notOk(menuItems[0].props.onSelect);
  });

  describe('when open', function () {
    beforeEach(function () {
      instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title">
          <MenuItem eventKey={1}>MenuItem 1 content</MenuItem>
          <MenuItem eventKey={2}>MenuItem 2 content</MenuItem>
        </DropdownButton>
      );

      instance.setDropdownState(true);
    });

    it('should close on click', function () {
      let evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, true);
      document.documentElement.dispatchEvent(evt);

      assert.notOk(React.findDOMNode(instance).className.match(/\bopen\b/));
    });
  });

  it('Should render li when in nav', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" className="test-class" navItem>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let li = React.findDOMNode(instance);
    let button = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Button));
    assert.equal(li.nodeName, 'LI');
    assert.ok(li.className.match(/\bdropdown\b/));
    assert.ok(li.className.match(/\btest-class\b/));
    assert.equal(button.nodeName, 'A');
    assert.ok(button.className.match(/\bdropdown-toggle\b/));
    assert.ok(button.lastChild.className.match(/\bcaret\b/));
    assert.equal(button.innerText.trim(), 'Title');
  });

  it('should render a caret by default', function() {
    instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title">
          <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
          <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
    );

    let button = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Button));
    let carets = button.getElementsByClassName('caret');
    assert.equal(carets.length, 1);
  });

  it('should not render a caret if noCaret prop is given', function() {
    instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton title="Title" noCaret>
          <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
          <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
    );

    let button = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Button));
    let carets = button.getElementsByClassName('caret');
    assert.equal(carets.length, 0);
  });

  it('should set button class when buttonClassName is given', function() {
    instance = ReactTestUtils.renderIntoDocument(
        <DropdownButton buttonClassName="test-class">
          <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
          <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
        </DropdownButton>
    );

    let button = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Button));
    assert.ok(button.className.match(/\btest-class\b/));
  });

  it('should set onClick on Button', function (done) {
    function handleClick() {
      done();
    }

    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" onClick={handleClick}>
        <MenuItem eventKey='1'>MenuItem 1 content</MenuItem>
        <MenuItem eventKey='2'>MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    let button = ReactTestUtils.findRenderedComponentWithType(instance, Button);
    ReactTestUtils.SimulateNative.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(button, 'dropdown-toggle')
    );
  });

  it('Should be open when prop open is set to true', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" open={true}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    assert.ok(React.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('Should be closed when prop open is set to false', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" open={false}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    assert.ok(!React.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('Should close on click if prop open is set to true', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" open={true}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    ReactTestUtils.SimulateNative.click(React.findDOMNode(instance.refs.dropdownButton));
    assert.ok(!React.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('Should open on click if prop open is set to false', function () {
    instance = ReactTestUtils.renderIntoDocument(
      <DropdownButton title="Title" open={false}>
        <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
        <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
      </DropdownButton>
    );

    ReactTestUtils.SimulateNative.click(React.findDOMNode(instance.refs.dropdownButton));
    assert.ok(React.findDOMNode(instance).className.match(/\bopen\b/));
  });

  it('Should update open state on componentWillReceiveProps', function () {
    let DropDownToggle = React.createClass({
      getInitialState: function() {
        return {
          open: false
        };
      },
      toggle: function() {
        this.setState({
          open: !this.state.open
        });
      },
      render: function() {
        return (
          <div>
            <Button ref="toggleButton" onClick={this.toggle}/>
            <DropdownButton ref="dropdown" title="Title" open={this.state.open}>
              <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
              <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
            </DropdownButton>
          </div>
        );
      }
    });

    let toggleInstance = ReactTestUtils.renderIntoDocument(<DropDownToggle/>);

    ReactTestUtils.SimulateNative.click(React.findDOMNode(toggleInstance.refs.toggleButton));
    assert.ok(React.findDOMNode(toggleInstance.refs.dropdown).className.match(/\bopen\b/));
    ReactTestUtils.SimulateNative.click(React.findDOMNode(toggleInstance.refs.toggleButton));
    assert.ok(!React.findDOMNode(toggleInstance.refs.dropdown).className.match(/\bopen\b/));
  });

  it('Should call open state change handler', function () {
    let DropDownToggle = React.createClass({
      getInitialState: function() {
        return {
          open: false
        };
      },
      toggle: function() {
        this.setState({
          open: !this.state.open
        });
      },
      handleOpenStateChange: function(openState) {
        this.setState({
          open: openState
        });
      },
      render: function() {
        return (
          <div>
            <Button ref="toggleButton" onClick={this.toggle}/>
            <DropdownButton
              ref="dropdown"
              title="Title"
              open={this.state.open}
              onOpenStateChange={this.handleOpenStateChange}
            >
              <MenuItem eventKey="1">MenuItem 1 content</MenuItem>
              <MenuItem eventKey="2">MenuItem 2 content</MenuItem>
            </DropdownButton>
          </div>
        );
      }
    });

    let toggleInstance = ReactTestUtils.renderIntoDocument(<DropDownToggle/>);

    // open via DropdownButton
    ReactTestUtils.SimulateNative.click(React.findDOMNode(toggleInstance.refs.dropdown.refs.dropdownButton));
    assert.ok(React.findDOMNode(toggleInstance.refs.dropdown).className.match(/\bopen\b/));
    // should close via DropDownToggle
    ReactTestUtils.SimulateNative.click(React.findDOMNode(toggleInstance.refs.toggleButton));
    assert.ok(!React.findDOMNode(toggleInstance.refs.dropdown).className.match(/\bopen\b/));
  });
});
