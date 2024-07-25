import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../src/Badge';

describe('Badge', () => {
  it('Should render correctly', () => {
    render(
      <Badge bg="primary" pill data-testid="test">
        Message
      </Badge>,
    );

    const badge = screen.getByTestId('test');
    expect(badge.innerText).toEqual('Message');
    expect(badge.classList.contains('badge')).toEqual(true);
    expect(badge.classList.contains('bg-primary')).toEqual(true);
    expect(badge.classList.contains('rounded-pill')).toEqual(true);
  });

  it('should support custom `as`', () => {
    render(
      <Badge as="a" href="#" bg="primary" pill data-testid="test">
        Message
      </Badge>,
    );

    const badge = screen.getByTestId('test');
    expect(badge.tagName.toLowerCase()).toEqual('a');
    expect(badge.getAttribute('href')).toEqual('#');
  });

  it('Should default to bg="primary"', () => {
    render(<Badge data-testid="test">Message</Badge>);

    const badge = screen.getByTestId('test');
    expect(badge.classList.contains('bg-primary')).toEqual(true);
  });

  it('Should use bg class', () => {
    render(
      <Badge bg="danger" data-testid="test">
        Message
      </Badge>,
    );

    const badge = screen.getByTestId('test');
    expect(badge.classList.contains('bg-danger')).toEqual(true);
  });

  it('Should not have bg class when bg=null', () => {
    render(
      <Badge bg={null as any} data-testid="test">
        Message
      </Badge>,
    );

    const badge = screen.getByTestId('test');
    expect(badge.classList.contains('bg-primary')).toEqual(false);
  });
});
