import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import GridAutoLayout from '../../examples/Grid/AutoLayout';
import GridAutoLayoutSizing from '../../examples/Grid/AutoLayoutSizing';
import GridAutoLayoutVariable from '../../examples/Grid/AutoLayoutVariable';
import GridOffsetting from '../../examples/Grid/Offsetting';
import GridOrdering from '../../examples/Grid/Ordering';
import GridResponsive from '../../examples/Grid/Responsive';
import GridResponsiveAuto from '../../examples/Grid/ResponsiveAuto';
import withLayout from '../../withLayout';

export default withLayout(function GridSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="grid">Grid system</Anchor>{' '}
        <small>Container, Row, Col, Clearfix</small>
      </h1>
      <p>
        Bootstrap’s grid system uses a series of containers, rows, and columns
        to layout and align content. It’s built with{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes">
          flexbox
        </a>{' '}
        and is fully responsive. Below is an example and an in-depth look at how
        the grid comes together.{' '}
      </p>
      <p>
        <strong>New to or unfamiliar with flexbox?</strong>{' '}
        <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background">
          Read this CSS Tricks flexbox guide
        </a>{' '}
        for background, terminology, guidelines, and code snippets.
      </p>
      <h2>
        <Anchor id="auto-layout">Auto-layout columns</Anchor>
      </h2>
      <p>
        When no column widths are specified the <code>Col</code> component will
        render equal width columns
      </p>
      <ReactPlayground
        codeText={GridAutoLayout}
        exampleClassName="grid-examples"
      />

      <h3>
        <Anchor id="auto-layout-col-sizing">Setting one column width</Anchor>
      </h3>

      <p>
        Auto-layout for flexbox grid columns also means you can set the width of
        one column and have the sibling columns automatically resize around it.
        You may use predefined grid classes (as shown below), grid mixins, or
        inline widths. Note that the other columns will resize no matter the
        width of the center column.
      </p>
      <ReactPlayground
        codeText={GridAutoLayoutSizing}
        exampleClassName="grid-examples"
      />

      <h3>
        <Anchor id="auto-layout-variable-sizes">Variable width content</Anchor>
      </h3>
      <p>
        Set the column value (for any breakpoint size) to <code>"auto"</code> to
        size columns based on the natural width of their content.
      </p>
      <ReactPlayground
        codeText={GridAutoLayoutVariable}
        exampleClassName="grid-examples"
      />
      <h3>
        <Anchor id="responsive-grids">Responsive grids</Anchor>
      </h3>
      <p>
        The <code>Col</code> lets you specify column widths across 5 breakpoint
        sizes (xs, sm, md, large, and xl). For every breakpoint, you can specify
        the amount of columns to span, or set the prop to{' '}
        <code>{'<Col lg={true} />'}</code> for auto layout widths.
      </p>
      <ReactPlayground
        codeText={GridResponsiveAuto}
        exampleClassName="grid-examples"
      />
      <p>
        You can also mix and match breakpoints to create different grids
        depending on the screen size.
      </p>
      <ReactPlayground
        codeText={GridResponsive}
        exampleClassName="grid-examples"
      />
      <p>
        The <code>Col</code> breakpoint props also have a more complicated{' '}
        <code>object</code> prop form:{' '}
        <code>{`{span: number, order: number, offset: number}`}</code> for
        specifying offsets and ordering affects.
      </p>

      <p>
        You can use the `order` property to control the{' '}
        <strong>visual order</strong> of your content.
      </p>
      <ReactPlayground
        codeText={GridOrdering}
        exampleClassName="grid-examples"
      />
      <p>
        For offsetting grid columns you can set an `offset` value, or, for more
        general layout, use the margin class utilities.
      </p>
      <ReactPlayground
        codeText={GridOffsetting}
        exampleClassName="grid-examples"
      />
      <h3>
        <Anchor id="grid-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="grid-props-grid">Grid</Anchor>
      </h4>
      <PropTable metadata={data.Container} />

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
});

export const query = graphql`
  query GridQuery {
    Container: componentMetadata(displayName: { eq: "Container" }) {
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
