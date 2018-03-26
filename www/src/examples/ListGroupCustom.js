function CustomComponent({ children }) {
  return (
    <li className="list-group-item" onClick={() => {}}>
      {children}
    </li>
  );
}

render(
  <ListGroup componentClass="ul">
    <CustomComponent>Custom Child 1</CustomComponent>
    <CustomComponent>Custom Child 2</CustomComponent>
    <CustomComponent>Custom Child 3</CustomComponent>
  </ListGroup>
);
