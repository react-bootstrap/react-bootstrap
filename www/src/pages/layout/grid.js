import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import GridBasic from '../../examples/GridBasic';
import GridWithoutClearfix from '../../examples/GridWithoutClearfix';
import GridWithClearfix from '../../examples/GridWithClearfix';

export default function GridSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid">Grid system</Anchor>{' '}
        <small>Grid, Row, Col, Clearfix</small>
      </h2>

      <h3>
        <Anchor id="grids-basic">Basic Grid</Anchor>
      </h3>
      <ReactPlayground codeText={GridBasic} />

      <h3>
        <Anchor id="grids-clearfix">Clearfix</Anchor>
      </h3>

      <p>
        Below, the columns won't clear correctly in viewport <code>sm</code>{' '}
        (768px &le; width &lt; 992px).
      </p>
      <ReactPlayground codeText={GridWithoutClearfix} />

      <p>
        Introduce <code>Clearfix</code>, set to visible for the viewports with
        issue, so that columns clear correctly.
      </p>
      <ReactPlayground codeText={GridWithClearfix} />

      <h3>
        <Anchor id="grid-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="grid-props-grid">Grid</Anchor>
      </h4>
      <PropTable metadata={data.Grid} />

      <h4>
        <Anchor id="grid-props-row">Row</Anchor>
      </h4>
      <PropTable metadata={data.Row} />

      <h4>
        <Anchor id="grid-props-col">Col</Anchor>
      </h4>
      <PropTable metadata={data.Col} />

      <h4>
        <Anchor id="grid-props-col">Clearfix</Anchor>
      </h4>
      <PropTable metadata={data.Clearfix} />
    </div>
  );
}

export const query = graphql`
  query GridQuery {
    Grid: componentMetadata(displayName: { eq: "Grid" }) {
      ...PropTable_metadata
    }
    Row: componentMetadata(displayName: { eq: "Row" }) {
      ...PropTable_metadata
    }
    Col: componentMetadata(displayName: { eq: "Col" }) {
      ...PropTable_metadata
    }
    Clearfix: componentMetadata(displayName: { eq: "Clearfix" }) {
      ...PropTable_metadata
    }
  }
`;
