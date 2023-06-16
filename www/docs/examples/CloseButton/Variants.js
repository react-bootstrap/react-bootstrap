import CloseButton from 'react-bootstrap/CloseButton';

function VariantsExample() {
  return (
    <div data-bs-theme="dark" className='bg-dark p-2'>
      <CloseButton />
      <CloseButton disabled />
    </div>
  );
}

export default VariantsExample;
