import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', () => {
    const { container } = render(<Breadcrumb id="custom-id" />);

    expect(container.querySelectorAll('#custom-id').length).toEqual(1);
  });

  it('Should have breadcrumb class inside ol', () => {
    render(<Breadcrumb />);

    expect(screen.getByRole('list').classList.contains('breadcrumb')).toEqual(
      true,
    );
  });

  it('Should have custom classes', () => {
    render(<Breadcrumb className="custom-one custom-two" data-testid="test" />);

    const breadcrumb = screen.getByTestId('test');
    expect(breadcrumb.classList.contains('custom-one')).toEqual(true);
    expect(breadcrumb.classList.contains('custom-two')).toEqual(true);
  });

  it('Should not have a navigation role', () => {
    const { container } = render(
      <Breadcrumb className="custom-one custom-two" />,
    );

    expect(container.querySelectorAll('ol[role="navigation"]').length).toEqual(
      0,
    );
  });

  it('Should have an aria-label in ol', () => {
    render(<Breadcrumb className="custom-one custom-two" />);
    expect(screen.getByLabelText('breadcrumb')).toBeTruthy();
  });

  it('Should have nav as default component', () => {
    render(<Breadcrumb data-testid="test" />);

    expect(screen.getByTestId('test').tagName.toLowerCase()).toEqual('nav');
  });
});
