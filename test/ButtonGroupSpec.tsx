import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ButtonGroup from '../src/ButtonGroup';
import Button from '../src/Button';

describe('ButtonGroup', () => {
  it('Should output a button group', () => {
    render(
      <ButtonGroup>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group')).toBeTruthy();
  });

  it('Should add size', () => {
    render(
      <ButtonGroup size="lg">
        <Button>Title</Button>
      </ButtonGroup>,
    );

    expect(
      screen.getByRole('group').classList.contains('btn-group-lg'),
    ).toEqual(true);
  });

  it('Should add vertical variation', () => {
    render(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.classList.contains('btn-group-vertical')).toEqual(true);
    expect(group.classList.contains('btn-group')).toEqual(false);
  });

  it('Should have div as default component', () => {
    render(<ButtonGroup />);

    expect(screen.getByRole('group').tagName.toLowerCase()).toEqual('div');
  });

  it('Should allow component tag customization', () => {
    render(<ButtonGroup as="article" />);

    expect(screen.getByRole('group').tagName.toLowerCase()).toEqual('article');
  });
});
