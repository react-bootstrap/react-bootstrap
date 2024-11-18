import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { LiveContext, LivePreview } from 'react-live';
import qsa from 'dom-helpers/querySelectorAll';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import useMutationObserver from '@restart/hooks/useMutationObserver';
import useEventCallback from '@restart/hooks/useEventCallback';

export interface PreviewProps {
  className?: string | undefined;
}

const Preview: React.FC<PreviewProps> = ({ className }) => {
  const exampleRef = useRef();
  const [hjs, setHjs] = useState(null);
  const live = useContext(LiveContext);

  useEffect(() => {
    import('holderjs').then(({ default: hjsModule }) => {
      hjsModule.addTheme('gray', {
        bg: '#373940',
        fg: '#999',
        fontweight: 'normal',
      });

      setHjs(hjsModule);
    });
  }, []);

  useIsomorphicEffect(() => {
    if (!hjs) {
      return;
    }

    hjs.run({
      theme: 'gray',
      images: qsa(exampleRef.current, 'img'),
    });
  }, [hjs, (live as any).element]);

  useMutationObserver(
    exampleRef.current,
    {
      childList: true,
      subtree: true,
    },
    (mutations) => {
      mutations.forEach((mutation) => {
        if (hjs && mutation.addedNodes.length > 0) {
          hjs.run({
            theme: 'gray',
            images: qsa(exampleRef.current, 'img'),
          });
        }
      });
    },
  );

  const handleCustomRedirect = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
    }
  })

  return (
    <div ref={exampleRef}>
      <LivePreview className={className} onClick={handleCustomRedirect}/>
    </div>
  );
};

export default Preview;
