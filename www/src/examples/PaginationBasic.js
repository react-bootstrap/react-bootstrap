let active = 7;
let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item active={number === active}>{number}</Pagination.Item>
  );
}

const paginationBasic = (
  <div>
    <Pagination bsSize="large">{items}</Pagination>
    <br />

    <Pagination bsSize="medium">{items}</Pagination>
    <br />

    <Pagination bsSize="small">{items}</Pagination>
  </div>
);

render(paginationBasic);
