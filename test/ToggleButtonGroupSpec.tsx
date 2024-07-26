import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ToggleButtonGroup from '../src/ToggleButtonGroup';

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    const { container } = render(
      <ToggleButtonGroup type="checkbox">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(1);
    expect(container.firstElementChild!.classList).toContain('btn-group');

    expect(screen.getByLabelText('Option 1')!.getAttribute('type')!).toEqual(
      'checkbox',
    );
    expect(screen.getByLabelText('Option 2')!.getAttribute('type')!).toEqual(
      'checkbox',
    );
    expect(screen.getByLabelText('Option 3')!.getAttribute('type')!).toEqual(
      'checkbox',
    );
  });

  it('should render checkboxes vertically', () => {
    const { container } = render(
      <ToggleButtonGroup type="checkbox" vertical>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(1);
    expect(container.firstElementChild!.classList).toContain(
      'btn-group-vertical',
    );
  });

  it('should render checkboxes vertically and small', () => {
    const { container } = render(
      <ToggleButtonGroup type="checkbox" vertical size="sm">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(2);
    expect(container.firstElementChild!.classList).toContain(
      'btn-group-vertical',
    );
    expect(container.firstElementChild!.classList).toContain('btn-group-sm');
  });

  it('should render checkboxes vertically and large', () => {
    const { container } = render(
      <ToggleButtonGroup type="checkbox" vertical size="lg">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(2);
    expect(container.firstElementChild!.classList).toContain(
      'btn-group-vertical',
    );
    expect(container.firstElementChild!.classList).toContain('btn-group-lg');
  });

  it('should render radios', () => {
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(1);
    expect(container.firstElementChild!.classList).toContain('btn-group');

    expect(screen.getByLabelText('Option 1')!.getAttribute('type')).toEqual(
      'radio',
    );
    expect(screen.getByLabelText('Option 2')!.getAttribute('type')).toEqual(
      'radio',
    );
    expect(screen.getByLabelText('Option 3')!.getAttribute('type')).toEqual(
      'radio',
    );
  });

  it('should render radios vertically', () => {
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items" vertical>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(1);
    expect(container.firstElementChild!.classList).toContain(
      'btn-group-vertical',
    );
  });

  it('should render radios vertically and small', () => {
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items" vertical size="sm">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(2);
    expect(container.firstElementChild!.classList).toContain(
      'btn-group-vertical',
    );
    expect(container.firstElementChild!.classList).toContain('btn-group-sm');
  });

  it('should render radios vertically and large', () => {
    const { container } = render(
      <ToggleButtonGroup type="radio" name="items" vertical size="lg">
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(container.firstElementChild!.classList.length).toEqual(2);
    expect(container.firstElementChild!.classList).toContain(
      'btn-group-vertical',
    );
    expect(container.firstElementChild!.classList).toContain('btn-group-lg');
  });

  it('should select initial values', () => {
    render(
      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
        <ToggleButtonGroup.Button id="id1" data-testid="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" data-testid="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" data-testid="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(
      (screen.getByLabelText('Option 1') as HTMLInputElement)!.checked,
    ).toEqual(true);
    expect(
      (screen.getByLabelText('Option 2') as HTMLInputElement)!.checked,
    ).toEqual(false);
    expect(
      (screen.getByLabelText('Option 3') as HTMLInputElement)!.checked,
    ).toEqual(true);
  });

  it('should disable radios', () => {
    render(
      <ToggleButtonGroup type="radio" name="items">
        <ToggleButtonGroup.Button id="id1" value={1} disabled>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2} disabled>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    expect(
      (screen.getByLabelText('Option 1') as HTMLInputElement)!.disabled,
    ).toEqual(true);
    expect(
      (screen.getByLabelText('Option 2') as HTMLInputElement)!.disabled,
    ).toEqual(true);
    expect(
      (screen.getByLabelText('Option 3') as HTMLInputElement)!.disabled,
    ).toEqual(false);

    expect(screen.getByText('Option 1').classList).toContain('disabled');

    expect(screen.getByText('Option 2').classList).toContain('disabled');
    expect(screen.getByText('Option 3').classList).not.toContain('disabled');
  });

  it('should return an array of values', () => {
    const spy = vi.fn();
    render(
      <ToggleButtonGroup type="checkbox" onChange={spy}>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(spy).toHaveBeenCalledWith([2], expect.anything());
  });

  it('should return a single value', () => {
    const spy = vi.fn();
    render(
      <ToggleButtonGroup type="radio" name="items" onChange={spy}>
        <ToggleButtonGroup.Button id="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id3" value={3}>
          Option 3
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(spy).toHaveBeenCalledWith(2, expect.anything());
  });

  it('should filter out value when deselected', () => {
    const spy = vi.fn();
    render(
      <ToggleButtonGroup
        type="checkbox"
        name="items"
        defaultValue={[1, 2]}
        onChange={spy}
      >
        <ToggleButtonGroup.Button id="id1" data-testid="id1" value={1}>
          Option 1
        </ToggleButtonGroup.Button>
        <ToggleButtonGroup.Button id="id2" data-testid="id2" value={2}>
          Option 2
        </ToggleButtonGroup.Button>
      </ToggleButtonGroup>,
    );

    fireEvent.click(screen.getByLabelText('Option 1'));
    expect(spy).toHaveBeenCalledWith([2], expect.anything());
  });
});
