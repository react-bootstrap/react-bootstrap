import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FormSelect from '../src/FormSelect';
import FormGroup from '../src/FormGroup';
import Modal from '../src/Modal';

describe('<FormSelect>', () => {
  it('should render correctly', () => {
    render(
      <FormSelect data-testid="test-id" name="bar" className="my-control" />,
    );

    const element = screen.getByTestId('test-id');
    expect(element.tagName).toEqual('SELECT');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('my-control');
    expect(element.classList).toContain('form-select');
    expect(element.getAttribute('name')).toEqual('bar');
  });

  it('should render size correctly', () => {
    render(<FormSelect size="lg" data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('form-select-lg');
  });

  it('should render htmlSize correctly', () => {
    render(<FormSelect htmlSize={3} data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.getAttribute('size')).toEqual('3');
  });

  it('should render isValid correctly', () => {
    render(<FormSelect isValid data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('is-valid');
  });

  it('should render isInvalid correctly', () => {
    render(<FormSelect isInvalid data-testid="test-id" />);

    const element = screen.getByTestId('test-id');
    expect(element.classList).toHaveLength(2);
    expect(element.classList).toContain('is-invalid');
  });

  it('should render controlId correctly', () => {
    render(
      <FormGroup controlId="control-id">
        <FormSelect data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('control-id');
  });

  it('should override controlId correctly', () => {
    render(
      <FormGroup controlId="control-id">
        <FormSelect id="overridden-id" data-testid="test-id">
          <option>1</option>
        </FormSelect>
      </FormGroup>,
    );

    const element = screen.getByTestId('test-id');
    expect(element.id).toEqual('overridden-id');
  });

  it('should render inside a Modal correctly', () => {
    render(
      <Modal show animation={false}>
        <Modal.Body>
          <FormSelect data-testid="modal-select">
            <option value="1">One</option>
            <option value="2">Two</option>
          </FormSelect>
        </Modal.Body>
      </Modal>,
    );

    const element = screen.getByTestId('modal-select');
    expect(element.tagName).toEqual('SELECT');
    expect(element.classList).toContain('form-select');
    expect(element.closest('.modal-body')).not.toBeNull();
  });

  it('should call custom onPointerDown handler when provided', () => {
    const onPointerDown = vi.fn();
    render(<FormSelect data-testid="test-id" onPointerDown={onPointerDown} />);

    const element = screen.getByTestId('test-id');
    fireEvent.pointerDown(element);
    expect(onPointerDown).toHaveBeenCalledTimes(1);
  });

  it('should blur active editable element on pointerDown', () => {
    render(
      <div>
        <input data-testid="input-id" type="text" />
        <FormSelect data-testid="select-id">
          <option value="1">1</option>
        </FormSelect>
      </div>,
    );

    const input = screen.getByTestId('input-id');
    const select = screen.getByTestId('select-id');

    input.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.pointerDown(select);
    expect(document.activeElement).not.toBe(input);
  });

  it('should blur active input inside a Modal on pointerDown', () => {
    render(
      <Modal show animation={false}>
        <Modal.Body>
          <input data-testid="modal-input" type="text" />
          <FormSelect data-testid="modal-select">
            <option value="1">1</option>
          </FormSelect>
        </Modal.Body>
      </Modal>,
    );

    const input = screen.getByTestId('modal-input');
    const select = screen.getByTestId('modal-select');

    input.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.pointerDown(select);
    expect(document.activeElement).not.toBe(input);
  });

  it('should not blur active element if onPointerDown prevents default', () => {
    render(
      <div>
        <input data-testid="input-id" type="text" />
        <FormSelect
          data-testid="select-id"
          onPointerDown={(e) => e.preventDefault()}
        >
          <option value="1">1</option>
        </FormSelect>
      </div>,
    );

    const input = screen.getByTestId('input-id');
    const select = screen.getByTestId('select-id');

    input.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.pointerDown(select);
    expect(document.activeElement).toBe(input);
  });

  it('should handle onChange correctly', () => {
    const onChange = vi.fn();
    render(
      <FormSelect data-testid="test-id" onChange={onChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </FormSelect>,
    );

    const element = screen.getByTestId('test-id') as HTMLSelectElement;
    fireEvent.change(element, { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(element.value).toBe('2');
  });
});
