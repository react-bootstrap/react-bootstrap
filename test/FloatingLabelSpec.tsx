import { render } from '@testing-library/react';
import { expect } from 'chai';

import FloatingLabel from '../src/FloatingLabel';
import Form from '../src/Form';

describe('<FloatingLabel>', () => {
  it('should render correctly', () => {
    const { getByText, getByRole, getByTestId } = render(
      <FloatingLabel label="MyLabel" data-testid="test">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    getByTestId('test').classList.contains('form-floating').should.be.true;
    getByText('MyLabel').should.exist;
    getByRole('textbox').should.exist;
  });

  it('should pass controlId to input and label', () => {
    const { getByRole, getByText } = render(
      <FloatingLabel label="MyLabel" controlId="MyId">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    expect(getByRole('textbox').getAttribute('id')).to.be.equal('MyId');
    expect(getByText('MyLabel').getAttribute('for')).to.be.equal('MyId');
  });

  it('should support "as"', () => {
    const { getByTestId } = render(
      <FloatingLabel label="MyLabel" as="span" data-testid="test">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    const label = getByTestId('test');
    label.tagName.toLowerCase().should.be.equal('span');
    label.classList.contains('form-floating').should.be.true;
  });
});
