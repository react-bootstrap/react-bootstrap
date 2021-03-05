import { mount } from 'enzyme';

import Toast from '../src/Toast';

describe('Toast.Header', () => {
  it('will pass all props to the created div and renders its children', () => {
    mount(
      <Toast.Header>
        <strong>content</strong>
      </Toast.Header>,
    ).assertSingle('div.toast-header strong');
  });

  it('should render close button variant', () => {
    const wrapper = mount(
      <Toast.Header closeButton closeVariant="white">
        <strong>content</strong>
      </Toast.Header>,
    );
    expect(wrapper.find('CloseButton').props()).to.have.property(
      'variant',
      'white',
    );
  });
});
