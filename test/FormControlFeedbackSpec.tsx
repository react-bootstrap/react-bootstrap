import { render } from '@testing-library/react';
import React from 'react';

import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<Feedback>', () => {
  it('should render default success', () => {
    const { getByTestId } = render(
      <FormGroup>
        <FormControl isValid />
        <FormControl.Feedback type="valid" data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(1);
    element.classList.contains('valid-feedback').should.be.true;
  });

  it('should render default error', () => {
    const { getByTestId } = render(
      <FormGroup>
        <FormControl isInvalid />
        <FormControl.Feedback type="invalid" data-testid="test-id" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.classList.length.should.equal(1);
    element.classList.contains('invalid-feedback').should.be.true;
  });

  it('should render custom component', () => {
    class MyComponent extends React.Component {
      render() {
        return <div id="my-component" {...this.props} />;
      }
    }

    const { getByTestId } = render(
      <FormControl.Feedback as={MyComponent} data-testid="test-id" />,
    );

    const element = getByTestId('test-id');
    element.id.should.equal('my-component');
    element.classList.length.should.equal(1);
    element.classList.contains('valid-feedback').should.be.true;
  });
});
