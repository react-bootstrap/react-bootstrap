import { render } from '@testing-library/react';

import Modal from '../src/Modal';

describe('Modal.Footer', () => {
  it('uses "div" by default', () => {
    const { getByTestId } = render(
      <Modal.Footer data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </Modal.Footer>,
    );

    const elem = getByTestId('test-modal');
    elem.tagName.toLowerCase().should.equal('div');
    elem.classList.contains('modal-footer').should.be.true;
    elem.classList.contains('custom-class').should.be.true;
    elem.querySelector('strong')!.textContent!.should.equal('Content');
  });

  it('should allow custom elements instead of "div"', () => {
    const { getByTestId } = render(
      <Modal.Footer data-testid="test-modal" as="section">
        <strong>Content</strong>
      </Modal.Footer>,
    );
    getByTestId('test-modal').classList.contains('modal-footer').should.be.true;
    getByTestId('test-modal').tagName.toLowerCase().should.equal('section');
  });
});
