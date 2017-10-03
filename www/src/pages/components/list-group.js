import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import ListGroupDefault from '!!raw-loader!../../examples/ListGroupDefault';
import ListGroupLinked from '!!raw-loader!../../examples/ListGroupLinked';
import ListGroupActive from '!!raw-loader!../../examples/ListGroupActive';
import ListGroupStyle from '!!raw-loader!../../examples/ListGroupStyle';
import ListGroupHeader from '!!raw-loader!../../examples/ListGroupHeader';
import ListGroupCustom from '!!raw-loader!../../examples/ListGroupCustom';

export default function ListGroupSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="listgroup">List group</Anchor>
        <small>ListGroup, ListGroupItem</small>
      </h2>

      <p>List groups are a flexible and powerful component for displaying not only simple lists of elements, but complex ones with custom content.</p>

      <h3><Anchor id="listgroup-default">Centers by default</Anchor></h3>
      <ReactPlayground codeText={ListGroupDefault} />

      <h3><Anchor id="listgroup-linked">Linked</Anchor></h3>
      <p>Set the <code>href</code> or <code>onClick</code> prop on <code>ListGroupItem</code>, to create a linked or clickable element.</p>
      <ReactPlayground codeText={ListGroupLinked} />

      <h3><Anchor id="listgroup-styling-state">Styling by state</Anchor></h3>
      <p>Set the <code>active</code> or <code>disabled</code> prop to <code>true</code> to mark or disable the item.</p>
      <ReactPlayground codeText={ListGroupActive} />

      <h3><Anchor id="listgroup-styling-color">Styling by color</Anchor></h3>
      <p>Set the <code>bsStyle</code> prop to style the item</p>
      <ReactPlayground codeText={ListGroupStyle} />

      <h3><Anchor id="listgroup-with-header">With header</Anchor></h3>
      <p>Set the <code>header</code> prop to create a structured item, with a heading and a body area.</p>
      <ReactPlayground codeText={ListGroupHeader} />

      <h3><Anchor id="listgroup-with-custom-children">With custom component children</Anchor></h3>
      <p>
        When using ListGroupItems directly, ListGroup looks at whether the items have href
        or onClick props to determine which DOM elements to emit. However, with custom item
        components as children to <code>ListGroup</code>, set the
        <code>componentClass</code> prop to specify which element <code>ListGroup</code> should output.
      </p>
      <ReactPlayground codeText={ListGroupCustom} />

      <h3><Anchor id="listgroup-props">Props</Anchor></h3>

      <h4><Anchor id="listgroup-props-group">ListGroup</Anchor></h4>
      <PropTable metadata={data.ListGroup}/>

      <h4><Anchor id="listgroup-props-item">ListGroupItem</Anchor></h4>
      <PropTable metadata={data.ListGroupItem}/>
    </div>
  );
}

export const query = graphql`
  query ListGroupQuery {
    ListGroup: componentMetadata(displayName: { eq: "ListGroup" }) {
      ...PropTable_metadata
    }
    ListGroupItem: componentMetadata(displayName: { eq: "ListGroupItem" }) {
      ...PropTable_metadata
    }
  }
`;
