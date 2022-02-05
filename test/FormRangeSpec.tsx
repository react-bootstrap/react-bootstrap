import { render } from '@testing-library/react';

import FormRange from '../src/FormRange';
import FormGroup from '../src/FormGroup';

describe('<FormRange>', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FormRange
        id="foo"
        name="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );
    const element = getByTestId('test-id');
    element.tagName.toLowerCase().should.equal('input');
    element.id.should.equal('foo');
    element.classList.length.should.equal(2);
    element.classList.contains('form-range').should.be.true;
    element.classList.contains('my-control').should.be.true;
    element.getAttribute('name')!.should.equal('bar');
    element.getAttribute('type')!.should.equal('range');
  });

  it('should render controlId as id correctly', () => {
    const { getByTestId } = render(
      <FormGroup controlId="controll-id">
        <FormRange data-testid="test-id" />
      </FormGroup>,
    );
    const element = getByTestId('test-id');
    element.id.should.equal('controll-id');
  });

  it('should override controlId correctly', () => {
    const { getByTestId } = render(
      <FormGroup controlId="controll-id">
        <FormRange id="overridden-id" data-testid="test-id" />
      </FormGroup>,
    );
    const element = getByTestId('test-id');
    element.id.should.equal('overridden-id');
  });
});
