import React from 'react';
import {assert} from 'chai';
import Modal from '../../src/Modal.js';

describe('Modal', () => {
  it('Should be rendered on the server side', function () {
    let noOp = () => {};

    assert.doesNotThrow(function renderOnServerSide() {
      return React.renderToString(
        <Modal onRequestHide={noOp}>
          <strong>Message</strong>
        </Modal>
      );
    });
  });
});
