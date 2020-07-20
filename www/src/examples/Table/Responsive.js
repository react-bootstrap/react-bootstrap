<Table responsive>
  <thead>
    <tr>
      <th>#</th>
      {(function () {
        const headings = [];
        for (let i = 0; i < 50; i++) headings.push(<th>Table heading</th>);
        return headings;
      })()}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {(function () {
        const cells = [];
        for (let i = 0; i < 50; i++) cells.push(<td>Table cell</td>);
        return cells;
      })()}
    </tr>
    <tr>
      <td>2</td>
      {(function () {
        const cells = [];
        for (let i = 0; i < 50; i++) cells.push(<td>Table cell</td>);
        return cells;
      })()}
    </tr>
    <tr>
      <td>3</td>
      {(function () {
        const cells = [];
        for (let i = 0; i < 50; i++) cells.push(<td>Table cell</td>);
        return cells;
      })()}
    </tr>
  </tbody>
</Table>;
