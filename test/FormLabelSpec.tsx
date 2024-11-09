import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

describe('<FormLabel>', () => {
  it('should render correctly', () => {
    render(
      <FormLabel
        id="foo"
        htmlFor="bar"
        className="my-control"
        data-testid="test-id"
      />,
    );

    const element = screen.getByTestId('test-id');
    expect(element.tagName).toEqual('LABEL');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-label');
    expect(element.classList).toContain('my-control');
    expect(element.id).toEqual('foo');
    expect(element.getAttribute('for')).not.toBeNull();
  });

  it('should use controlId for htmlFor', () => {
    render(
      <FormGroup controlId="foo">
        <FormLabel data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.getAttribute('for')).toEqual('foo');
  });

  it('should render as a Col', () => {
    render(
      <FormLabel column sm={4} data-testid="test-id">
        Label
      </FormLabel>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(3);
    expect(element.classList).toContain('form-label');
    expect(element.classList).toContain('col-form-label');
    expect(element.classList).toContain('col-sm-4');
  });

  it('should use controlId for htmlFor when render as Col', () => {
    render(
      <FormGroup controlId="foo">
        <FormLabel column sm={4} data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(3);
    expect(element.classList).toContain('form-label');
    expect(element.classList).toContain('col-form-label');
    expect(element.classList).toContain('col-sm-4');
    expect(element.getAttribute('for')).toEqual('foo');
  });

  it('should respect visuallyHidden', () => {
    render(
      <FormLabel visuallyHidden data-testid="test-id">
        Label
      </FormLabel>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('visually-hidden');
  });

  it('should prefer explicit htmlFor', () => {
    render(
      <FormGroup controlId="foo">
        <FormLabel htmlFor="bar" data-testid="test-id" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.getAttribute('for')).toEqual('bar');
  });

  it('should support ref forwarding', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    expect(input.tagName).toEqual('LABEL');
  });

  it('should support ref forwarding when rendered as a Col', () => {
    let input;
    class Container extends React.Component {
      render() {
        return (
          <FormGroup controlId="foo">
            <FormLabel
              column
              ref={(ref) => {
                input = ref;
              }}
            />
          </FormGroup>
        );
      }
    }

    render(<Container />);
    expect(input.tagName).toEqual('LABEL');
  });

  it('accepts as prop', () => {
    render(
      <FormLabel as="legend" data-testid="test-id">
        body
      </FormLabel>,
    );

    expect(screen.getByTestId('test-id').tagName).toEqual('LEGEND');
  });

  it('should properly size itself when rendered as a Col', () => {
    render(
      <div>
        <FormLabel column="sm" data-testid="test-1">
          Label
        </FormLabel>
        <FormLabel column data-testid="test-2">
          Label
        </FormLabel>
        <FormLabel column="lg" data-testid="test-3">
          Label
        </FormLabel>
      </div>,
    );

    expect(screen.getByTestId('test-1').classList).toContain(
      'col-form-label-sm',
    );
    expect(screen.getByTestId('test-2').classList).toContain('col-form-label');
    expect(screen.getByTestId('test-3').classList).toContain(
      'col-form-label-lg',
    );
  });
});
