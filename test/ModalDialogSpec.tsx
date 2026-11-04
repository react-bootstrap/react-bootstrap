import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ModalDialog from '../src/ModalDialog';

describe('<ModalDialog>', () => {
  it('keeps the default element, classes, content and ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <ModalDialog
        ref={ref}
        data-testid="dialog"
        className="custom-dialog"
        contentClassName="custom-content"
        centered
        scrollable
        size="lg"
        fullscreen="sm-down"
      >
        <strong>Content</strong>
      </ModalDialog>,
    );
    const dialog = getByTestId('dialog');
    expect(dialog.tagName).toEqual('DIV');
    expect(ref.current).toEqual(dialog);
    for (const className of [
      'modal-dialog',
      'custom-dialog',
      'modal-dialog-centered',
      'modal-dialog-scrollable',
      'modal-lg',
      'modal-fullscreen-sm-down',
    ]) {
      expect(dialog.classList).toContain(className);
    }
    expect(dialog.querySelector('.modal-content')!.classList).toContain(
      'custom-content',
    );
    expect(dialog.querySelector('strong')!.textContent).toEqual('Content');
  });

  it('renders the element requested by as', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <ModalDialog as="section" ref={ref} data-testid="dialog">
        <strong>Content</strong>
      </ModalDialog>,
    );
    const dialog = getByTestId('dialog');
    expect(dialog.tagName).toEqual('SECTION');
    expect(dialog.hasAttribute('as')).toBe(false);
    expect(dialog.classList).toContain('modal-dialog');
    expect(ref.current).toEqual(dialog);
    expect(dialog.querySelector('.modal-content strong')!.textContent).toEqual(
      'Content',
    );
  });

  it('renders a custom component and forwards its props and ref', () => {
    const CustomDialog = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >((props, ref) => <div {...props} ref={ref} data-custom-dialog="true" />);
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <ModalDialog
        as={CustomDialog}
        ref={ref}
        data-testid="dialog"
        className="custom-class"
        title="Dialog title"
      >
        <strong>Content</strong>
      </ModalDialog>,
    );
    const dialog = getByTestId('dialog');
    expect(dialog.getAttribute('data-custom-dialog')).toEqual('true');
    expect(dialog.getAttribute('title')).toEqual('Dialog title');
    expect(dialog.hasAttribute('as')).toBe(false);
    expect(dialog.classList).toContain('modal-dialog');
    expect(dialog.classList).toContain('custom-class');
    expect(ref.current).toEqual(dialog);
    expect(dialog.querySelector('.modal-content strong')!.textContent).toEqual(
      'Content',
    );
  });
});
