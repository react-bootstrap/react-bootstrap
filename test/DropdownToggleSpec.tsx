import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DropdownToggle from '../src/DropdownToggle';
import Dropdown from '../src/Dropdown';

describe('<DropdownToggle>', () => {
  it('renders toggle button', () => {
    render(<DropdownToggle id="test-id">herpa derpa</DropdownToggle>);

    const toggle = screen.getByText('herpa derpa');
    expect(toggle.getAttribute('aria-expanded')).toEqual('false');
    expect(toggle.classList).toContain('dropdown-toggle');
    expect(toggle.classList).toContain('btn');
    expect(toggle.classList).toContain('btn-primary');
  });

  it('renders children', () => {
    render(
      <DropdownToggle id="test-id">
        <h3>herpa derpa</h3>
      </DropdownToggle>,
    );

    expect(screen.getByText('herpa derpa')).toBeDefined();
  });

  it('forwards onClick handler', () => {
    const onClickSpy = vi.fn();

    const { container } = render(
      <DropdownToggle
        id="test-id"
        title="click forwards"
        onClick={onClickSpy}
      />,
    );

    fireEvent.click(container.firstElementChild!);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('forwards id', () => {
    const { container } = render(<DropdownToggle id="testid" />);
    expect(container.firstElementChild!.id).toEqual('testid');
  });

  it('does not forward bsPrefix', () => {
    const { container } = render(
      <DropdownToggle
        bsPrefix="my-custom-bsPrefix"
        title="bsClass"
        id="test-id"
      />,
    );
    expect(container.firstElementChild!.classList).toContain(
      'my-custom-bsPrefix',
    );
    expect(container.firstElementChild!.classList).toContain('btn');
  });
});

describe('DropdownToggle Ctrl+click', () => {
  it('does not open the dropdown on Ctrl+click', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Toggle id="test-id">Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    const toggle = screen.getByText('Toggle');
    expect(container.firstElementChild!.classList).not.toContain('show');

    fireEvent.click(toggle, { ctrlKey: true });
    expect(container.firstElementChild!.classList).not.toContain('show');
  });

  it('does not open the dropdown on Cmd+click (macOS)', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Toggle id="test-id">Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    const toggle = screen.getByText('Toggle');
    fireEvent.click(toggle, { metaKey: true });
    expect(container.firstElementChild!.classList).not.toContain('show');
  });

  it('still opens the dropdown on a plain click', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Toggle id="test-id">Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    const toggle = screen.getByText('Toggle');
    fireEvent.click(toggle);
    expect(container.firstElementChild!.classList).toContain('show');
  });
});
