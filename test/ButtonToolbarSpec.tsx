import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Button from '../src/Button';
import ButtonToolbar from '../src/ButtonToolbar';

describe('ButtonToolbar', () => {
  it('Should output a button toolbar', () => {
    render(
      <ButtonToolbar>
        <Button>Title</Button>
      </ButtonToolbar>,
    );

    expect(
      screen.getByRole('toolbar').classList.contains('btn-toolbar'),
    ).toEqual(true);
  });

  it('Should allow a custom prefix', () => {
    render(
      <ButtonToolbar bsPrefix="my-custom-toolbar">
        <Button>Title</Button>
      </ButtonToolbar>,
    );

    const toolbar = screen.getByRole('toolbar');
    expect(toolbar.classList.contains('my-custom-toolbar')).toEqual(true);
    expect(toolbar.classList.contains('btn-toolbar')).toEqual(false);
  });
});
