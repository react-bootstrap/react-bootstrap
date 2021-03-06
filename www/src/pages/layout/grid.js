import { graphql } from 'gatsby';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import GridContainer from '../../examples/Grid/Container';
import GridContainerFluid from '../../examples/Grid/ContainerFluid';
import GridContainerFluidBreakpoint from '../../examples/Grid/ContainerFluidBreakpoint';
import GridAutoLayout from '../../examples/Grid/AutoLayout';
import GridRowColLayout from '../../examples/Grid/RowColLayout';
import GridRowColLayoutColWidthBreakpoint from '../../examples/Grid/RowColLayoutColWidthBreakpoint';
import GridAutoLayoutSizing from '../../examples/Grid/AutoLayoutSizing';
import GridAutoLayoutVariable from '../../examples/Grid/AutoLayoutVariable';
import GridOffsetting from '../../examples/Grid/Offsetting';
import GridOrdering from '../../examples/Grid/Ordering';
import GridOrderingFirstLast from '../../examples/Grid/OrderingFirstLast';
import GridResponsive from '../../examples/Grid/Responsive';
import GridResponsiveAuto from '../../examples/Grid/ResponsiveAuto';
import withLayout from '../../withLayout';

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
      <LinkedHeading h="2" id="container">
        Container
      </LinkedHeading>
      <p>
        Containers provide a means to center and horizontally pad your site’s
        contents. Use <code>Container</code> for a responsive pixel width.
      </p>
      <ReactPlayground codeText={GridContainer} exampleClassName="show-grid" />
      <LinkedHeading h="3" id="container-fluid">
        Fluid Container
      </LinkedHeading>
      <p>
        You can use <code>{'<Container fluid />'}</code> for width: 100% across
        all viewport and device sizes.
      </p>
      <ReactPlayground
        codeText={GridContainerFluid}
        exampleClassName="show-grid"
      />
      <p>
        You can set breakpoints for the <code>fluid</code> prop. Setting it to a
        breakpoint (<code>sm, md, lg, xl, xxl</code>) will set the{' '}
        <code>Container</code> as fluid until the specified breakpoint.
      </p>
      <ReactPlayground
        codeText={GridContainerFluidBreakpoint}
        exampleClassName="show-grid"
      />

      <LinkedHeading h="2" id="auto-layout">
        Auto-layout columns
      </LinkedHeading>
      <p>
        When no column widths are specified the <code>Col</code> component will
        render equal width columns
      </p>
      <ReactPlayground codeText={GridAutoLayout} exampleClassName="show-grid" />

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
        exampleClassName="show-grid"
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
        exampleClassName="show-grid"
      />
      <LinkedHeading h="2" id="responsive-grids">
        Responsive grids
      </LinkedHeading>
      <p>
        The <code>Col</code> lets you specify column widths across 6 breakpoint
        sizes (xs, sm, md, lg, xl and xxl). For every breakpoint, you can
        specify the amount of columns to span, or set the prop to{' '}
        <code>{'<Col lg={true} />'}</code> for auto layout widths.
      </p>
      <ReactPlayground
        codeText={GridResponsiveAuto}
        exampleClassName="show-grid"
      />
      <p>
        You can also mix and match breakpoints to create different grids
        depending on the screen size.
      </p>
      <ReactPlayground codeText={GridResponsive} exampleClassName="show-grid" />
      <p>
        The <code>Col</code> breakpoint props also have a more complicated{' '}
        <code>object</code> prop form:{' '}
        <code>{`{span: number, order: number, offset: number}`}</code> for
        specifying offsets and ordering effects.
      </p>

      <p>
        You can use the <code>order</code> property to control the{' '}
        <strong>visual order</strong> of your content.
      </p>
      <ReactPlayground codeText={GridOrdering} exampleClassName="show-grid" />

      <p>
        The <code>order</code> property also supports <code>first</code> (
        <code>order: -1</code>) and <code>last</code> (
        <code>order: $columns+1</code>).
      </p>
      <ReactPlayground
        codeText={GridOrderingFirstLast}
        exampleClassName="show-grid"
      />
      <p>
        For offsetting grid columns you can set an <code>offset</code> value or
        for a more general layout, use the margin class utilities.
      </p>
      <ReactPlayground codeText={GridOffsetting} exampleClassName="show-grid" />

      <LinkedHeading h="3" id="row-layout-col-sizing">
        Setting column widths in Row
      </LinkedHeading>

      <p>
        The <code>Row</code> lets you specify column widths across 5 breakpoint
        sizes (xs, sm, md, lg, xl and xxl). For every breakpoint, you can
        specify the amount of columns that will fit next to each other. You can
        also specify <code>auto</code> to set the columns to their natural
        widths.
      </p>
      <ReactPlayground
        codeText={GridRowColLayout}
        exampleClassName="show-grid"
      />
      <p>
        Note that <code>Row</code> column widths will override <code>Col</code>{' '}
        widths set on lower breakpoints when viewed on larger screens. The{' '}
        <code>{'<Col xs={6} />'}</code> size will be overriden by{' '}
        <code>{'<Row md={4} />'}</code> on medium and larger screens.
      </p>
      <ReactPlayground
        codeText={GridRowColLayoutColWidthBreakpoint}
        exampleClassName="show-grid"
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
