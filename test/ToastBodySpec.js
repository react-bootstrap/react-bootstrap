import React from 'react';
import { shallow } from 'enzyme';

import Toast from '../src/Toast';

describe('Toast.Body', () => {
  it('will pass all props to the created div and renders its children', () => {
    const content = <strong>Content</strong>;
    const result = shallow(
      <Toast.Body className="custom-class">{content}</Toast.Body>,
    ).equals(<div className="toast-body custom-class">{content}</div>);
    expect(result).to.equal(true);
  });
});
