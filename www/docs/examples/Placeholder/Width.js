import Placeholder from 'react-bootstrap/Placeholder';

function WidthExample() {
  return (
    <>
      <Placeholder xs={6} />
      <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
    </>
  );
}

export default WidthExample;
