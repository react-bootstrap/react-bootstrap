import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Toast from '../src/Toast';

describe('Toast.Body', () => {
  it('will pass all props to the created div and renders its children', () => {
    const content = <strong>Content</strong>;
    const { container } = render(
      <Toast.Body className="custom-class">{content}</Toast.Body>,
    );
    expect(container.firstElementChild!.classList).toContain('custom-class');
    expect(container.firstElementChild!.classList).toContain('toast-body');
  });
});
