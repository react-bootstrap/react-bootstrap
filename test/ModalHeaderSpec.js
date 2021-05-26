import { mount } from 'enzyme';

import Modal from '../src/Modal';

describe('Modal.Header', () => {
  it('uses "div" by default', () => {
    mount(
      <Modal.Header className="custom-class">
        <strong>Content</strong>
      </Modal.Header>,
    ).assertSingle('div.modal-header.custom-class strong');
  });

  it('has closeButton without a containing Modal and renders', () => {
    mount(<Modal.Header closeButton />).assertSingle('button');
  });

  it('Should trigger onHide when modal is closed', () => {
    const onHideSpy = sinon.spy();
    mount(<Modal.Header closeButton onHide={onHideSpy} />)
      .find('button')
      .simulate('click');

    expect(onHideSpy).to.have.been.called;
  });

  it('should render close button variant', () => {
    const wrapper = mount(<Modal.Header closeButton closeVariant="white" />);
    expect(wrapper.find('CloseButton').props()).to.have.property(
      'variant',
      'white',
    );
  });
});
