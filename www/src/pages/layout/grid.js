import { graphql } from 'gatsby';
import React from 'react';
import { css } from 'astroturf';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import GridAutoLayout from '../../examples/Grid/AutoLayout';
import GridAutoLayoutSizing from '../../examples/Grid/AutoLayoutSizing';
import GridAutoLayoutVariable from '../../examples/Grid/AutoLayoutVariable';
import GridOffsetting from '../../examples/Grid/Offsetting';
import GridOrdering from '../../examples/Grid/Ordering';
import GridResponsive from '../../examples/Grid/Responsive';
import GridResponsiveAuto from '../../examples/Grid/ResponsiveAuto';
import withLayout from '../../withLayout';

const styles = css`
  @import '../../css/theme';

  .example {
    :global {
      .row > .col,
      .row > [class^='col-'] {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        background-color: $brand-light;
        border: 1px solid $brand;
      }

      .row + .row {
        margin-top: 1rem;
      }
    }
  }
`;

export default withLayout(function GridSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="grid">
        Grid system
      </LinkedHeading>
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
      <LinkedHeading h="2" id="auto-layout">
        Auto-layout columns
      </LinkedHeading>
      <p>
        When no column widths are specified the <code>Col</code> component will
        render equal width columns
      </p>
      <ReactPlayground
        codeText={GridAutoLayout}
        exampleClassName={styles.example}
      />

      <LinkedHeading h="3" id="auto-layout-col-sizing">
        Setting one column width
      </LinkedHeading>

      <p>
        Auto-layout for flexbox grid columns also means you can set the width of
        one column and have the sibling columns automatically resize around it.
        You may use predefined grid classes (as shown below), grid mixins, or
        inline widths. Note that the other columns will resize no matter the
        width of the center column.
      </p>
      <ReactPlayground
        codeText={GridAutoLayoutSizing}
        exampleClassName={styles.example}
      />

      <LinkedHeading h="3" id="auto-layout-variable-sizes">
        Variable width content
      </LinkedHeading>
      <p>
        Set the column value (for any breakpoint size) to <code>"auto"</code> to
        size columns based on the natural width of their content.
      </p>
      <ReactPlayground
        codeText={GridAutoLayoutVariable}
        exampleClassName={styles.example}
      />
      <LinkedHeading h="2" id="responsive-grids">
        Responsive grids
      </LinkedHeading>
      <p>
        The <code>Col</code> lets you specify column widths across 5 breakpoint
        sizes (xs, sm, md, large, and xl). For every breakpoint, you can specify
        the amount of columns to span, or set the prop to{' '}
        <code>{'<Col lg={true} />'}</code> for auto layout widths.
      </p>
      <ReactPlayground
        codeText={GridResponsiveAuto}
        exampleClassName={styles.example}
      />
      <p>
        You can also mix and match breakpoints to create different grids
        depending on the screen size.
      </p>
      <ReactPlayground
        codeText={GridResponsive}
        exampleClassName={styles.example}
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
        exampleClassName={styles.example}
      />
      <p>
        For offsetting grid columns you can set an `offset` value, or, for more
        general layout, use the margin class utilities.
      </p>
      <ReactPlayground
        codeText={GridOffsetting}
        exampleClassName={styles.example}
      />
      <LinkedHeading h="2" id="grid-props">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.Container} />
      <ComponentApi metadata={data.Row} />
      <ComponentApi metadata={data.Col} />
    </>
  );
});

export const query = graphql`
  query GridQuery {
    Container: componentMetadata(displayName: { eq: "Container" }) {
      ...ComponentApi_metadata
    }
    Row: componentMetadata(displayName: { eq: "Row" }) {
      ...ComponentApi_metadata
    }
    Col: componentMetadata(displayName: { eq: "Col" }) {
      ...ComponentApi_metadata
    }
  }
`;
