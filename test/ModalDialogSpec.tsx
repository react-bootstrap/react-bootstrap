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
});
