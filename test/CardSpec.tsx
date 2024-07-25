import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../src/Card';

describe('<Card>', () => {
  it('should output a div', () => {
    render(<Card>Card</Card>);
    expect(screen.getByText('Card').tagName.toLowerCase()).toEqual('div');
    expect(screen.getByText('Card').classList.contains('card')).toEqual(true);
  });

  it('should have additional classes', () => {
    render(<Card className="custom-class">Card</Card>);
    expect(screen.getByText('Card').classList.contains('custom-class')).toEqual(
      true,
    );
  });

  it('accepts a bg prop', () => {
    render(<Card bg="primary">Card</Card>);
    expect(screen.getByText('Card').classList.contains('bg-primary')).toEqual(
      true,
    );
  });

  it('accepts a text prop', () => {
    render(<Card text="success">Card</Card>);
    expect(screen.getByText('Card').classList.contains('text-success')).toEqual(
      true,
    );
  });

  it('accepts a border prop', () => {
    render(<Card border="danger">Card</Card>);
    expect(
      screen.getByText('Card').classList.contains('border-danger'),
    ).toEqual(true);
  });

  it('should render children', () => {
    render(
      <Card data-testid="test-card">
        <p>hello</p>
      </Card>,
    );
    expect(screen.getByTestId('test-card').children.length).toEqual(1);
    expect(
      screen.getByTestId('test-card').children[0].tagName.toLowerCase(),
    ).toEqual('p');
  });

  it('accepts as prop', () => {
    render(<Card as="section">body</Card>);
    expect(screen.getByText('body').tagName.toLowerCase()).toEqual('section');
  });

  it('allows for the body shorthand', () => {
    render(<Card body>test</Card>);
    expect(screen.getByText('test').classList.contains('card-body')).toEqual(
      true,
    );
  });

  it('Should have div as default component', () => {
    render(<Card data-testid="default-test" />);
    expect(screen.getByTestId('default-test').tagName.toLowerCase()).toEqual(
      'div',
    );
  });
});
