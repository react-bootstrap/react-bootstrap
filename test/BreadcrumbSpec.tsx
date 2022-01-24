import { render } from '@testing-library/react';

import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', () => {
    const { container } = render(<Breadcrumb id="custom-id" />);

    container.querySelectorAll('#custom-id').length.should.equal(1);
  });

  it('Should have breadcrumb class inside ol', () => {
    const { getByRole } = render(<Breadcrumb />);

    getByRole('list').classList.contains('breadcrumb').should.be.true;
  });

  it('Should have custom classes', () => {
    const { getByTestId } = render(
      <Breadcrumb className="custom-one custom-two" data-testid="test" />,
    );

    const breadcrumb = getByTestId('test');
    breadcrumb.classList.contains('custom-one').should.be.true;
    breadcrumb.classList.contains('custom-two').should.be.true;
  });

  it('Should not have a navigation role', () => {
    const { container } = render(
      <Breadcrumb className="custom-one custom-two" />,
    );

    container.querySelectorAll('ol[role="navigation"]').length.should.equal(0);
  });

  it('Should have an aria-label in ol', () => {
    const { getByLabelText } = render(
      <Breadcrumb className="custom-one custom-two" />,
    );
    getByLabelText('breadcrumb').should.exist;
  });

  it('Should have nav as default component', () => {
    const { getByTestId } = render(<Breadcrumb data-testid="test" />);

    getByTestId('test').tagName.toLowerCase().should.equal('nav');
  });
});
