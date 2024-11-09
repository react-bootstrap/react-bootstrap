import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormControl from '../src/FormControl';
import FormGroup from '../src/FormGroup';

describe('<Feedback>', () => {
  it('should render default success', () => {
    render(
      <FormGroup>
        <FormControl isValid />
        <FormControl.Feedback type="valid" data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('valid-feedback');
  });

  it('should render default error', () => {
    render(
      <FormGroup>
        <FormControl isInvalid />
        <FormControl.Feedback type="invalid" data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('invalid-feedback');
  });

  it('should render custom component', () => {
    class MyComponent extends React.Component {
      render() {
        return <div id="my-component" {...this.props} />;
      }
    }

    render(<FormControl.Feedback as={MyComponent} data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('my-component');
    expect(element.classList).toHaveLength(1);
    expect(element.classList).toContain('valid-feedback');
  });
});
