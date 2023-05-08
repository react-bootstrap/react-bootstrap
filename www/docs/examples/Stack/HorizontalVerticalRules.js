import Stack from 'react-bootstrap/Stack';

function HorizontalVerticalRulesExample() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="bg-warning border">First item</div>
      <div className="bg-warning border ms-auto">Second item</div>
      <div className="vr" />
      <div className="bg-warning border">Third item</div>
    </Stack>
  );
}

export default HorizontalVerticalRulesExample;
