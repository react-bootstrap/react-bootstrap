import * as React from 'react';
import { useEffect, useRef } from 'react';

const PlaceholderImage: React.FC<any> = (props) => {
  const image = useRef<HTMLImageElement>();

  useEffect(() => {
    async function init() {
      const { default: holderjs } = await import('holderjs');

      holderjs.run({
        domain: 'holder.js',
        images: image.current,
        object: null,
        bgnodes: null,
        stylenodes: null,
      });
      holderjs.setResizeUpdate(image.current, false);
    }

    init();
  }, []);

  const { width, height, text, bg, fg, ...rest } = props;
  const src = `holder.js/${width}x${height}?text=${text}&auto=yes&bg=${bg}&fg=${fg}`;
  return <img ref={image} data-src={src} alt={text} {...rest} />;
};

PlaceholderImage.displayName = 'PlaceholderImage';

export default PlaceholderImage;
