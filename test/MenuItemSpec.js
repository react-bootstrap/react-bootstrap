import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import MenuItem from '../src/MenuItem';
import { shouldWarn } from './helpers';

describe('MenuItem', () => {
  it('renders divider', () => {
    const instance = ReactTestUtils.renderIntoDocument(<MenuItem divider />);
    const node = React.findDOMNode(instance);

    node.className.should.match(/\bdivider\b/);
    node.getAttribute('role').should.equal('separator');
  });

  it('renders divider not children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem divider>
        Some child
      </MenuItem>
    );
    const node = React.findDOMNode(instance);

    node.className.should.match(/\bdivider\b/);
    node.innerHTML.should.not.match(/Some child/);
    shouldWarn('Children will not be rendered for dividers');
  });

  it('renders header', () => {
    const instance = ReactTestUtils.renderIntoDocument(<MenuItem header>Header Text</MenuItem>);
    const node = React.findDOMNode(instance);

    node.className.should.match(/\bdropdown-header\b/);
    node.getAttribute('role').should.equal('heading');
    node.innerHTML.should.match(/Header Text/);
  });

  it('renders menu item link', (done) => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem
        onKeyDown={() => done()}
        href='/herpa-derpa'>
        Item
      </MenuItem>
    );
    const node = React.findDOMNode(instance);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A').getDOMNode();

    node.getAttribute('role').should.equal('presentation');
    anchor.getAttribute('role').should.equal('menuitem');
    anchor.getAttribute('tabIndex').should.equal('-1');
    anchor.getAttribute('href').should.equal('/herpa-derpa');

    anchor.innerHTML.should.match(/Item/);

    ReactTestUtils.Simulate.keyDown(anchor, { keyCode: 1 });
  });

  it('click handling with onSelect prop', () => {
    const handleSelect = (event, eventKey) => {
      eventKey.should.equal('1');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} eventKey='1'>Item</MenuItem>
    );
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(anchor);
  });

  it('click handling with onSelect prop (no eventKey)', () => {
    const handleSelect = (event, eventKey) => {
      expect(eventKey).to.be.undefined;
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect}>Item</MenuItem>
    );
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(anchor);
  });

  it('does not fire onSelect when divider is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} divider />
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A').length.should.equal(0);
    const li = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'li');

    ReactTestUtils.Simulate.click(li);
  });

  it('does not fire onSelect when header is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} header>Header content</MenuItem>
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A').length.should.equal(0);
    const li = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'li');

    ReactTestUtils.Simulate.click(li);
  });

  it('disabled link', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect event');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} disabled>Text</MenuItem>
    );
    const node = React.findDOMNode(instance);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'A');

    node.className.should.match(/\bdisabled\b/);

    ReactTestUtils.Simulate.click(anchor);
  });

  it('should pass through props', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
      >
        Title
      </MenuItem>
    );

    let node = React.findDOMNode(instance);

    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.getAttribute('href'), null);
    assert.equal(node.getAttribute('title'), null);

    let anchorNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

    assert.notOk(anchorNode.className.match(/\btest-class\b/));
    assert.equal(anchorNode.getAttribute('href'), '#hi-mom!');
    assert.equal(anchorNode.getAttribute('title'), 'hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem target="_blank">
        Title
      </MenuItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(React.findDOMNode(anchor).getAttribute('target'), '_blank');
  });

  it('should output an li', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem>
        Title
      </MenuItem>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'LI');
    assert.equal(React.findDOMNode(instance).getAttribute('role'), 'presentation');
  });

});
