import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Popover from '../src/Popover';

describe('Popover', () => {
  it('Should output a popover title and content', () => {
    render(
      <Popover data-testid="test" id="test-popover">
        <Popover.Header>Popover title</Popover.Header>
        <Popover.Body>
          <strong>Popover Content</strong>
        </Popover.Body>
      </Popover>,
    );
    const popoverElem = screen.getByTestId('test');
    const popoverArrowElem = popoverElem.children[0]!;
    const popoverHeaderElem = popoverElem.children[1]!;
    const popoverBodyElem = popoverElem.children[2]!;

    expect(popoverElem.getAttribute('x-placement')).toEqual('right');
    expect(popoverElem.getAttribute('role')).toEqual('tooltip');
    expect(popoverElem.classList).toContain('popover');
    expect(popoverElem.classList).toContain('bs-popover-end');

    expect(popoverArrowElem.classList).toContain('popover-arrow');
    expect(popoverHeaderElem.classList).toContain('popover-header');
    expect(popoverBodyElem.classList).toContain('popover-body');
  });
});
