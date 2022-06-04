import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Button from 'react-bootstrap/Button';

function PrefixesExample() {
  return (
    <>
      {/* Hint: inspect the markup to see how the classes differ */}
      <ThemeProvider prefixes={{ btn: 'my-btn' }}>
        <Button variant="primary">My Button</Button>
      </ThemeProvider>{' '}
      <Button bsPrefix="super-btn" variant="primary">
        Super button
      </Button>
    </>
  );
}

export default PrefixesExample;
