import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormSelect from '../src/FormSelect';
import FormGroup from '../src/FormGroup';

describe('<FormSelect>', () => {
  it('should render correctly', () => {
    render(
      <FormSelect data-testid="test-id" name="bar" className="my-control" />,
    );

    const element = screen.getByTestId('test-id');
    expect(element.tagName).toEqual('SELECT');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('my-control');
    expect(element.classList).toContain('form-select');
    expect(element.getAttribute('name')).toEqual('bar');
  });

  it('should render size correctly', () => {
    render(<FormSelect size="lg" data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-select-lg');
  });

  it('should render htmlSize correctly', () => {
    render(<FormSelect htmlSize={3} data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.getAttribute('size')).toEqual('3');
  });

  it('should render isValid correctly', () => {
    render(<FormSelect isValid data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('is-valid');
  });

  it('should render isInvalid correctly', () => {
    render(<FormSelect isInvalid data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('is-invalid');
  });

  it('should render controlId correctly', () => {
    render(
      <FormGroup controlId="control-id">
        <FormSelect data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('control-id');
  });

  it('should override controlId correctly', () => {
    render(
      <FormGroup controlId="control-id">
        <FormSelect id="overridden-id" data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('overridden-id');
  });
});
