import { mount } from 'enzyme';

import Modal from '../src/Modal';

describe('Modal.Footer', () => {
  it('uses "div" by default', () => {
    mount(
      <Modal.Footer className="custom-class">
        <strong>Content</strong>
      </Modal.Footer>,
    ).assertSingle('div.modal-footer.custom-class strong');
  });

  it('should allow custom elements instead of "div"', () => {
    mount(<Modal.Footer as="section" />).assertSingle('section.modal-footer');
  });
});
