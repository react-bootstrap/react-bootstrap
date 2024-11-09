import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Stack from '../src/Stack';

describe('<Stack>', () => {
  it('should render a vertical stack by default', () => {
    const { container } = render(<Stack />);
    expect(container.firstElementChild!.className).toContain('vstack');
  });

  it('should render direction', () => {
    const { container } = render(<Stack direction="horizontal" />);
    expect(container.firstElementChild!.className).toContain('hstack');
  });

  it('should render gap', () => {
    const { container } = render(<Stack gap={2} />);
    expect(container.firstElementChild!.classList).toContain('gap-2');
  });

  it('should render responsive gap', () => {
    const { container } = render(<Stack gap={{ md: 2 }} />);
    expect(container.firstElementChild!.classList).toContain('gap-md-2');
  });
});
