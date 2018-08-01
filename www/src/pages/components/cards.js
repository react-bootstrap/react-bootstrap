import { graphql } from 'gatsby';
import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import Heading from '../../components/Heading';
import ReactPlayground from '../../components/ReactPlayground';
import CardBasic from '../../examples/Card/Basic';
import CardBgColor from '../../examples/Card/BgColor';
import CardBodyOnly from '../../examples/Card/BodyOnly';
import CardBodyShorthand from '../../examples/Card/BodyShorthand';
import CardBorder from '../../examples/Card/Border';
import CardColumns from '../../examples/Card/Columns';
import CardDeck from '../../examples/Card/Deck';
import CardGroup from '../../examples/Card/Group';
import CardHeaderAndFooter from '../../examples/Card/HeaderAndFooter';
import CardImageAndText from '../../examples/Card/ImageAndText';
import CardImgOverlay from '../../examples/Card/ImgOverlay';
import CardKitchenSink from '../../examples/Card/KitchenSink';
import CardListGroups from '../../examples/Card/ListGroups';
import CardListGroupWithHeader from '../../examples/Card/ListGroupWithHeader';
import CardNavPills from '../../examples/Card/NavPills';
import CardNavTabs from '../../examples/Card/NavTabs';
import CardText from '../../examples/Card/Text';
import CardWithHeader from '../../examples/Card/WithHeader';
import CardWithHeaderAndQuote from '../../examples/Card/WithHeaderAndQuote';
import CardWithHeaderStyled from '../../examples/Card/WithHeaderStyled';
import withLayout from '../../withLayout';

export default withLayout(function CardSection({ data }) {
  return (
    <>
      <Heading h="1" id="cards">
        Cards
      </Heading>

      <p className="lead">
        Bootstrap’s cards provide a flexible and extensible content container
        with multiple variants and options.
      </p>

      <Heading h="2" id="card-example-basic">
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
      <p>
        Alernatively, you can use this shorthand version for Cards with body
        only, and no other children
      </p>
      <ReactPlayground codeText={CardBodyShorthand} />

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
        through the <code>as</code> prop
      </p>
      <ReactPlayground codeText={CardWithHeaderStyled} />

      <ReactPlayground codeText={CardWithHeaderAndQuote} />
      <ReactPlayground codeText={CardHeaderAndFooter} />

      <Heading h="2" id="card-example-img-overlay">
        Image Overlays
      </Heading>
      <ReactPlayground codeText={CardImgOverlay} />

      <Heading h="2" id="card-example-navigation">
        Navigation
      </Heading>
      <ReactPlayground codeText={CardNavTabs} />
      <ReactPlayground codeText={CardNavPills} />

      <Heading h="2" id="card-example-styles">
        Card Styles
      </Heading>
      <Heading h="3" id="card-example-card-background">
        Background Color
      </Heading>
      <p>
        You can change a card's appearance by changing their <code>bg</code>,
        and <code>text</code> props.
      </p>
      <ReactPlayground codeText={CardBgColor} />

      <Heading h="3" id="card-example-card-border">
        Border Color
      </Heading>
      <ReactPlayground codeText={CardBorder} />

      <Heading h="2" id="card-example-layout">
        Card layout
      </Heading>
      <Heading h="3" id="card-example-card-group">
        Card Groups
      </Heading>
      <ReactPlayground codeText={CardGroup} />

      <Heading h="3" id="card-example-card-deck">
        Card Deck
      </Heading>
      <ReactPlayground codeText={CardDeck} />

      <Heading h="3" id="card-example-card-columns">
        Card Columns
      </Heading>
      <ReactPlayground codeText={CardColumns} />

      {/* PROPS SECTION */}

      <Heading h="2" id="card-props">
        Props
      </Heading>

      <ComponentApi metadata={data.Card} />
      <ComponentApi metadata={data.CardImg} />
    </>
  );
});

export const query = graphql`
  query CardQuery {
    Card: componentMetadata(displayName: { eq: "Card" }) {
      ...ComponentApi_metadata
    }
    CardImg: componentMetadata(displayName: { eq: "CardImg" }) {
      ...ComponentApi_metadata
    }
  }
`;
