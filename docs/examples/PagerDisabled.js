const pagerInstance = (
  <Pager>
    <Pager.Item previous href="#">&larr; Previous</Pager.Item>
    <Pager.Item disabled next href="#">Next &rarr;</Pager.Item>
  </Pager>
);

ReactDOM.render(pagerInstance, mountNode);
