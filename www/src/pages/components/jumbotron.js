import { graphql } from 'gatsby';
import React from 'react';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import JumbotronBasic from '../../examples/Jumbotron/Basic';
import JumbotronFluid from '../../examples/Jumbotron/Fluid';
import withLayout from '../../withLayout';

export default withLayout(function JumbotronSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="jumbotron">
        Jumbotron
      </LinkedHeading>

      <p className="lead">
        A lightweight, flexible component that can optionally extend the entire
        viewport to showcase key content on your site.
      </p>

      <ReactPlayground codeText={JumbotronBasic} />
      <ReactPlayground codeText={JumbotronFluid} />

      <LinkedHeading h="2" id="jumbotron-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Jumbotron} />
    </>
  );
});

export const query = graphql`
  query JumbotronQuery {
    Jumbotron: componentMetadata(displayName: { eq: "Jumbotron" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
