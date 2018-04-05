import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';

import CardBasic from '../../examples/Card/Basic';
import CardBodyOnly from '../../examples/Card/BodyOnly';
import CardText from '../../examples/Card/Text';
import CardImageAndText from '../../examples/Card/ImageAndText';
import CardListGroups from '../../examples/Card/ListGroups';
import CardListGroupWithHeader from '../../examples/Card/ListGroupWithHeader';
import CardKitchenSink from '../../examples/Card/KitchenSink';
import CardWithHeader from '../../examples/Card/WithHeader';
import CardWithHeaderStyled from '../../examples/Card/WithHeaderStyled';
import CardWithHeaderAndQuote from '../../examples/Card/WithHeaderAndQuote';
import CardHeaderAndFooter from '../../examples/Card/HeaderAndFooter';
import CardImgOverlay from '../../examples/Card/ImgOverlay';
import CardGroup from '../../examples/Card/Group';

export default function CardSection({ data }) {
  return (
    <div className="bs-docs-section">
      <Heading h="1" id="cards">
        Cards
      </Heading>

      <p className="lead">
        Bootstrap’s cards provide a flexible and extensible content container
        with multiple variants and options.
      </p>

      <Heading h="3" id="card-example-basic">
        Basic Example
      </Heading>
      <ReactPlayground codeText={CardBasic} />

      <Heading h="2" id="card-content-types">
        Content types
      </Heading>
      <Heading h="3" id="card-example-body">
        Body
      </Heading>
      <p>
        Use <code>Card.Body</code> to pad content inside a <code>Card</code>.
      </p>
      <ReactPlayground codeText={CardBodyOnly} />

      <Heading h="3" id="card-example-text">
        Title, text, and links
      </Heading>
      <p>
        Using <code>Card.Title</code>, <code>Card.Subtitle</code>, and{' '}
        <code>Card.Text</code> inside the <code>Card.Body</code> will line them
        up nicely. <code>Card.Link</code>s are used to line up links next to
        each other.
      </p>
      <ReactPlayground codeText={CardText} />

      <Heading h="2" id="card-example-images">
        Images
      </Heading>
      <ReactPlayground codeText={CardImageAndText} />

      <Heading h="2" id="card-example-list-groups">
        List Groups
      </Heading>
      <ReactPlayground codeText={CardListGroups} />

      <ReactPlayground codeText={CardListGroupWithHeader} />

      <Heading h="2" id="card-example-kitchen-sink">
        Kitchen Sink
      </Heading>
      <ReactPlayground codeText={CardKitchenSink} />

      <Heading h="2" id="card-example-header-and-footer">
        Header and Footer
      </Heading>
      <p>
        You may add a header by adding a <code>Card.Header</code> component.
      </p>
      <ReactPlayground codeText={CardWithHeader} />

      <p>
        A <code>CardHeader</code> can be styled by passing a heading element
        through the <code>componentClass</code> prop
      </p>
      <ReactPlayground codeText={CardWithHeaderStyled} />

      <ReactPlayground codeText={CardWithHeaderAndQuote} />
      <ReactPlayground codeText={CardHeaderAndFooter} />

      <Heading h="2" id="card-example-img-overlay">
        Image Overlays
      </Heading>
      <p />
      <ReactPlayground codeText={CardImgOverlay} />

      <Heading h="2" id="card-example-layout">
        Card layout
      </Heading>
      <Heading h="3" id="card-example-card-group">
        Card Groups
      </Heading>
      <ReactPlayground codeText={CardGroup} />

      {/* PROPS SECTION */}

      <Heading h="2" id="card-props">
        Props
      </Heading>

      <ComponentApi metadata={data.Card} />
      <ComponentApi metadata={data.CardBody} />
      <ComponentApi metadata={data.CardImg} />
      <ComponentApi metadata={data.CardTitle} />
      <ComponentApi metadata={data.CardSubtitle} />
    </div>
  );
}

export const query = graphql`
  query CardQuery {
    Card: componentMetadata(displayName: { eq: "Card" }) {
      ...ComponentApi_metadata
    }
    CardBody: componentMetadata(displayName: { eq: "CardBody" }) {
      ...ComponentApi_metadata
    }
    CardImg: componentMetadata(displayName: { eq: "CardImg" }) {
      ...ComponentApi_metadata
    }
    CardTitle: componentMetadata(displayName: { eq: "CardTitle" }) {
      ...ComponentApi_metadata
    }
    CardSubtitle: componentMetadata(displayName: { eq: "CardSubtitle" }) {
      ...ComponentApi_metadata
    }
  }
`;
