import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import PlaceholderButton from '../src/PlaceholderButton';

describe('<PlaceholderButton>', () => {
  it('should render a placeholder', () => {
    const { container } = render(<PlaceholderButton />);
    expect(container.firstElementChild!.className).toContain('placeholder');
  });

  it('should render size', () => {
    const { container } = render(<PlaceholderButton size="lg" />);
    expect(container.firstElementChild!.className).toContain('placeholder-lg');
  });

  it('should render animation', () => {
    const { container } = render(<PlaceholderButton animation="glow" />);
    expect(container.firstElementChild!.className).toContain(
      'placeholder-glow',
    );
  });
});
