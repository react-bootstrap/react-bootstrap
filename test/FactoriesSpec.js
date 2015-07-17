import React from 'react';
import components from '../tools/public-components';

let props = {
  ButtonInput: {value: 'button'},
  Glyphicon: {glyph: 'star'},
  Modal: {onHide() {}},
  ModalTrigger: {modal: React.DOM.div(null)},
  OverlayTrigger: {overlay: React.DOM.div(null)}
};

function createTest(component) {
  let factory = require(`../lib/factories/${component}`);
  describe('factories', function () {
    it(`Should have a ${component} factory`, function () {
      assert.ok(React.isValidElement(factory(props[component])));
    });
  });
}

components.map(component => createTest(component));
