import Placeholder from 'react-bootstrap/Placeholder';

function SizeExample() {
  return (
    <>
      <Placeholder xs={12} size="lg" />
      <Placeholder xs={12} />
      <Placeholder xs={12} size="sm" />
      <Placeholder xs={12} size="xs" />
    </>
  );
}

export default SizeExample;
