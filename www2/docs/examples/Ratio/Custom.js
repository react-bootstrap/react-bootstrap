import Ratio from 'react-bootstrap/Ratio';

function CustomExample() {
  return (
    <>
      <Ratio aspectRatio={1 / 2}>
        <div>2x1</div>
      </Ratio>
      <Ratio aspectRatio={50}>
        <div>2x1</div>
      </Ratio>
    </>
  );
}

export default CustomExample;
