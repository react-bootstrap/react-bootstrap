import { useEffect, useRef } from 'react';

const CarbonAds = () => {
  const ref = useRef();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.id = '_carbonads_js';
      script.type = 'text/javascript';
      script.src =
        '//cdn.carbonads.com/carbon.js?serve=CE7IP2QY&placement=react-bootstrapgithubio';

      ref.current.appendChild(script);
    }
  }, []);

  return <div ref={ref} />;
};

export default CarbonAds;
