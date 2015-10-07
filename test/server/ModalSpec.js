import {assert} from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Modal from '../../src/Modal.js';

describe('Modal', () => {
  it('Should be rendered on the server side', () => {
    let noOp = () => {};

    assert.doesNotThrow(function renderOnServerSide() {
      return ReactDOMServer.renderToString(
        <Modal onHide={noOp}>
          <strong>Message</strong>
        </Modal>
      );
    });
  });
});
