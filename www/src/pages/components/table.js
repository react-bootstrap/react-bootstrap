import { graphql } from 'gatsby';

import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import TableBasic from '../../examples/Table/Basic';
import TableDark from '../../examples/Table/Dark';
import TableResponsive from '../../examples/Table/Responsive';
import TableResponsiveBreakpoints from '../../examples/Table/ResponsiveBreakpoints';
import TableSmall from '../../examples/Table/Small';
import withLayout from '../../withLayout';

export default withLayout(function TableSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="tables">
        Tables
      </LinkedHeading>

      <p>
        Use the <code>striped</code>, <code>bordered</code> and{' '}
        <code>hover</code> props to customise the table.
      </p>
      <ReactPlayground codeText={TableBasic} />

      <LinkedHeading h="2" id="table-small">
        Small Table
      </LinkedHeading>

      <p>
        Use <code>size="sm"</code> to make tables compact by cutting cell
        padding in half.
      </p>
      <ReactPlayground codeText={TableSmall} />

      <LinkedHeading h="2" id="table-inverted">
        Dark Table
      </LinkedHeading>

      <p>
        Use <code>variant="dark"</code> to invert the colors of the table and
        get light text on a dark background.
      </p>
      <ReactPlayground codeText={TableDark} />

      <LinkedHeading h="2" id="table-responsive">
        Responsive
      </LinkedHeading>

      <p>
        Responsive tables allow tables to be scrolled horizontally with ease.
      </p>

      <LinkedHeading h="3" id="table-responsive-always">
        Always Responsive
      </LinkedHeading>

      <p>
        Across every breakpoint, use <code>responsive</code> for horizontally
        scrolling tables. Responsive tables are wrapped automatically in a{' '}
        <code>div</code>. The following example has 12 columns that are
        scrollable horizontally.
      </p>
      <ReactPlayground codeText={TableResponsive} />

      <LinkedHeading h="3" id="table-responsive-breakpoint">
        Breakpoint specific
      </LinkedHeading>

      <p>
        Use <code>responsive="sm"</code>, <code>responsive="md"</code>,{' '}
        <code>responsive="lg"</code>, or <code>responsive="xl"</code> as needed
        to create responsive tables up to a particular breakpoint. From that
        breakpoint and up, the table will behave normally and not scroll
        horizontally.
      </p>
      <ReactPlayground codeText={TableResponsiveBreakpoints} />

      <LinkedHeading h="2" id="table-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Table} />
    </>
  );
});

export const query = graphql`
  query TableQuery {
    Table: componentMetadata(displayName: { eq: "Table" }) {
      ...ComponentApi_metadata
    }
  }
`;
