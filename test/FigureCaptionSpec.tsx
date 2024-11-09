import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Figure from '../src/Figure';

describe('<Figure.Caption>', () => {
  it('uses "figcaption" by default', () => {
    render(
      <Figure>
        <Figure.Caption data-testid="test-figure">Caption</Figure.Caption>
      </Figure>,
    );
    expect(screen.getByTestId('test-figure').tagName).toEqual('FIGCAPTION');
  });

  it('has "figure-caption" class', () => {
    render(<Figure.Caption data-testid="test-figure">Caption</Figure.Caption>);
    expect(screen.getByTestId('test-figure').classList).toContain(
      'figure-caption',
    );
  });

  it('Should merge additional classes passed in', () => {
    render(
      <Figure.Caption className="bob" data-testid="test-figure">
        Caption
      </Figure.Caption>,
    );
    expect(screen.getByTestId('test-figure').classList).toContain('bob');
    expect(screen.getByTestId('test-figure').classList).toContain(
      'figure-caption',
    );
  });

  it('allows custom elements instead of "figcaption"', () => {
    render(
      <Figure.Caption as="section" data-testid="test-figure">
        Caption
      </Figure.Caption>,
    );
    expect(screen.getByTestId('test-figure').tagName).toEqual('SECTION');
  });
});
