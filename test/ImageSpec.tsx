import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Image from '../src/Image';

describe('Image', () => {
  it('should be an image', () => {
    render(<Image data-testid="test-image" />);
    expect(screen.getByTestId('test-image').tagName).toEqual('IMG');
  });

  it('should provide src and alt prop', () => {
    render(
      <Image data-testid="test-image" src="image.jpg" alt="this is alt" />,
    );
    expect(screen.getByTestId('test-image').getAttribute('src')).toEqual(
      'image.jpg',
    );
    expect(screen.getByTestId('test-image').getAttribute('alt')).toEqual(
      'this is alt',
    );
  });

  it('should have correct class when fluid prop is set', () => {
    render(<Image data-testid="test-image" fluid />);
    expect(screen.getByTestId('test-image').classList).toContain('img-fluid');
  });

  it('should not override class when rounded prop is set', () => {
    render(<Image data-testid="test-image" fluid rounded />);
    expect(screen.getByTestId('test-image').classList).toContain('img-fluid');
    expect(screen.getByTestId('test-image').classList).toContain('rounded');
  });

  it('should have correct class when rounded prop is set', () => {
    render(<Image data-testid="test-image" rounded />);
    expect(screen.getByTestId('test-image').classList).toContain('rounded');
  });

  it('should have correct class when roundedCircle prop is set', () => {
    render(<Image data-testid="test-image" roundedCircle />);
    expect(screen.getByTestId('test-image').classList).toContain(
      'rounded-circle',
    );
  });

  it('should have correct class when thumbnail prop is set', () => {
    render(<Image data-testid="test-image" thumbnail />);
    expect(screen.getByTestId('test-image').classList).toContain(
      'img-thumbnail',
    );
  });
});
