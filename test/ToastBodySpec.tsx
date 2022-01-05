import * as React from 'react';
import { render } from '@testing-library/react';
import Toast from '../src/Toast';

describe('Toast.Body', () => {
  it('will pass all props to the created div and renders its children', () => {
    const content = <strong>Content</strong>;
    const { container } = render(
      <Toast.Body className="custom-class">{content}</Toast.Body>,
    );
    container.firstElementChild!.classList.contains('custom-class').should.be
      .true;
    container.firstElementChild!.classList.contains('toast-body').should.be
      .true;
  });
});
