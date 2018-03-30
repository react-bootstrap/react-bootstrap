import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import CardBasic from '../../examples/Card/Basic';

export default function CardSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="cards">Cards</Anchor>
        <small>Card, CardBody, CardTitle, CardImgTop</small>
      </h2>

      <p className="lead">
        Bootstrap’s cards provide a flexible and extensible content container
        with multiple variants and options.
      </p>

      <h3>
        <Anchor id="card-basic-example">Basic Example</Anchor>
      </h3>
      <ReactPlayground codeText={CardBasic} />

      <h3>
        <Anchor id="card-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="card-props-card">Card</Anchor>
        <LinkToSource component={data.Card.displayName} />
      </h4>
      <PropTable metadata={data.Card} />

      <h4>
        <Anchor id="card-props-card-body">Card.Body</Anchor>
        <LinkToSource component={data.CardBody.displayName} />
      </h4>
      <PropTable metadata={data.CardBody} />

      <h4>
        <Anchor id="card-props-card-title">Card.Title</Anchor>
        <LinkToSource component={data.CardTitle.displayName} />
      </h4>
      <PropTable metadata={data.CardTitle} />
    </div>
  );
}

export const query = graphql`
  query CardQuery {
    Card: componentMetadata(displayName: { eq: "Card" }) {
      ...PropTable_metadata
    }
    CardBody: componentMetadata(displayName: { eq: "CardBody" }) {
      ...PropTable_metadata
    }
    CardTitle: componentMetadata(displayName: { eq: "CardTitle" }) {
      ...PropTable_metadata
    }
  }
`;
