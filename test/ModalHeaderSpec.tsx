import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ModalHeader from '../src/ModalHeader';

describe('ModalHeader', () => {
  it('uses "div" by default', () => {
    render(
      <ModalHeader data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </ModalHeader>,
    );

    expect(screen.getByTestId('test-modal').tagName).toEqual('DIV');
    expect(screen.getByTestId('test-modal').classList).toContain(
      'modal-header',
    );
    expect(screen.getByTestId('test-modal').classList).toContain(
      'custom-class',
    );
    expect(
      screen.getByTestId('test-modal').querySelector('strong')!.textContent,
    ).toEqual('Content');
  });

  it('has closeButton without a containing Modal and renders', () => {
    render(<ModalHeader data-testid="test-modal" closeButton />);

    expect(screen.getByTestId('test-modal').tagName).toEqual('DIV');
    expect(
      screen.getByTestId('test-modal').querySelector('button'),
    ).toBeDefined();
  });

  it('Should trigger onHide when modal is closed', () => {
    const onHideSpy = vi.fn();
    render(
      <ModalHeader data-testid="test-modal" closeButton onHide={onHideSpy} />,
    );

    fireEvent.click(screen.getByTestId('test-modal').querySelector('button')!);
    expect(onHideSpy).toHaveBeenCalledOnce();
  });

  it('should render close button variant', () => {
    render(
      <ModalHeader data-testid="test-modal" closeButton closeVariant="white" />,
    );

    const button = screen.getByTestId('test-modal').querySelector('button')!;

    expect(button).toBeDefined();
    expect(button.classList).toContain('btn-close-white');
  });
});
