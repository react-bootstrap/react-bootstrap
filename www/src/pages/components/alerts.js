import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import Basic from '../../examples/Alert/Basic';
import Dismissible from '../../examples/Alert/Dismissible';
import DismissibleControlled from '../../examples/Alert/DismissibleControlled';
import Link from '../../examples/Alert/Link';
import withLayout from '../../withLayout';

export default withLayout(function AlertsSection({ data }) {
  return (
    <>
      <Heading h="1" id="alerts">
        Alert messages
      </Heading>

      <p>
        Alerts are available for any length of text, as well as an optional
        dismiss button. For proper styling, use one of the eight{' '}
        <code>variant</code>s.
      </p>
      <ReactPlayground codeText={Basic} />
      <Heading h="3" id="alerts-links">
        Links
      </Heading>
      <p>
        For links, use the <code>Alert.Link</code> component to provide matching
        colored links within any alert.
      </p>
      <ReactPlayground codeText={Link} />

      <Heading h="3" id="alerts-dismissible">
        Dismissible alerts
      </Heading>
      <p>
        Add the <code>dismissable</code> prop to add a functioning dismiss
        button to the Alert.
      </p>
      <ReactPlayground codeText={Dismissible} />
      <p>
        You can also control the visual state directly which is great if you
        wnat to build more complicated alerts.
      </p>
      <ReactPlayground codeText={DismissibleControlled} />
      <Heading h="2" id="alerts-api">
        API
      </Heading>
      <ComponentApi metadata={data.Alert} />
      <ComponentApi metadata={data.AlertHeading} exportedBy={data.Alert} />
      <ComponentApi metadata={data.AlertLink} exportedBy={data.Alert} />
    </>
  );
});

export const query = graphql`
  query AlertQuery {
    Alert: componentMetadata(displayName: { eq: "Alert" }) {
      ...ComponentApi_metadata
    }
    AlertLink: componentMetadata(displayName: { eq: "AlertLink" }) {
      ...ComponentApi_metadata
    }
    AlertHeading: componentMetadata(displayName: { eq: "AlertHeading" }) {
      ...ComponentApi_metadata
    }
  }
`;
