import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import DropdownButton from '../src/DropdownButton';
import DropdownItem from '../src/DropdownItem';

describe('<DropdownButton>', () => {
  it('renders a toggle with the title prop', () => {
    const { getByTestId } = render(
      <DropdownButton title="Simple Dropdown" data-testid="test-id">
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
        <DropdownItem>Item 4</DropdownItem>
      </DropdownButton>,
    );
    getByTestId('test-id').textContent!.should.equal('Simple Dropdown');
  });

  it('renders single DropdownItem child', () => {
    const { getByText } = render(
      <DropdownButton defaultShow title="Single child">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );
    getByText('Item 1');
  });

  it('forwards align="end" to the Dropdown', () => {
    const { container } = render(
      <DropdownButton defaultShow align="end" title="blah">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    const menu = container.querySelector('div[x-placement]');
    menu!.classList.contains('dropdown-menu-end').should.be.true;
  });

  it('passes variant and size to the toggle', () => {
    const { getByTestId } = render(
      <DropdownButton
        title="blah"
        size="sm"
        variant="success"
        data-testid="test-id"
      >
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    const button = getByTestId('test-id').firstElementChild!;
    button.classList.contains('btn-success').should.be.true;
    button.classList.contains('btn-sm').should.be.true;
  });

  it('passes menuVariant to dropdown menu', () => {
    const { container } = render(
      <DropdownButton defaultShow title="blah" menuVariant="dark">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    const menu = container.querySelector('div[x-placement]');
    menu!.classList.contains('dropdown-menu-dark').should.be.true;
  });

  it('forwards onSelect handler to DropdownItems', () => {
    const onSelectSpy = sinon.spy();

    const { getByTestId } = render(
      <DropdownButton
        defaultShow
        title="Simple Dropdown"
        onSelect={onSelectSpy}
      >
        <DropdownItem eventKey="1" data-testid="key1">
          Item 1
        </DropdownItem>
        <DropdownItem eventKey="2" data-testid="key2">
          Item 2
        </DropdownItem>
        <DropdownItem eventKey="3" data-testid="key3">
          Item 3
        </DropdownItem>
      </DropdownButton>,
    );

    fireEvent.click(getByTestId('key1'));
    onSelectSpy.should.be.calledWith('1');
    fireEvent.click(getByTestId('key2'));
    onSelectSpy.should.be.calledWith('2');
    fireEvent.click(getByTestId('key3'));
    onSelectSpy.should.be.calledWith('3');

    onSelectSpy.should.be.calledThrice;
  });

  it('does not close when onToggle is controlled', () => {
    const onSelectSpy = sinon.spy();

    const { container, getByTestId } = render(
      <DropdownButton
        show
        title="Simple Dropdown"
        onToggle={onSelectSpy}
        data-testid="test-id"
      >
        <DropdownItem eventKey="1" data-testid="key1">
          Item 1
        </DropdownItem>
      </DropdownButton>,
    );

    fireEvent.click(getByTestId('test-id').firstElementChild!);
    fireEvent.click(getByTestId('key1'));

    onSelectSpy.should.have.been.calledWith(false);
    const menu = container.querySelector('div[x-placement]');
    menu!.should.exist;
  });

  it('Should pass disabled to button', () => {
    const { container } = render(
      <DropdownButton disabled title="Title">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
        <DropdownItem eventKey="2">Item 2</DropdownItem>
      </DropdownButton>,
    );

    container.querySelector('button[disabled]')!.should.exist;
  });

  it('should pass bsPrefix to the button', () => {
    const { getByTestId } = render(
      <DropdownButton title="title" data-testid="test-id" bsPrefix="my-button">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </DropdownButton>,
    );

    const button = getByTestId('test-id').firstElementChild!;
    button.classList.contains('my-button-primary').should.be.true;
  });
});
