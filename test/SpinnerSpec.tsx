import { render } from '@testing-library/react';

import Spinner from '../src/Spinner';

describe('<Spinner>', () => {
  it('Should render a basic spinner correctly', () => {
    const { getByTestId } = render(
      <Spinner data-testid="test" animation="border" />,
    );
    getByTestId('test').classList.contains('spinner-border').should.be.true;
  });

  it('Should render a spinner with a custom element, variant and size ', () => {
    const { getByTestId } = render(
      <Spinner
        data-testid="test"
        as="span"
        animation="grow"
        variant="primary"
        size="sm"
      />,
    );
    const spinnerElem = getByTestId('test');

    spinnerElem.tagName.toLowerCase().should.equal('span');
    spinnerElem.classList.contains('spinner-grow').should.be.true;
    spinnerElem.classList.contains('spinner-grow-sm').should.be.true;
    spinnerElem.classList.contains('text-primary').should.be.true;
  });

  it('Should render a spinner with other properties', () => {
    const { getByTestId } = render(
      <Spinner data-testid="test" animation="grow" role="status" />,
    );
    const spinnerElem = getByTestId('test');

    spinnerElem.classList.contains('spinner-grow').should.be.true;
    spinnerElem.getAttribute('role')!.should.equal('status');
  });

  it('Should render child elements', () => {
    const { getByTestId } = render(
      <Spinner data-testid="test" animation="grow">
        <span id="testChild" />
      </Spinner>,
    );
    const spinnerElem = getByTestId('test');
    spinnerElem.children.length.should.equal(1);
  });

  it('Should have div as default component', () => {
    const { getByTestId } = render(
      <Spinner data-testid="test" animation="border" />,
    );
    const spinnerElem = getByTestId('test');
    spinnerElem.tagName.toLowerCase().should.equal('div');
  });
});
