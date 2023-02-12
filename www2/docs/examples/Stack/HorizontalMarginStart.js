import Stack from 'react-bootstrap/Stack';

function HorizontalMarginStartExample() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="bg-light border">First item</div>
      <div className="bg-light border ms-auto">Second item</div>
      <div className="bg-light border">Third item</div>
    </Stack>
  );
}

export default HorizontalMarginStartExample;
