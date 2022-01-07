import { render } from '@testing-library/react';

import Toast from '../src/Toast';

describe('Toast.Header', () => {
  it('will pass all props to the created div and renders its children', () => {
    const { container } = render(
      <Toast.Header>
        <strong>content</strong>
      </Toast.Header>,
    );
    container.firstElementChild!.tagName.toLowerCase().should.equal('div');

    container
      .firstElementChild!.firstElementChild!.tagName.toLowerCase()
      .should.equal('strong');

    container.firstElementChild!.classList.contains('toast-header').should.be
      .true;
  });

  it('should render close button variant', () => {
    const { container } = render(
      <Toast.Header closeButton closeVariant="white">
        <strong>content</strong>
      </Toast.Header>,
    );
    container
      .firstElementChild!.getElementsByTagName('button')[0]
      .classList.contains('btn-close-white').should.be.true;
  });
});
