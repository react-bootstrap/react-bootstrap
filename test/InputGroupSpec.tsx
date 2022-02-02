import { render } from '@testing-library/react';
import { expect } from 'chai';

import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    const { getByTestId } = render(<InputGroup data-testid="test" />);

    getByTestId('test').tagName.toLowerCase().should.equal('div');
  });

  it('Should render size correctly', () => {
    const { getByTestId } = render(<InputGroup size="sm" data-testid="test" />);

    getByTestId('test').classList.contains('input-group-sm').should.be.true;
  });

  it('Should render hasValidation correctly', () => {
    const { getByTestId } = render(
      <InputGroup hasValidation data-testid="test" />,
    );

    getByTestId('test').classList.contains('has-validation').should.be.true;
  });

  describe('<Checkbox>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';

      const { getByRole } = render(<InputGroup.Checkbox name={name} />);

      expect(getByRole('checkbox').getAttribute('name')).to.be.equal(name);
    });
  });

  describe('<Radio>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';

      const { getByRole } = render(<InputGroup.Radio name={name} />);

      expect(getByRole('radio').getAttribute('name')).to.equal(name);
    });
  });
});
