import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';

import MenuItem from '../src/MenuItem';

import { shouldWarn } from './helpers';

describe('<MenuItem>', () => {
  it('renders divider', () => {
    const instance = ReactTestUtils.renderIntoDocument(<MenuItem divider />);
    const node = ReactDOM.findDOMNode(instance);

    node.className.should.match(/\bdivider\b/);
    node.getAttribute('role').should.equal('separator');
  });

  it('renders divider className and style', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem divider className="foo bar" style={{ height: '100px' }} />
    );
    const node = ReactDOM.findDOMNode(instance);

    node.className.should.match(/\bfoo bar divider\b/);
    node.style.height.should.equal('100px');
  });

  it('renders divider not children', () => {
    shouldWarn('Children will not be rendered for dividers');

    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem divider>Some child</MenuItem>
    );
    const node = ReactDOM.findDOMNode(instance);

    node.className.should.match(/\bdivider\b/);
    node.innerHTML.should.not.match(/Some child/);
  });

  it('renders header', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem header>Header Text</MenuItem>
    );
    const node = ReactDOM.findDOMNode(instance);

    node.className.should.match(/\bdropdown-header\b/);
    node.getAttribute('role').should.equal('heading');
    node.innerHTML.should.match(/Header Text/);
  });

  it('renders header className and style', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem header className="foo bar" style={{ height: '100px' }}>
        Header Text
      </MenuItem>
    );
    const node = ReactDOM.findDOMNode(instance);

    node.className.should.match(/\bfoo bar dropdown-header\b/);
    node.style.height.should.equal('100px');
  });

  it('renders menu item link', done => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onKeyDown={() => done()} href="/herpa-derpa">
        Item
      </MenuItem>
    );
    const node = ReactDOM.findDOMNode(instance);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );

    node.getAttribute('role').should.equal('presentation');
    anchor.getAttribute('role').should.equal('menuitem');
    anchor.getAttribute('tabIndex').should.equal('-1');
    anchor.getAttribute('href').should.equal('/herpa-derpa');

    anchor.innerHTML.should.match(/Item/);

    ReactTestUtils.Simulate.keyDown(anchor, { keyCode: 1 });
  });

  it('click handling with onSelect prop', () => {
    const handleSelect = eventKey => {
      eventKey.should.equal('1');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} eventKey="1">
        Item
      </MenuItem>
    );
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );

    ReactTestUtils.Simulate.click(anchor);
  });

  it('click handling with onSelect prop (no eventKey)', () => {
    const handleSelect = eventKey => {
      expect(eventKey).to.be.undefined;
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect}>Item</MenuItem>
    );
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );

    ReactTestUtils.Simulate.click(anchor);
  });

  it('should call custom onClick', () => {
    const handleClick = sinon.spy();
    const handleSelect = sinon.spy();

    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onClick={handleClick} onSelect={handleSelect}>
        Item
      </MenuItem>
    );
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );

    ReactTestUtils.Simulate.click(anchor);

    expect(handleClick).to.have.been.called;
    expect(handleSelect).to.have.been.called;
  });

  it('does not fire onSelect when divider is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} divider />
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      instance,
      'A'
    ).length.should.equal(0);
    const li = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'li');

    ReactTestUtils.Simulate.click(li);
  });

  it('does not fire onSelect when header is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} header>
        Header content
      </MenuItem>
    );
    ReactTestUtils.scryRenderedDOMComponentsWithTag(
      instance,
      'A'
    ).length.should.equal(0);
    const li = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'li');

    ReactTestUtils.Simulate.click(li);
  });

  it('does not pass onClick to DOM node', () => {
    shallow(<MenuItem onSelect={() => {}}>Item</MenuItem>)
      .children()
      .props()
      .should.not.have.property('onSelect');
  });

  it('does not pass onClick to children', () => {
    shallow(<MenuItem onSelect={() => {}}>Item</MenuItem>)
      .find('SafeAnchor')
      .props()
      .should.not.have.property('onSelect');
  });

  it('disabled link', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect event');
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <MenuItem onSelect={handleSelect} disabled>
        Text
      </MenuItem>
    );
    const node = ReactDOM.findDOMNode(instance);
    const anchor = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'A'
    );

    node.className.should.match(/\bdisabled\b/);

    ReactTestUtils.Simulate.click(anchor);
  });

  it('should pass through props', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        style={{ height: 100 }}
      >
        Title
      </MenuItem>
    );

    let node = ReactDOM.findDOMNode(instance);

    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.style.height, '100px');
    assert.equal(node.getAttribute('href'), null);
    assert.equal(node.getAttribute('title'), null);

    let anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'a'
    );

    assert.notOk(anchorNode.className.match(/\btest-class\b/));
    assert.equal(anchorNode.getAttribute('href'), '#hi-mom!');
    assert.equal(anchorNode.getAttribute('title'), 'hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem target="_blank">Title</MenuItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getAttribute('target'), '_blank');
  });

  it('should output an li', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <MenuItem>Title</MenuItem>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'LI');
    assert.equal(
      ReactDOM.findDOMNode(instance).getAttribute('role'),
      'presentation'
    );
  });
});
