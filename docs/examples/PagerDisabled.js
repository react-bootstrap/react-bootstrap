const pagerInstance = (
  <Pager>
    <PageItem previous href="#">&larr; Previous</PageItem>
    <PageItem disabled next href="#">Next &rarr;</PageItem>
  </Pager>
);

React.render(pagerInstance, mountNode);
