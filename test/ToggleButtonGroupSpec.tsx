import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';

import ToggleButtonGroup from '../src/ToggleButtonGroup';

describe('ToggleButtonGroup', () => {
  it('should render checkboxes', () => {
    const { container, getByLabelText } = render(
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

    container.firstElementChild!.classList.length.should.equal(1);
    container.firstElementChild!.classList.contains('btn-group').should.be.true;

    getByLabelText('Option 1')!.getAttribute('type')!.should.equal('checkbox');
    getByLabelText('Option 2')!.getAttribute('type')!.should.equal('checkbox');
    getByLabelText('Option 3')!.getAttribute('type')!.should.equal('checkbox');
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

    container.firstElementChild!.classList.length.should.equal(1);
    container.firstElementChild!.classList.contains('btn-group-vertical').should
      .be.true;
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

    container.firstElementChild!.classList.length.should.equal(2);
    container.firstElementChild!.classList.contains('btn-group-vertical').should
      .be.true;
    container.firstElementChild!.classList.contains('btn-group-sm').should.be
      .true;
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

    container.firstElementChild!.classList.length.should.equal(2);
    container.firstElementChild!.classList.contains('btn-group-vertical').should
      .be.true;
    container.firstElementChild!.classList.contains('btn-group-lg').should.be
      .true;
  });

  it('should render radios', () => {
    const { container, getByLabelText } = render(
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

    container.firstElementChild!.classList.length.should.equal(1);
    container.firstElementChild!.classList.contains('btn-group').should.be.true;

    getByLabelText('Option 1')!.getAttribute('type')!.should.equal('radio');
    getByLabelText('Option 2')!.getAttribute('type')!.should.equal('radio');
    getByLabelText('Option 3')!.getAttribute('type')!.should.equal('radio');
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

    container.firstElementChild!.classList.length.should.equal(1);
    container.firstElementChild!.classList.contains('btn-group-vertical').should
      .be.true;
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

    container.firstElementChild!.classList.length.should.equal(2);
    container.firstElementChild!.classList.contains('btn-group-vertical').should
      .be.true;
    container.firstElementChild!.classList.contains('btn-group-sm').should.be
      .true;
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

    container.firstElementChild!.classList.length.should.equal(2);
    container.firstElementChild!.classList.contains('btn-group-vertical').should
      .be.true;
    container.firstElementChild!.classList.contains('btn-group-lg').should.be
      .true;
  });

  it('should select initial values', () => {
    const { getByLabelText } = render(
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

    (getByLabelText('Option 1') as HTMLInputElement)!.checked.should.be.true;
    (getByLabelText('Option 2') as HTMLInputElement)!.checked.should.be.false;
    (getByLabelText('Option 3') as HTMLInputElement)!.checked.should.be.true;
  });

  it('should disable radios', () => {
    const { getByText, getByLabelText } = render(
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

    (getByLabelText('Option 1') as HTMLInputElement)!.disabled.should.be.true;
    (getByLabelText('Option 2') as HTMLInputElement)!.disabled.should.be.true;
    (getByLabelText('Option 3') as HTMLInputElement)!.disabled.should.be.false;

    getByText('Option 1').classList.contains('disabled').should.be.true;
    getByText('Option 2').classList.contains('disabled').should.be.true;
    getByText('Option 3').classList.contains('disabled').should.be.false;
  });

  it('should return an array of values', () => {
    const spy = sinon.spy();
    const { getByLabelText } = render(
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

    fireEvent.click(getByLabelText('Option 2'));
    spy.should.have.been.calledWith([2]);
  });

  it('should return a single value', () => {
    const spy = sinon.spy();
    const { getByLabelText } = render(
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

    fireEvent.click(getByLabelText('Option 2'));
    spy.should.have.been.calledWith(2);
  });

  it('should filter out value when deselected', () => {
    const spy = sinon.spy();
    const { getByLabelText } = render(
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

    fireEvent.click(getByLabelText('Option 1'));
    spy.should.have.been.calledWith([2]);
  });
});
