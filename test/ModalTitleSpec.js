import { mount } from 'enzyme';

import Modal from '../src/Modal';

describe('Modal.Title', () => {
  it('uses "div" by default', () => {
    mount(
      <Modal.Title className="custom-class">
        <strong>Content</strong>
      </Modal.Title>,
    ).assertSingle('div.h4.modal-title.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Modal.Title as="h4" />).assertSingle('h4.modal-title');
  });
});
