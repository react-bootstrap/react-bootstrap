import { fireEvent, render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';

import CloseButton from '../src/CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    const { getAllByRole } = render(<CloseButton />);

    getAllByRole('button').should.have.lengthOf(1);
  });

  it('Should have type=button by default', () => {
    const { getByRole } = render(<CloseButton />);

    expect(getByRole('button').getAttribute('type')).to.be.equal('button');
  });

  it('Should have class .btn-close', () => {
    const { getByRole } = render(<CloseButton />);

    getByRole('button').classList.contains('btn-close');
  });

  it('Should call onClick callback', () => {
    const onClickSpy = sinon.spy();

    const { getByRole } = render(<CloseButton onClick={onClickSpy} />);

    fireEvent.click(getByRole('button'));

    onClickSpy.should.have.been.calledOnce;
  });

  it('Should have a aria-label defaulted to "Close"', () => {
    const { getByLabelText } = render(<CloseButton />);

    getByLabelText('Close', { selector: '[aria-label]' }).should.exist;
  });

  it('Should allow override of aria-label', () => {
    const { getByLabelText } = render(<CloseButton aria-label="My Close" />);

    getByLabelText('My Close', { selector: '[aria-label]' }).should.exist;
  });
});
