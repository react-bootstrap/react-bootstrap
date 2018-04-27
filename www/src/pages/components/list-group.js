import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import withLayout from '../../withLayout';
import ListGroupDefault from '../../examples/ListGroup/Default';
import ListGroupLinked from '../../examples/ListGroup/Linked';
import ListGroupActive from '../../examples/ListGroup/Active';
import ListGroupStyle from '../../examples/ListGroup/Style';
import ListGroupCustom from '../../examples/ListGroup/Custom';

export default withLayout(function ListGroupSection({ data }) {
  return (
    <>
      <Heading h="1" className="page-header" id="listgroup">
        List group
      </Heading>
      <p className="lead">
        List groups are a flexible and powerful component for displaying not
        only simple lists of elements, but complex ones with custom content.
      </p>

      <Heading h="2" id="listgroup-example-default">
        Basic Example
      </Heading>
      <ReactPlayground codeText={ListGroupDefault} />

      <Heading h="2" id="listgroup-styling-state">
        Styling by state
      </Heading>
      <p>
        Set the <code>active</code> or <code>disabled</code> prop to{' '}
        <code>true</code> to mark or disable the item.
      </p>
      <ReactPlayground codeText={ListGroupActive} />

      <Heading h="3" id="listgroup-example-linked">
        Linked
      </Heading>
      <p>
        Set the <code>href</code> or <code>onClick</code> prop on{' '}
        <code>ListGroupItem</code>, to create a linked or clickable element.
      </p>
      <ReactPlayground codeText={ListGroupLinked} />

      <Heading h="3" id="listgroup-styling-color">
        Styling by color
      </Heading>
      <p>
        Set the <code>bsStyle</code> prop to style the item
      </p>
      <ReactPlayground codeText={ListGroupStyle} />

      <Heading h="3" id="listgroup-with-custom-children">
        With custom component children
      </Heading>
      <p>
        When using ListGroupItems directly, ListGroup looks at whether the items
        have href or onClick props to determine which DOM elements to emit.
        However, with custom item components as children to{' '}
        <code>ListGroup</code>, set the
        <code>as</code> prop to specify which element <code>ListGroup</code>{' '}
        should output.
      </p>
      <ReactPlayground codeText={ListGroupCustom} />

      <Heading h="2" id="card-props">
        Props
      </Heading>

      <ComponentApi metadata={data.ListGroup} />
      <ComponentApi metadata={data.ListGroupItem} />
    </>
  );
});

export const query = graphql`
  query ListGroupQuery {
    ListGroup: componentMetadata(displayName: { eq: "ListGroup" }) {
      ...ComponentApi_metadata
    }
    ListGroupItem: componentMetadata(displayName: { eq: "ListGroupItem" }) {
      ...ComponentApi_metadata
    }
  }
`;
