const CustomComponent = React.createClass({
  render() {
    return (
      <li
        className="list-group-item"
        onClick={() => {}}>
        {this.props.children}
      </li>
    );
  }
});

const listgroupInstance = (
  <ListGroup componentClass="ul">
    <CustomComponent>Custom Child 1 </CustomComponent>
    <CustomComponent>Custom Child 2 </CustomComponent>
    <CustomComponent>Custom Child 3</CustomComponent>
  </ListGroup>
);

React.render(listgroupInstance, mountNode);
