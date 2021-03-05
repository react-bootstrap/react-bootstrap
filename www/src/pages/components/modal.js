import { graphql } from 'gatsby';
import { css } from 'astroturf';

import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';

import ModalStatic from '../../examples/Modal/Static';
import ModalBasic from '../../examples/Modal/Basic';
import ModalStaticBackdrop from '../../examples/Modal/StaticBackdrop';
import ModalDefaultSizing from '../../examples/Modal/DefaultSizing';
import ModalFullScreen from '../../examples/Modal/FullScreen';
import ModalCustomSizing from '../../examples/Modal/CustomSizing';
import ModalVerticallyCentered from '../../examples/Modal/VerticallyCentered';
import ModalWithoutAnimation from '../../examples/Modal/WithoutAnimation';
import ModalGrid from '../../examples/Modal/Grid';
import withLayout from '../../withLayout';

const styles = css`
  /* has to be fully global because of modal portals */
  :global(.modal-90w) {
    width: 90%;
    max-width: none !important;
  }
`;

export default withLayout(function ModalSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="modals">
        Modals
      </LinkedHeading>
      <p className="lead">
        Add dialogs to your site for lightboxes, user notifications, or
        completely custom content.
      </p>
      <LinkedHeading h="2" id="modals-overview">
        Overview
      </LinkedHeading>
      <ul>
        <li>
          Modals are positioned over everything else in the document and remove
          scroll from the <code>{'<body>'}</code> so that modal content scrolls
          instead.
        </li>
        <li>
          Modals are <em>unmounted</em> when closed.
        </li>
        <li>
          Bootstrap only supports <strong>one</strong> modal window at a time.
          Nested modals aren’t supported, but if you really need them the
          underlying <code>react-overlays</code> can support them if you're
          willing.
        </li>
        <li>
          Modal's "trap" focus in them, ensuring the keyboard navigation cycles
          through the modal, and not the rest of the page.
        </li>
        <li>
          Unlike vanilla Bootstrap, <code>autoFocus</code> works in Modals
          because React handles the implementation.
        </li>
      </ul>

      <LinkedHeading h="2" id="modals-examples">
        Examples
      </LinkedHeading>
      <LinkedHeading h="3" id="modals-static">
        Static Markup
      </LinkedHeading>
      <p>
        Below is a <em>static</em> modal dialog (without the positioning) to
        demonstrate the look and feel of the Modal.
      </p>
      <ReactPlayground codeText={ModalStatic} />

      <LinkedHeading h="3" id="modals-live">
        Live demo
      </LinkedHeading>
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
      <LinkedHeading h="3" id="static-backdrop">
        Static backdrop
      </LinkedHeading>
      <p>
        When backdrop is set to static, the modal will not close when clicking
        outside it. Click the button below to try it.
      </p>
      <ReactPlayground codeText={ModalStaticBackdrop} />
      <LinkedHeading h="3" id="without-animation">
        Without Animation
      </LinkedHeading>
      <p>
        A Modal can also be without an animation. For that set the "animation"
        prop to <code>false</code>.
      </p>
      <ReactPlayground codeText={ModalWithoutAnimation} />
      <div className="bs-callout bs-callout-info">
        <div className="h4">Additional Import Options</div>
        <p>
          The Modal Header, Title, Body, and Footer components are available as
          static properties the <code>{'<Modal/>'}</code> component, but you can
          also, import them directly like:{' '}
          <code>require("react-bootstrap/ModalHeader")</code>.
        </p>
      </div>
      <LinkedHeading h="3" id="modal-vertically-centered">
        Vertically centered
      </LinkedHeading>
      <p>You can vertically center a modal by passing the "centered" prop.</p>
      <ReactPlayground codeText={ModalVerticallyCentered} />

      <LinkedHeading h="3" id="modal-grid">
        Using the grid
      </LinkedHeading>
      <p>
        You can use grid layouts within a model using regular grid components
        inside the modal content.
      </p>
      <ReactPlayground codeText={ModalGrid} />

      <LinkedHeading h="2" id="modal-default-sizing">
        Optional Sizes
      </LinkedHeading>
      <p>
        You can specify a bootstrap large or small modal by using the{' '}
        <code>size</code> prop.
      </p>
      <ReactPlayground codeText={ModalDefaultSizing} />

      <LinkedHeading h="3" id="modal-fullscreen">
        Fullscreen Modal
      </LinkedHeading>
      <p>
        You can use the <code>fullscreen</code> prop to make the modal
        fullscreen. Specifying a breakpoint will only set the modal as
        fullscreen <b>below</b> the breakpoint size.
      </p>
      <ReactPlayground codeText={ModalFullScreen} />

      <LinkedHeading h="3" id="modal-custom-sizing">
        Sizing modals using custom CSS
      </LinkedHeading>
      <p>
        You can apply custom css to the modal dialog div using the
        "dialogClassName" prop. Example is using a custom css class with width
        set to 90%.
      </p>
      <ReactPlayground
        codeText={ModalCustomSizing}
        exampleClassName={styles.custom}
      />

      <LinkedHeading h="2" id="modals-props">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.Modal} />
      <ComponentApi metadata={data.ModalDialog} />
      <ComponentApi metadata={data.ModalHeader} />
      <ComponentApi metadata={data.ModalTitle} />
      <ComponentApi metadata={data.ModalBody} />
      <ComponentApi metadata={data.ModalFooter} />
    </>
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
