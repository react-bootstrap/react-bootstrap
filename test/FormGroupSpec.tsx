import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormControl from '../src/FormControl';
import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

describe('<FormGroup>', () => {
  it('renders children', () => {
    render(
      <FormGroup data-testid="test-id">
        <span className="child1" />
        <span className="child2" />
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.childElementCount).toEqual(2);

    const child1 = element.children[0];
    expect(child1.tagName).toEqual('SPAN');
    expect(child1.classList).toHaveLength(1);
    expect(child1.classList).toContain('child1');

    const child2 = element.children[1];
    expect(child2.tagName).toEqual('SPAN');
    expect(child2.classList).toHaveLength(1);
    expect(child2.classList).toContain('child2');
  });

  it('provided controlId to label and control', () => {
    render(
      <FormGroup controlId="my-control" data-testid="test-id">
        <div>
          <FormLabel>label</FormLabel>
          <FormControl />
        </div>
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    const label = element.getElementsByTagName('label');
    expect(label).toHaveLength(1);
    expect(label[0].getAttribute('for')).toEqual('my-control');

    const input = element.getElementsByTagName('input');
    expect(input).toHaveLength(1);
    expect(input[0].id).toEqual('my-control');
  });

  it('Should have div as default component', () => {
    render(<FormGroup data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.tagName).toEqual('DIV');
  });
});
