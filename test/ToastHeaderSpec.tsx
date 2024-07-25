import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Toast from '../src/Toast';

describe('Toast.Header', () => {
  it('will pass all props to the created div and renders its children', () => {
    const { container } = render(
      <Toast.Header>
        <strong>content</strong>
      </Toast.Header>,
    );
    expect(container.firstElementChild!.tagName.toLowerCase()).toEqual('div');

    expect(
      container.firstElementChild!.firstElementChild!.tagName.toLowerCase(),
    ).toEqual('strong');

    expect(
      container.firstElementChild!.classList.contains('toast-header'),
    ).toEqual(true);
  });

  it('should render close button variant', () => {
    const { container } = render(
      <Toast.Header closeButton closeVariant="white">
        <strong>content</strong>
      </Toast.Header>,
    );
    expect(
      container
        .firstElementChild!.getElementsByTagName('button')[0]
        .classList.contains('btn-close-white'),
    ).toEqual(true);
  });
});
