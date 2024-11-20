import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccordionHeader } from '../src';

describe('<AccordionHeader>', () => {
  it('should apply aria-controls to the button', () => {
    render(<AccordionHeader aria-controls="test" />);

    expect(screen.getByRole('button').getAttribute('aria-controls')).toEqual(
      'test',
    );
  });
});
