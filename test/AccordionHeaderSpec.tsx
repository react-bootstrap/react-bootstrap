import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionHeader } from '../src';

describe('<AccordionHeader>', () => {
  it('should apply aria-controls to the button', () => {
    render(<AccordionHeader aria-controls="test" />);

    expect(screen.getByRole('button').getAttribute('aria-controls')).toEqual(
      'test',
    );
  });

  it('should disable the header button when disabled prop is true', async () => {
    const user = userEvent.setup();
    const onClickFn = vi.fn();
    render(<AccordionHeader disabled onClick={onClickFn} />);

    await user.click(screen.getByRole('button'));

    expect(onClickFn).not.toHaveBeenCalled();
  });
});
