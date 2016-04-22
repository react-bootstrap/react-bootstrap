import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ModalSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="modals">Modals</Anchor> <small>Modal</small>
      </h2>

      <h3><Anchor id="modals-static">Static Markup</Anchor></h3>
      <p>A modal dialog component</p>
      <ReactPlayground codeText={Samples.ModalStatic} />

      <h3><Anchor id="modals-live">Basic example</Anchor></h3>
      <p></p>
      <p>
        A modal with header, body, and set of actions in the footer. Use <code>{"<Modal/>"}</code> in combination with other components to
        show or hide your Modal. The <code>{"<Modal/>"}</code> Component comes with
        a few convenient "sub components": <code>{"<Modal.Header/>"}</code>, <code>{"<Modal.Title/>"}</code>, <code>{"<Modal.Body/>"}</code>,
        and <code>{"<Modal.Footer/>"}</code>, which you can use to build the Modal content.
      </p>
      <ReactPlayground codeText={Samples.Modal} />
      <div className="bs-callout bs-callout-info">
        <h4>Additional Import Options</h4>
        <p>
          The Modal Header, Title, Body, and Footer components are available as static properties the <code>{"<Modal/>"}</code> component, but you can also,
          import them directly from the <code>/lib</code> directory like: <code>{'require("react-bootstrap/lib/ModalHeader")'}</code>.
        </p>
      </div>

      <h3><Anchor id="modals-contained">Contained Modal</Anchor></h3>
      <p>You will need to add the following css to your project and ensure that your container has the <code>modal-container</code> class.</p>
      <pre>
        {React.DOM.code(null,
          '.modal-container {\n' +
          '  position: relative;\n' +
          '}\n' +
          '.modal-container .modal, .modal-container .modal-backdrop {\n' +
          '  position: absolute;\n' +
          '}\n'
        )}
      </pre>
      <ReactPlayground codeText={Samples.ModalContained} />

      <h3><Anchor id="modal-default-sizing">Sizing modals using standard Bootstrap props</Anchor></h3>
      <p>You can specify a bootstrap large or small modal by using the "bsSize" prop.</p>
      <ReactPlayground codeText={Samples.ModalDefaultSizing} />

      <h3><Anchor id="modal-custom-sizing">Sizing modals using custom CSS</Anchor></h3>
      <p>You can apply custom css to the modal dialog div using the "dialogClassName" prop. Example is using a custom css class with width set to 90%.</p>
      <ReactPlayground codeText={Samples.ModalCustomSizing} />

      <h3><Anchor id="modals-props">Props</Anchor></h3>

      <h4><Anchor id="modals-props-modal">Modal</Anchor></h4>
      <PropTable component="Modal"/>

      <h4><Anchor id="modals-props-modal-header">Modal.Header</Anchor></h4>
      <PropTable component="ModalHeader"/>

      <h4><Anchor id="modals-props-modal-title">Modal.Title</Anchor></h4>
      <PropTable component="ModalTitle"/>

      <h4><Anchor id="modals-props-modal-body">Modal.Body</Anchor></h4>
      <PropTable component="ModalBody"/>

      <h4><Anchor id="modals-props-modal-footer">Modal.Footer</Anchor></h4>
      <PropTable component="ModalFooter"/>
    </div>
  );
}
