import React from 'react';
import { mount } from 'enzyme';

import Button from '../src/Button';
import DropdownItem from '../src/DropdownItem';

import { shouldWarn } from './helpers';

describe('<DropdownItem>', () => {
  it('renders divider', () => {
    mount(<DropdownItem divider />).assertSingle(
      'div.dropdown-divider[role="separator"]'
    );
  });

  it('renders divider className and style', () => {
    const node = mount(
      <DropdownItem divider className="foo bar" style={{ height: '100px' }} />
    ).getDOMNode();

    node.className.should.match(/\bfoo bar dropdown-divider\b/);
    node.style.height.should.equal('100px');
  });

  it('renders divider not children', () => {
    shouldWarn('Children will not be rendered for dividers');

    const node = mount(
      <DropdownItem divider>Some child</DropdownItem>
    ).getDOMNode();

    node.className.should.match(/\bdropdown-divider\b/);
    node.innerHTML.should.not.match(/Some child/);
  });

  it('renders header', () => {
    mount(<DropdownItem header>Header text</DropdownItem>)
      .assertSingle('div.dropdown-header[role="heading"]')
      .text()
      .should.equal('Header text');
  });

  it('renders header className and style', () => {
    const node = mount(
      <DropdownItem header className="foo bar" style={{ height: '100px' }}>
        Header text
      </DropdownItem>
    ).getDOMNode();

    node.className.should.match(/\bfoo bar dropdown-header\b/);
    node.style.height.should.equal('100px');
  });

  it('renders menu item link', done => {
    mount(
      <DropdownItem onKeyDown={() => done()} href="/herpa-derpa">
        Item
      </DropdownItem>
    )
      .assertSingle('a.dropdown-item[href="/herpa-derpa"]')
      .tap(a => a.text().should.equal('Item'))
      .simulate('keyDown', { key: 'a' });
  });

  it('should render as a button when set', () => {
    mount(<DropdownItem as={Button} variant="success" />).assertSingle(
      'button.dropdown-item.btn-success'
    );
  });

  it('click handling with onSelect prop', done => {
    const handleSelect = eventKey => {
      eventKey.should.equal('1');
      done();
    };
    mount(
      <DropdownItem onSelect={handleSelect} eventKey="1">
        Item
      </DropdownItem>
    ).simulate('click');
  });

  it('click handling with onSelect prop (no eventKey)', done => {
    const handleSelect = eventKey => {
      expect(eventKey).to.not.exist;
      done();
    };
    mount(<DropdownItem onSelect={handleSelect}>Item</DropdownItem>).simulate(
      'click'
    );
  });

  it('should call custom onClick', () => {
    const handleClick = sinon.spy();
    const handleSelect = sinon.spy();

    mount(
      <DropdownItem onClick={handleClick} onSelect={handleSelect}>
        Item
      </DropdownItem>
    ).simulate('click');

    expect(handleClick).to.have.been.called;
    expect(handleSelect).to.have.been.called;
  });

  it('does not fire onSelect when divider is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with divider flag applied');
    };

    mount(<DropdownItem onSelect={handleSelect} divider />)
      .simulate('click')
      .assertNone('a');
  });

  it('does not fire onSelect when header is clicked', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect with header flag applied');
    };

    mount(
      <DropdownItem onSelect={handleSelect} header>
        Header content
      </DropdownItem>
    )
      .simulate('click')
      .assertNone('a');
  });

  it('does not pass onClick to DOM node', () => {
    mount(<DropdownItem onSelect={() => {}}>Item</DropdownItem>)
      .find('a')
      .props()
      .should.not.have.property('onSelect');
  });

  it('does not pass onClick to children', () => {
    mount(<DropdownItem onSelect={() => {}}>Item</DropdownItem>)
      .find('SafeAnchor')
      .props()
      .should.not.have.property('onSelect');
  });

  it('disabled link', () => {
    const handleSelect = () => {
      throw new Error('Should not invoke onSelect event');
    };
    mount(
      <DropdownItem onSelect={handleSelect} disabled>
        Text
      </DropdownItem>
    )
      .assertSingle('a.disabled')
      .simulate('click');
  });

  it('should pass through props', () => {
    let node = mount(
      <DropdownItem
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        style={{ height: 100 }}
      >
        Title
      </DropdownItem>
    ).getDOMNode();

    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.style.height, '100px');
    assert.equal(node.getAttribute('href'), '#hi-mom!');
    assert.equal(node.getAttribute('title'), 'hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    let anchor = mount(<DropdownItem target="_blank">Title</DropdownItem>)
      .find('a')
      .getDOMNode();

    assert.equal(anchor.getAttribute('target'), '_blank');
  });
});
