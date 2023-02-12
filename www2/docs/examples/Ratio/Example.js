import Ratio from 'react-bootstrap/Ratio';

function BasicExample() {
  return (
    <div style={{ width: 660, height: 'auto' }}>
      <Ratio aspectRatio="16x9">
        <embed type="image/svg+xml" src="/TheresaKnott_castle.svg" />
      </Ratio>
    </div>
  );
}

export default BasicExample;
