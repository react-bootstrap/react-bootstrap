import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Jumbotron from '!!raw-loader!../../examples/Jumbotron';

export default function JumbotronSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="jumbotron">Jumbotron</Anchor> <small>Jumbotron</small>
      </h2>

      <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
      <ReactPlayground codeText={Jumbotron} />

      <h3><Anchor id="jumbotron-props">Props</Anchor></h3>
      <PropTable metadata={data.Jumbotron}/>
    </div>
  );
}

export const query = graphql`
  query JumbotronQuery {
    Jumbotron: componentMetadata(displayName: { eq: "Jumbotron" }) {
      ...PropTable_metadata
    }
  }
`;
