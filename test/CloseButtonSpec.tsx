import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CloseButton from '../src/CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    render(<CloseButton />);

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('Should have type=button by default', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button').getAttribute('type')).toEqual('button');
  });

  it('Should have class .btn-close', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button').classList).toContain('btn-close');
  });

  it('Should call onClick callback', () => {
    const onClickSpy = vi.fn();

    render(<CloseButton onClick={onClickSpy} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toHaveBeenCalledOnce();
  });

  it('Should have a aria-label defaulted to "Close"', () => {
    render(<CloseButton />);

    expect(
      screen.getByLabelText('Close', { selector: '[aria-label]' }),
    ).toBeTruthy();
  });

  it('Should allow override of aria-label', () => {
    render(<CloseButton aria-label="My Close" />);

    expect(
      screen.getByLabelText('My Close', { selector: '[aria-label]' }),
    ).toBeTruthy();
  });
});
