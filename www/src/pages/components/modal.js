import { graphql } from 'gatsby';
import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import Heading from '../../components/Heading';
import ReactPlayground from '../../components/ReactPlayground';

import ModalStatic from '../../examples/Modal/Static';
import ModalBasic from '../../examples/Modal/Basic';
import ModalContained from '../../examples/Modal/Contained';
import ModalDefaultSizing from '../../examples/Modal/DefaultSizing';
import ModalCustomSizing from '../../examples/Modal/CustomSizing';
import ModalVerticallyCentered from '../../examples/Modal/VerticallyCentered';
import ModalGrid from '../../examples/Modal/Grid';
import withLayout from '../../withLayout';

export default withLayout(function ModalSection({ data }) {
  return (
    <div className="bs-docs-section">
      <Heading h="2" id="modals">
        Modals
      </Heading>

      <Heading h="3" id="modals-static">
        Static Markup
      </Heading>
      <p>A modal dialog component</p>
      <ReactPlayground codeText={ModalStatic} />

      <Heading h="3" id="modals-live">
        Basic example
      </Heading>
      <p />
      <p>
        A modal with header, body, and set of actions in the footer. Use{' '}
        <code>{'<Modal/>'}</code> in combination with other components to show
        or hide your Modal. The <code>{'<Modal/>'}</code> Component comes with a
        few convenient "sub components": <code>{'<Modal.Header/>'}</code>,{' '}
        <code>{'<Modal.Title/>'}</code>, <code>{'<Modal.Body/>'}</code>, and{' '}
        <code>{'<Modal.Footer/>'}</code>, which you can use to build the Modal
        content.
      </p>
      <ReactPlayground codeText={ModalBasic} />
      <div className="bs-callout bs-callout-info">
        <h4>Additional Import Options</h4>
        <p>
          The Modal Header, Title, Body, and Footer components are available as
          static properties the <code>{'<Modal/>'}</code> component, but you can
          also, import them directly from the <code>/lib</code> directory like:{' '}
          <code>require("react-bootstrap/lib/ModalHeader")</code>.
        </p>
      </div>

      <Heading h="3" id="modals-contained">
        Contained Modal
      </Heading>
      <p>
        You will need to add the following css to your project and ensure that
        your container has the <code>modal-container</code> class.
      </p>
      <pre>
        <code>
          {`
.modal-container {
  position: relative;
}
.modal-container .modal, .modal-container .modal-backdrop {
  position: absolute;
}`.trim()}
        </code>
      </pre>
      <ReactPlayground codeText={ModalContained} />

      <Heading h="3" id="modal-default-sizing">
        Sizing modals using standard Bootstrap props
      </Heading>
      <p>
        You can specify a bootstrap large or small modal by using the "size"
        prop.
      </p>
      <ReactPlayground codeText={ModalDefaultSizing} />

      <Heading h="3" id="modal-custom-sizing">
        Sizing modals using custom CSS
      </Heading>
      <p>
        You can apply custom css to the modal dialog div using the
        "dialogClassName" prop. Example is using a custom css class with width
        set to 90%.
      </p>
      <ReactPlayground codeText={ModalCustomSizing} />

      <Heading h="3" id="modals-multiple">
        Multiple Modals
      </Heading>
      <div className="bs-callout bs-callout-warning">
        <h4>Not supported</h4>
        <p>
          React-Bootstrap modals are not designed to support rendering multiple
          modals simultaneously. You will have to add{' '}
          <code>react-overlays</code> as a dependency and build your own modal
          component using its{' '}
          <a href="https://github.com/react-bootstrap/react-overlays/blob/master/src/ModalManager.js">
            <code>{'<ModalManager/>'}</code>
          </a>{' '}
          component, which supports multiple modals.
        </p>
      </div>
      <Heading h="3" id="modal-vertically-centered">
        Vertically centered modals
      </Heading>
      <p>
        You can vertically center a modal by passing the "verticallyCenter"
        prop.
      </p>
      <ReactPlayground codeText={ModalVerticallyCentered} />

      <Heading h="3" id="modal-grid">
        Using grid in modals
      </Heading>
      <p>
        You can use grid layouts within a model using regular grid components
        inside the modal content.
      </p>
      <ReactPlayground codeText={ModalGrid} />

      <Heading h="3" id="modals-props">
        Props
      </Heading>

      <ComponentApi metadata={data.Modal} />
      <ComponentApi metadata={data.ModalDialog} />
      <ComponentApi metadata={data.ModalHeader} />
      <ComponentApi metadata={data.ModalTitle} />
      <ComponentApi metadata={data.ModalBody} />
      <ComponentApi metadata={data.ModalFooter} />
    </div>
  );
});

export const query = graphql`
  query ModalQuery {
    Modal: componentMetadata(displayName: { eq: "Modal" }) {
      ...ComponentApi_metadata
    }
    ModalDialog: componentMetadata(displayName: { eq: "ModalDialog" }) {
      ...ComponentApi_metadata
    }
    ModalHeader: componentMetadata(displayName: { eq: "ModalHeader" }) {
      ...ComponentApi_metadata
    }
    ModalTitle: componentMetadata(displayName: { eq: "ModalTitle" }) {
      ...ComponentApi_metadata
    }
    ModalBody: componentMetadata(displayName: { eq: "ModalBody" }) {
      ...ComponentApi_metadata
    }
    ModalFooter: componentMetadata(displayName: { eq: "ModalFooter" }) {
      ...ComponentApi_metadata
    }
  }
`;
