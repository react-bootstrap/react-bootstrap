import React from 'react';
import { shallow } from 'enzyme';

import Toast from '../src/Toast';

describe('Toast.Header', () => {
  it('will pass all props to the created div and renders its children', () => {
    const content = <strong>Content</strong>;
    shallow(
      <Toast.Header className="custom-class">{content}</Toast.Header>,
    ).equals(
      <div className="toast-header custom-class">
        {content}
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>,
    );
  });
});
