import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? <Spinner size="sm" /> : 'Click to load'}
    </Button>
  );
}

export default LoadingButton;
