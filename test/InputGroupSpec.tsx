import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    render(<InputGroup data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('DIV');
  });

  it('Should render size correctly', () => {
    render(<InputGroup size="sm" data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('input-group-sm');
  });

  it('Should render hasValidation correctly', () => {
    render(<InputGroup hasValidation data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('has-validation');
  });

  describe('<Checkbox>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';

      render(<InputGroup.Checkbox name={name} />);

      expect(screen.getByRole('checkbox').getAttribute('name')).toEqual(name);
    });
  });

  describe('<Radio>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';

      render(<InputGroup.Radio name={name} />);

      expect(screen.getByRole('radio').getAttribute('name')).toEqual(name);
    });
  });
});
