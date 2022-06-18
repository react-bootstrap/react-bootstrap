import { render } from '@testing-library/react';

import Feedback from '../src/Feedback';

describe('<Feedback>', () => {
  it('Should have div as default component', () => {
    const { getByTestId } = render(<Feedback data-testid="test" />);

    getByTestId('test').tagName.toLowerCase().should.equal('div');
  });

  it('Should render valid feedback', () => {
    const { getByTestId } = render(
      <Feedback type="valid" data-testid="test" />,
    );

    getByTestId('test').classList.contains('valid-feedback').should.be.true;
  });

  it('Should render invalid feedback', () => {
    const { getByTestId } = render(
      <Feedback type="invalid" data-testid="test" />,
    );

    getByTestId('test').classList.contains('invalid-feedback').should.be.true;
  });

  it('Should render valid feedback tooltip', () => {
    const { getByTestId } = render(
      <Feedback type="valid" tooltip data-testid="test" />,
    );

    getByTestId('test').classList.contains('valid-tooltip').should.be.true;
  });

  it('Should render invalid feedback tooltip', () => {
    const { getByTestId } = render(
      <Feedback type="invalid" tooltip data-testid="test" />,
    );

    getByTestId('test').classList.contains('invalid-tooltip').should.be.true;
  });
});
