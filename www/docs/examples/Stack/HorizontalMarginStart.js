import Stack from 'react-bootstrap/Stack';

function HorizontalMarginStartExample() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-2">First item</div>
      <div className="p-2 ms-auto">Second item</div>
      <div className="p-2">Third item</div>
    </Stack>
  );
}

export default HorizontalMarginStartExample;
