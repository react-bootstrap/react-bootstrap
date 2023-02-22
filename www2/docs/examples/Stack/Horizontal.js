import Stack from 'react-bootstrap/Stack';

function HorizontalExample() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="bg-warning border">First item</div>
      <div className="bg-warning border">Second item</div>
      <div className="bg-warning border">Third item</div>
    </Stack>
  );
}

export default HorizontalExample;
