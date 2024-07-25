import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormRange from '../src/FormRange';
import FormGroup from '../src/FormGroup';

describe('<FormRange>', () => {
  it('should render correctly', () => {
    render(
      <FormRange
        id="foo"
        name="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );
    const element = screen.getByTestId('test-id');
    expect(element.tagName).toEqual('INPUT');
    expect(element.id).toEqual('foo');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-range');
    expect(element.classList).toContain('my-control');
    expect(element.getAttribute('name')).toEqual('bar');
    expect(element.getAttribute('type')).toEqual('range');
  });

  it('should render controlId as id correctly', () => {
    render(
      <FormGroup controlId="control-id">
        <FormRange data-testid="test-id" />
      </FormGroup>,
    );
    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('control-id');
  });

  it('should override controlId correctly', () => {
    render(
      <FormGroup controlId="control-id">
        <FormRange id="overridden-id" data-testid="test-id" />
      </FormGroup>,
    );
    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('overridden-id');
  });
});
