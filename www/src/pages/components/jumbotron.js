import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import JumbotronBasic from '../../examples/Jumbotron/Basic';
import JumbotronFluid from '../../examples/Jumbotron/Fluid';
import withLayout from '../../withLayout';

export default withLayout(function JumbotronSection({ data }) {
  return (
    <>
      <Heading h="1" id="jumbotron">
        Jumbotron
      </Heading>

      <p className="lead">
        A lightweight, flexible component that can optionally extend the entire
        viewport to showcase key content on your site.
      </p>

      <ReactPlayground codeText={JumbotronBasic} />
      <ReactPlayground codeText={JumbotronFluid} />

      <Heading h="2" id="jumbotron-api">
        API
      </Heading>
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
