import Table from 'react-bootstrap/Table';

const BreakpointTable = () => (
  <Table>
    <thead>
      <tr>
        <th>Breakpoint</th>
        <th>Class infix</th>
        <th>Dimensions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>X-Small</td>
        <td>
          <em>None</em>
        </td>
        <td>&lt;576px</td>
      </tr>
      <tr>
        <td>Small</td>
        <td>
          <code>sm</code>
        </td>
        <td>≥576px</td>
      </tr>
      <tr>
        <td>Medium</td>
        <td>
          <code>md</code>
        </td>
        <td>≥768px</td>
      </tr>
      <tr>
        <td>Large</td>
        <td>
          <code>lg</code>
        </td>
        <td>≥992px</td>
      </tr>
      <tr>
        <td>Extra large</td>
        <td>
          <code>xl</code>
        </td>
        <td>≥1200px</td>
      </tr>
      <tr>
        <td>Extra extra large</td>
        <td>
          <code>xxl</code>
        </td>
        <td>≥1400px</td>
      </tr>
    </tbody>
  </Table>
);

export default BreakpointTable;
