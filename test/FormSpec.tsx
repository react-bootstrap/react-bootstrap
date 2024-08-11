import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Form from '../src/Form';
import FormGroup from '../src/FormGroup';

describe('<Form>', () => {
  it('should support custom `as`', () => {
    render(
      <Form as="fieldset" className="my-form" data-testid="test">
        <FormGroup />
      </Form>,
    );

    const form = screen.getByTestId('test');
    expect(form.tagName).toEqual('FIELDSET');
    expect(form.classList).toHaveLength(1);
    expect(form.classList).toContain('my-form');
    expect(form.childElementCount).toEqual(1);
    expect(form.firstElementChild?.classList).toHaveLength(0);
  });

  it('Should have form as default component', () => {
    render(<Form data-testid="test" />);

    const form = screen.getByTestId('test');
    expect(form.tagName).toEqual('FORM');
  });

  it('should have form class `was-validated` if validated', () => {
    render(<Form validated data-testid="test" />);

    const form = screen.getByTestId('test');
    expect(form.classList).toHaveLength(1);
    expect(form.classList).toContain('was-validated');
  });
});
