import { useEffect, useRef } from 'react';

const CarbonAds = (props) => {
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

    return () => {
      while (ref.current?.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
    };
  }, []);

  return <div ref={ref} {...props} />;
};

export default CarbonAds;
