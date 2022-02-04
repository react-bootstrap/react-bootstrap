import { render } from '@testing-library/react';

import Modal from '../src/Modal';

describe('Modal.Title', () => {
  it('uses "div" by default', () => {
    const { getByTestId } = render(
      <Modal.Title data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </Modal.Title>,
    );

    getByTestId('test-modal').tagName.toLowerCase().should.equal('div');
    getByTestId('test-modal').classList.contains('h4').should.be.true;
    getByTestId('test-modal').classList.contains('modal-title').should.be.true;
    getByTestId('test-modal').classList.contains('custom-class').should.be.true;
    getByTestId('test-modal')
      .querySelector('strong')
      .textContent.should.equal('Content');
  });

  it('should allow custom elements instead of "div"', () => {
    const { getByTestId } = render(
      <Modal.Title data-testid="test-modal" as="h4">
        <strong>Content</strong>
      </Modal.Title>,
    );

    getByTestId('test-modal').classList.contains('modal-title').should.be.true;
    getByTestId('test-modal').tagName.toLowerCase().should.equal('h4');
  });
});
