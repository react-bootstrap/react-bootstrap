import { render } from '@testing-library/react';

import FormSelect from '../src/FormSelect';
import FormGroup from '../src/FormGroup';

describe('<FormSelect>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormSelect data-testid="test-id" name="bar" className="my-control" />,
    );

    const element = getByTestId('test-id');
    element.tagName.toLowerCase().should.equal('select');
    element.classList.length.should.equal(2);
    element.classList.contains('my-control').should.be.true;
    element.classList.contains('form-select').should.be.true;
    element.getAttribute('name')!.should.equal('bar');
  });

  it('should render size correctly', () => {
    const { getByTestId } = render(
      <FormSelect size="lg" data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('form-select-lg').should.be.true;
  });

  it('should render htmlSize correctly', () => {
    const { getByTestId } = render(
      <FormSelect htmlSize={3} data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.getAttribute('size')!.should.equal('3');
  });

  it('should render isValid correctly', () => {
    const { getByTestId } = render(
      <FormSelect isValid data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('is-valid').should.be.true;
  });

  it('should render isInvalid correctly', () => {
    const { getByTestId } = render(
      <FormSelect isInvalid data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(2);
    element.classList.contains('is-invalid').should.be.true;
  });

  it('should render controlId correctly', () => {
    const { getByTestId } = render(
      <FormGroup controlId="controll-id">
        <FormSelect data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.id.should.equal('controll-id');
  });

  it('should override controlId correctly', () => {
    const { getByTestId } = render(
      <FormGroup controlId="controll-id">
        <FormSelect id="overridden-id" data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.id.should.equal('overridden-id');
  });
});
