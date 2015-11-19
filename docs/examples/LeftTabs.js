const tabsInstance = (
  <TabContainer id="left-tabs-example" defaultActiveKey="first">
    <div className="clearfix">
      <Nav bsStyle="pills" className="col-sm-4" stacked>
        <NavItem eventKey="first">
          Tab 1
        </NavItem>
        <NavItem eventKey="second">
          Tab 2
        </NavItem>
      </Nav>
      <TabContent animation className="col-sm-8">
        <TabPane eventKey="first">
          Tab 1 content
        </TabPane>
        <TabPane eventKey="second">
          Tab 2 content
        </TabPane>
      </TabContent>
    </div>
  </TabContainer>
);

ReactDOM.render(tabsInstance, mountNode);
