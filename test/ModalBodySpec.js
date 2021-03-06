import { mount } from 'enzyme';

import Modal from '../src/Modal';

describe('Modal.Body', () => {
  it('uses "div" by default', () => {
    mount(
      <Modal.Body className="custom-class">
        <strong>Content</strong>
      </Modal.Body>,
    ).assertSingle('div.modal-body.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Modal.Body as="section" />).assertSingle('section.modal-body');
  });
});
