import { render } from '@testing-library/react';

import Form from '../src/Form';
import FormGroup from '../src/FormGroup';

describe('<Form>', () => {
  it('should support custom `as`', () => {
    const { getByTestId } = render(
      <Form as="fieldset" className="my-form" data-testid="test">
        <FormGroup />
      </Form>,
    );

    const form = getByTestId('test');
    form.tagName.toLowerCase().should.equal('fieldset');
    form.classList.length.should.equal(1);
    form.classList.contains('my-form').should.be.true;
    form.childElementCount.should.equal(1);
    form.firstElementChild?.classList.length.should.equal(0);
  });

  it('Should have form as default component', () => {
    const { getByTestId } = render(<Form data-testid="test" />);

    const form = getByTestId('test');
    form.tagName.toLowerCase().should.equal('form');
  });

  it('should have form class `was-validated` if validated', () => {
    const { getByTestId } = render(<Form validated data-testid="test" />);

    const form = getByTestId('test');
    form.classList.length.should.equal(1);
    form.classList.contains('was-validated').should.be.true;
  });
});
