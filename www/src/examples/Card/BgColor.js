[
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
].map((variant, idx) => (
  <>
    <Card
      bg={variant}
      key={idx}
      text={variant === "light" ? "dark" : "white"}
      style={{ width: "18rem" }}
    >
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title>{variant} Card Title </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br />
  </>
));





