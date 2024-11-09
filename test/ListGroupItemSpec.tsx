import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ListGroupItem from '../src/ListGroupItem';

describe('<ListGroupItem>', () => {
  it('should output a div', () => {
    render(<ListGroupItem data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.tagName).toEqual('DIV');
    expect(item.classList).toContain('list-group-item');
  });

  it('accepts variants', () => {
    render(<ListGroupItem variant="success" data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('list-group-item');
    expect(item.classList).toContain('list-group-item-success');
  });

  it('accepts active', () => {
    render(<ListGroupItem active data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('list-group-item');
    expect(item.classList).toContain('active');
  });

  it('accepts disabled', () => {
    render(<ListGroupItem disabled data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.classList).toContain('list-group-item');
    expect(item.classList).toContain('disabled');
  });

  it('accepts as prop', () => {
    render(<ListGroupItem as="span" data-testid="test" />);

    const item = screen.getByTestId('test');
    expect(item.tagName).toEqual('SPAN');
    expect(item.classList).toContain('list-group-item');
  });

  it('should not be focusable when disabled', () => {
    render(<ListGroupItem disabled data-testid="test" />);

    expect(screen.getByTestId('test').getAttribute('tabindex')).toEqual('-1');
  });

  it('should respect user-specified tabIndex', () => {
    render(<ListGroupItem disabled tabIndex={4} data-testid="test" />);

    expect(screen.getByTestId('test').getAttribute('tabindex')).toEqual('4');
  });

  describe('actions', () => {
    it('renders a button', () => {
      render(<ListGroupItem action data-testid="test" />);

      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('BUTTON');
      expect(item.classList).toContain('list-group-item-action');
    });

    it('renders an anchor', () => {
      render(<ListGroupItem action href="/foo" data-testid="test" />);

      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('A');
      expect(item.classList).toContain('list-group-item-action');
      expect(item.getAttribute('href')).to.be.equal('/foo');
    });

    it('renders a div and show warning', () => {
      render(<ListGroupItem action={false} href="/foo" data-testid="test" />);

      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('DIV');
      expect(item.classList).not.toContain('list-group-item-action');
      expect(item.getAttribute('href')).toEqual('/foo');
    });

    it('passes href to custom as components', () => {
      render(
        <ListGroupItem
          as="div"
          action={false}
          data-testid="test"
          href="/foo"
        />,
      );
      const item = screen.getByTestId('test');
      expect(item.tagName).toEqual('DIV');
      expect(item.classList).not.toContain('list-group-item-action');
      expect(item.getAttribute('href')).toEqual('/foo');
    });
  });

  describe('onClick', () => {
    it('Should call on click', () => {
      const onClickSpy = vi.fn();

      render(<ListGroupItem onClick={onClickSpy} data-testid="test" />);

      fireEvent.click(screen.getByTestId('test'));
      expect(onClickSpy).toHaveBeenCalledOnce();
    });

    it('Should not call if disabled', () => {
      const onClickSpy = vi.fn();

      render(
        <ListGroupItem onClick={onClickSpy} disabled data-testid="test" />,
      );

      fireEvent.click(screen.getByTestId('test'));
      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });
});
