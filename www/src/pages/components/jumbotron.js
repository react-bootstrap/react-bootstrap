import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import JumbotronBasic from '../../examples/Jumbotron/Basic';
import JumbotronFluid from '../../examples/Jumbotron/Fluid';
import withLayout from '../../withLayout';

export default withLayout(function JumbotronSection({ data }) {
  return (
    <>
      <h2>
        <Anchor id="jumbotron">Jumbotron</Anchor>
      </h2>

      <p>
        A lightweight, flexible component that can optionally extend the entire
        viewport to showcase key content on your site.
      </p>

      <ReactPlayground codeText={JumbotronBasic} />
      <ReactPlayground codeText={JumbotronFluid} />

      <h3>
        <Anchor id="jumbotron-props">Props</Anchor>
        <LinkToSource component={data.Jumbotron.displayName} />
      </h3>
      <PropTable metadata={data.Jumbotron} />
    </>
  );
});

export const query = graphql`
  query JumbotronQuery {
    Jumbotron: componentMetadata(displayName: { eq: "Jumbotron" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
