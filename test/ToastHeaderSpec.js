import React from 'react';
import { shallow } from 'enzyme';

import Toast from '../src/Toast';

describe('Toast.Header', () => {
  it('will pass all props to the created div and renders its children', () => {
    const content = <strong>Content</strong>;
    const result = shallow(<Toast.Header>{content}</Toast.Header>).equals(
      <div className="toast-header">
        {content}
        <button
          type="button"
          className="close ml-2 mb-1"
          aria-label="Close"
          data-dismiss="toast"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </div>,
    );
    expect(result).to.equal(true);
  });
});
