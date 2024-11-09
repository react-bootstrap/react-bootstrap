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

    expect(screen.getByRole('group')).toBeDefined();
  });

  it('Should add size', () => {
    render(
      <ButtonGroup size="lg">
        <Button>Title</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole('group').classList).toContain('btn-group-lg');
  });

  it('Should add vertical variation', () => {
    render(
      <ButtonGroup vertical>
        <Button>Title</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group');
    expect(group.classList).toContain('btn-group-vertical');
    expect(group.classList).not.toContain('btn-group');
  });

  it('Should have div as default component', () => {
    render(<ButtonGroup />);

    expect(screen.getByRole('group').tagName).toEqual('DIV');
  });

  it('Should allow component tag customization', () => {
    render(<ButtonGroup as="article" />);

    expect(screen.getByRole('group').tagName).toEqual('ARTICLE');
  });
});
