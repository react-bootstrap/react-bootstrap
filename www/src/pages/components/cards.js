import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import CardBasic from '../../examples/Card/Basic';
import CardBodyOnly from '../../examples/Card/BodyOnly';
import CardText from '../../examples/Card/Text';
import CardImageAndText from '../../examples/Card/ImageAndText';
import CardListGroups from '../../examples/Card/ListGroups';
import CardListGroupWithHeader from '../../examples/Card/ListGroupWithHeader';
import CardKitchenSink from '../../examples/Card/KitchenSink';

export default function CardSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="cards">Cards</Anchor>
        <small>
          Card, Card.Body, Card.Title, Card.Subtitle, Card.Img, Card.Header,
          Card.Footer
        </small>
      </h2>

      <p className="lead">
        Bootstrap’s cards provide a flexible and extensible content container
        with multiple variants and options.
      </p>

      <h3>
        <Anchor id="card-example-basic">Basic Example</Anchor>
      </h3>
      <ReactPlayground codeText={CardBasic} />

      <h2>
        <Anchor id="card-content-types">Content types</Anchor>
      </h2>

      <h3>
        <Anchor id="card-example-body">Body</Anchor>
      </h3>
      <p>
        Use <code>Card.Body</code> to pad content inside a <code>Card</code>.
      </p>
      <ReactPlayground codeText={CardBodyOnly} />

      <h3>
        <Anchor id="card-example-text">Title, text, and links</Anchor>
      </h3>
      <ReactPlayground codeText={CardText} />

      <h3>
        <Anchor id="card-example-images">Images</Anchor>
      </h3>
      <ReactPlayground codeText={CardImageAndText} />

      <h3>
        <Anchor id="card-example-list-groups">List Groups</Anchor>
      </h3>
      <ReactPlayground codeText={CardListGroups} />

      <ReactPlayground codeText={CardListGroupWithHeader} />

      <h3>
        <Anchor id="card-example-kitchen-sink">Kitchen Sink</Anchor>
      </h3>
      <ReactPlayground codeText={CardKitchenSink} />

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
