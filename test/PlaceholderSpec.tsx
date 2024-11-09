import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Placeholder from '../src/Placeholder';

describe('<Placeholder>', () => {
  it('should render a placeholder', () => {
    const { container } = render(<Placeholder />);
    expect(container.firstElementChild!.className).toContain('placeholder');
  });

  it('should render size', () => {
    const { container } = render(<Placeholder size="lg" />);
    expect(container.firstElementChild!.className).toContain('placeholder-lg');
  });

  it('should render animation', () => {
    const { container } = render(<Placeholder animation="glow" />);
    expect(container.firstElementChild!.className).toContain(
      'placeholder-glow',
    );
  });

  it('should render bg', () => {
    const { container } = render(<Placeholder bg="primary" />);
    expect(container.firstElementChild!.className).toContain('bg-primary');
  });
});
