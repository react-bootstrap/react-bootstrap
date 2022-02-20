import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';

import Modal from '../src/Modal';

describe('Modal.Header', () => {
  it('uses "div" by default', () => {
    const { getByTestId } = render(
      <Modal.Header data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </Modal.Header>,
    );

    getByTestId('test-modal').tagName.toLowerCase().should.equal('div');
    getByTestId('test-modal').classList.contains('modal-header').should.be.true;
    getByTestId('test-modal').classList.contains('custom-class').should.be.true;
    getByTestId('test-modal')
      .querySelector('strong')!
      .textContent!.should.equal('Content');
  });

  it('has closeButton without a containing Modal and renders', () => {
    const { getByTestId } = render(
      <Modal.Header data-testid="test-modal" closeButton />,
    );

    getByTestId('test-modal').tagName.toLowerCase().should.equal('div');
    getByTestId('test-modal').querySelector('button')!.should.exist;
  });

  it('Should trigger onHide when modal is closed', () => {
    const onHideSpy = sinon.spy();
    const { getByTestId } = render(
      <Modal.Header data-testid="test-modal" closeButton onHide={onHideSpy} />,
    );

    fireEvent.click(getByTestId('test-modal').querySelector('button')!);
    onHideSpy.should.be.calledOnce;
  });

  it('should render close button variant', () => {
    const { getByTestId } = render(
      <Modal.Header
        data-testid="test-modal"
        closeButton
        closeVariant="white"
      />,
    );

    const button = getByTestId('test-modal').querySelector('button')!;

    button.should.exist;
    button.classList.contains('btn-close-white').should.be.true;
  });
});
