import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DropdownButton from '../src/DropdownButton';
import DropdownItem from '../src/DropdownItem';

describe('<DropdownButton>', () => {
  it('renders a toggle with the title prop', () => {
    render(
      <DropdownButton title="Simple Dropdown" data-testid="test-id">
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
        <DropdownItem>Item 4</DropdownItem>
      </DropdownButton>,
    );
    expect(screen.getByTestId('test-id').textContent).toEqual(
      'Simple Dropdown',
    );
  });

  it('renders single DropdownItem child', () => {
    const { getByText } = render(
      <DropdownButton defaultShow title="Single child">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );
    expect(getByText('Item 1')).toBeDefined();
  });

  it('forwards align="end" to the Dropdown', () => {
    const { container } = render(
      <DropdownButton defaultShow align="end" title="blah">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    const menu = container.querySelector('div[x-placement]');
    expect(menu!.classList).toContain('dropdown-menu-end');
  });

  it('passes variant and size to the toggle', () => {
    render(
      <DropdownButton
        title="blah"
        size="sm"
        variant="success"
        data-testid="test-id"
      >
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    const button = screen.getByTestId('test-id').firstElementChild!;
    expect(button.classList).toContain('btn-success');
    expect(button.classList).toContain('btn-sm');
  });

  it('passes menuVariant to dropdown menu', () => {
    const { container } = render(
      <DropdownButton defaultShow title="blah" menuVariant="dark">
        <DropdownItem>Item 1</DropdownItem>
      </DropdownButton>,
    );

    const menu = container.querySelector('div[x-placement]');
    expect(menu!.classList).toContain('dropdown-menu-dark');
  });

  it('forwards onSelect handler to DropdownItems', () => {
    const onSelectSpy = vi.fn();

    render(
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

    fireEvent.click(screen.getByTestId('key1'));
    expect(onSelectSpy).toHaveBeenCalledWith('1', expect.anything());
    fireEvent.click(screen.getByTestId('key2'));
    expect(onSelectSpy).toHaveBeenCalledWith('2', expect.anything());
    fireEvent.click(screen.getByTestId('key3'));
    expect(onSelectSpy).toHaveBeenCalledWith('3', expect.anything());

    expect(onSelectSpy).toBeCalledTimes(3);
  });

  it('does not close when onToggle is controlled', () => {
    const onSelectSpy = vi.fn();

    const { container } = render(
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

    fireEvent.click(screen.getByTestId('test-id').firstElementChild!);
    fireEvent.click(screen.getByTestId('key1'));

    expect(onSelectSpy).toHaveBeenCalledWith(false, expect.anything());
    const menu = container.querySelector('div[x-placement]');
    expect(menu).toBeDefined();
  });

  it('Should pass disabled to button', () => {
    const { container } = render(
      <DropdownButton disabled title="Title">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
        <DropdownItem eventKey="2">Item 2</DropdownItem>
      </DropdownButton>,
    );

    expect(container.querySelector('button[disabled]')).toBeDefined();
  });

  it('should pass bsPrefix to the button', () => {
    render(
      <DropdownButton title="title" data-testid="test-id" bsPrefix="my-button">
        <DropdownItem eventKey="1">Item 1</DropdownItem>
      </DropdownButton>,
    );

    const button = screen.getByTestId('test-id').firstElementChild!;
    expect(button.classList).toContain('my-button-primary');
  });
});
