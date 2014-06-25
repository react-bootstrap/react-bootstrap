/** @jsx React.DOM */

var pagerInstance = (
    <Pager>
      <PageItem href="#">Previous</PageItem>
      <PageItem href="#">Next</PageItem>
    </Pager>
  );

React.renderComponent(pagerInstance, mountNode);