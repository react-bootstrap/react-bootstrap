import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';

import Button from '../src/Button';
import Dropdown from '../src/Dropdown';

describe('<Dropdown.Item>', () => {
  it('renders divider', () => {
    const { getByRole } = render(<Dropdown.Divider />);
    getByRole('separator');
  });

  it('renders divider className and style', () => {
    const { getByRole } = render(
      <Dropdown.Divider className="foo bar" style={{ height: '100px' }} />,
    );

    const node = getByRole('separator');
    node.className.should.match(/\bfoo bar dropdown-divider\b/);
    node.style.height.should.equal('100px');
  });

  it('renders header', () => {
    const { getByRole } = render(
      <Dropdown.Header>Header text</Dropdown.Header>,
    );

    getByRole('heading').textContent!.should.equal('Header text');
  });

  it('renders header className and style', () => {
    const { getByText } = render(
      <Dropdown.Header className="foo bar" style={{ height: '100px' }}>
        Header text
      </Dropdown.Header>,
    );

    const node = getByText('Header text');
    node.className.should.match(/\bfoo bar dropdown-header\b/);
  });

  it('renders Dropdown.ItemText', () => {
    const { getByText } = render(
      <Dropdown.ItemText>My text</Dropdown.ItemText>,
    );

    getByText('My text').className.should.equal('dropdown-item-text');
  });

  it('renders Dropdown.ItemText className and style', () => {
    const { getByText } = render(
      <Dropdown.ItemText className="foo bar" style={{ height: '100px' }}>
        My text
      </Dropdown.ItemText>,
    );

    const node = getByText('My text');
    node.className.should.match(/\bfoo bar dropdown-item-text\b/);
    node.style.height.should.equal('100px');
  });

  it('renders menu item link', () => {
    const onKeyDownSpy = sinon.spy();

    const { getByText } = render(
      <Dropdown.Item onKeyDown={onKeyDownSpy} href="/herpa-derpa">
        Item
      </Dropdown.Item>,
    );

    const node = getByText('Item');
    node.getAttribute('href')!.should.equal('/herpa-derpa');

    fireEvent.keyDown(node, { key: 'a' });
    onKeyDownSpy.should.be.called;
  });

  it('should render as a button when set', () => {
    const { getByTestId } = render(
      <Dropdown.Item as={Button} variant="success" data-testid="item" />,
    );

    getByTestId('item').classList.should.contain([
      'dropdown-item',
      'btn',
      'btn-success',
    ]);
  });

  it('should pass through props', () => {
    const { getByText } = render(
      <Dropdown.Item
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        style={{ height: 100 }}
      >
        Title
      </Dropdown.Item>,
    );

    const node = getByText('Title');
    node.className.should.match(/\btest-class\b/);
    node.style.height.should.equal('100px');
    node.getAttribute('href')!.should.equal('#hi-mom!');
    node.getAttribute('title')!.should.equal('hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    const { getByText } = render(
      <Dropdown.Item target="_blank">Title</Dropdown.Item>,
    );
    getByText('Title').getAttribute('target')!.should.equal('_blank');
  });
});
