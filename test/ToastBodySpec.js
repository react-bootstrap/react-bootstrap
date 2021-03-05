import { mount } from 'enzyme';

import Toast from '../src/Toast';

describe('Toast.Body', () => {
  it('will pass all props to the created div and renders its children', () => {
    const content = <strong>Content</strong>;
    mount(
      <Toast.Body className="custom-class">{content}</Toast.Body>,
    ).assertSingle('div.custom-class.toast-body>strong');
  });
});
