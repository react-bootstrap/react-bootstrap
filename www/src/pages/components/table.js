import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import TableBasic from '../../examples/TableBasic';
import TableSmall from '../../examples/TableSmall';
import TableDark from '../../examples/TableDark';
import TableResponsive from '../../examples/TableResponsive';
import TableResponsiveBreakpoints from '../../examples/TableResponsiveBreakpoints';

export default function TableSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tables">Tables</Anchor>
      </h2>

      <p>
        Use the <code>striped</code>, <code>bordered</code> and{' '}
        <code>hover</code> props to customise the table.
      </p>
      <ReactPlayground codeText={TableBasic} />

      <h3>
        <Anchor id="table-small">Small Table</Anchor>
      </h3>
      <p>
        Use <code>size="sm"</code> to make tables compact by cutting cell
        padding in half.
      </p>
      <ReactPlayground codeText={TableSmall} />

      <h3>
        <Anchor id="table-inverted">Inverted Table</Anchor>
      </h3>
      <p>
        Use <code>variant="dark"</code> to invert the colors of the table and
        get light text on a dark background.
      </p>
      <ReactPlayground codeText={TableDark} />

      <h2>
        <Anchor id="table-responsive">Responsive</Anchor>
      </h2>
      <p>
        Responsive tables allow tables to be scrolled horizontally with ease.
      </p>

      <h3>
        <Anchor id="table-responsive-always">Always Responsive</Anchor>
      </h3>
      <p>
        Across every breakpoint, use <code>responsive</code> for horizontally
        scrolling tables. Responsive tables are wrapped automatically in a{' '}
        <code>div</code>.
      </p>
      <ReactPlayground codeText={TableResponsive} />

      <h3>
        <Anchor id="table-responsive-breakpoint">Breakpoint specific</Anchor>
      </h3>
      <p>
        Use <code>responsive="sm"</code>, <code>responsive="md"</code>,{' '}
        <code>responsive="lg"</code>, or <code>responsive="xl"</code> as needed
        to create responsive tables up to a particular breakpoint. From that
        breakpoint and up, the table will behave normally and not scroll
        horizontally.
      </p>
      <ReactPlayground codeText={TableResponsiveBreakpoints} />

      <h3>
        <Anchor id="table-props">Props</Anchor>
        <LinkToSource component={data.Table.displayName} />
      </h3>
      <PropTable metadata={data.Table} />
    </div>
  );
}

export const query = graphql`
  query TableQuery {
    Table: componentMetadata(displayName: { eq: "Table" }) {
      ...PropTable_metadata
    }
  }
`;
