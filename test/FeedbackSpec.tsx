import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Feedback from '../src/Feedback';

describe('<Feedback>', () => {
  it('Should have div as default component', () => {
    render(<Feedback data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('DIV');
  });

  it('Should render valid feedback', () => {
    render(<Feedback type="valid" data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('valid-feedback');
  });

  it('Should render invalid feedback', () => {
    render(<Feedback type="invalid" data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('invalid-feedback');
  });

  it('Should render valid feedback tooltip', () => {
    render(<Feedback type="valid" tooltip data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('valid-tooltip');
  });

  it('Should render invalid feedback tooltip', () => {
    render(<Feedback type="invalid" tooltip data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('invalid-tooltip');
  });
});
