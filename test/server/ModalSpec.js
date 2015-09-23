import React from 'react';
import {assert} from 'chai';
import Modal from '../../src/Modal.js';

describe('Modal', () => {
  it('Should be rendered on the server side', () => {
    let noOp = () => {};

    assert.doesNotThrow(function renderOnServerSide() {
      return React.renderToString(
        <Modal onHide={noOp}>
          <strong>Message</strong>
        </Modal>
      );
    });
  });
});
