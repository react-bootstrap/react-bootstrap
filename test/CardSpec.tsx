import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../src/Card';

describe('<Card>', () => {
  it('should output a div', () => {
    render(<Card>Card</Card>);
    expect(screen.getByText('Card').tagName).toEqual('DIV');
    expect(screen.getByText('Card').classList).toContain('card');
  });

  it('should have additional classes', () => {
    render(<Card className="custom-class">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('custom-class');
  });

  it('accepts a bg prop', () => {
    render(<Card bg="primary">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('bg-primary');
  });

  it('accepts a text prop', () => {
    render(<Card text="success">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('text-success');
  });

  it('accepts a border prop', () => {
    render(<Card border="danger">Card</Card>);
    expect(screen.getByText('Card').classList).toContain('border-danger');
  });

  it('should render children', () => {
    render(
      <Card data-testid="test-card">
        <p>hello</p>
      </Card>,
    );
    expect(screen.getByTestId('test-card').children.length).toEqual(1);
    expect(screen.getByTestId('test-card').children[0].tagName).toEqual('P');
  });

  it('accepts as prop', () => {
    render(<Card as="section">body</Card>);
    expect(screen.getByText('body').tagName).toEqual('SECTION');
  });

  it('allows for the body shorthand', () => {
    render(<Card body>test</Card>);
    expect(screen.getByText('test').classList).toContain('card-body');
  });

  it('Should have div as default component', () => {
    render(<Card data-testid="default-test" />);
    expect(screen.getByTestId('default-test').tagName).toEqual('DIV');
  });
});
