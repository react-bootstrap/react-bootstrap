import { graphql } from 'gatsby';
import React from 'react';

import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';

import ToastBasic from '../../examples/Toast/Basic';
import withLayout from '../../withLayout';

export default withLayout(function ToastSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="modals">
        Toasts
      </LinkedHeading>
      <ReactPlayground codeText={ToastBasic} />
    </>
  );
});

export const query = graphql`
  query ToastQuery {
    Toast: componentMetadata(displayName: { eq: "Toast" }) {
      ...ComponentApi_metadata
    }
    ToastHeader: componentMetadata(displayName: { eq: "ToastHeader" }) {
      ...ComponentApi_metadata
    }
    ToastBody: componentMetadata(displayName: { eq: "ToastBody" }) {
      ...ComponentApi_metadata
    }
  }
`;
