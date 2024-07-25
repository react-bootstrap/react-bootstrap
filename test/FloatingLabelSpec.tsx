import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FloatingLabel from '../src/FloatingLabel';
import Form from '../src/Form';

describe('<FloatingLabel>', () => {
  it('should render correctly', () => {
    render(
      <FloatingLabel label="MyLabel" data-testid="test">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    expect(screen.getByTestId('test').classList).toContain('form-floating');
    expect(screen.getByText('MyLabel')).toBeDefined();
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  it('should pass controlId to input and label', () => {
    render(
      <FloatingLabel label="MyLabel" controlId="MyId">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    expect(screen.getByRole('textbox').getAttribute('id')).toEqual('MyId');
    expect(screen.getByText('MyLabel').getAttribute('for')).toEqual('MyId');
  });

  it('should support "as"', () => {
    render(
      <FloatingLabel label="MyLabel" as="span" data-testid="test">
        <Form.Control type="text" />
      </FloatingLabel>,
    );

    const label = screen.getByTestId('test');
    expect(label.tagName).toEqual('SPAN');
    expect(label.classList).toContain('form-floating');
  });
});
