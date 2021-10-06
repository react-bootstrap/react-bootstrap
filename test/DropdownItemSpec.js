import { mount } from 'enzyme';

import Button from '../src/Button';
import Dropdown from '../src/Dropdown';

describe('<Dropdown.Item>', () => {
  it('renders divider', () => {
    mount(<Dropdown.Divider />).assertSingle(
      'hr.dropdown-divider[role="separator"]',
    );
  });

  it('renders divider className and style', () => {
    const node = mount(
      <Dropdown.Divider className="foo bar" style={{ height: '100px' }} />,
    ).getDOMNode();

    node.className.should.match(/\bfoo bar dropdown-divider\b/);
    node.style.height.should.equal('100px');
  });

  it('renders header', () => {
    mount(<Dropdown.Header>Header text</Dropdown.Header>)
      .assertSingle('div.dropdown-header[role="heading"]')
      .text()
      .should.equal('Header text');
  });

  it('renders header className and style', () => {
    const node = mount(
      <Dropdown.Header className="foo bar" style={{ height: '100px' }}>
        Header text
      </Dropdown.Header>,
    ).getDOMNode();

    node.className.should.match(/\bfoo bar dropdown-header\b/);
    node.style.height.should.equal('100px');
  });

  it('renders Dropdown.ItemText', () => {
    mount(<Dropdown.ItemText>My text</Dropdown.ItemText>)
      .assertSingle('span.dropdown-item-text')
      .text()
      .should.equal('My text');
  });

  it('renders Dropdown.ItemText className and style', () => {
    const node = mount(
      <Dropdown.ItemText className="foo bar" style={{ height: '100px' }}>
        My text
      </Dropdown.ItemText>,
    ).getDOMNode();

    node.className.should.match(/\bfoo bar dropdown-item-text\b/);
    node.style.height.should.equal('100px');
  });

  it('renders menu item link', (done) => {
    mount(
      <Dropdown.Item onKeyDown={() => done()} href="/herpa-derpa">
        Item
      </Dropdown.Item>,
    )
      .assertSingle('a.dropdown-item[href="/herpa-derpa"]')
      .tap((a) => a.text().should.equal('Item'))
      .simulate('keyDown', { key: 'a' });
  });

  it('should render as a button when set', () => {
    mount(<Dropdown.Item as={Button} variant="success" />).assertSingle(
      'button.dropdown-item.btn-success',
    );
  });

  it('should pass through props', () => {
    let node = mount(
      <Dropdown.Item
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        style={{ height: 100 }}
      >
        Title
      </Dropdown.Item>,
    ).getDOMNode();

    assert(node.className.match(/\btest-class\b/));
    assert.equal(node.style.height, '100px');
    assert.equal(node.getAttribute('href'), '#hi-mom!');
    assert.equal(node.getAttribute('title'), 'hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    let anchor = mount(<Dropdown.Item target="_blank">Title</Dropdown.Item>)
      .find('a')
      .getDOMNode();

    assert.equal(anchor.getAttribute('target'), '_blank');
  });
});
