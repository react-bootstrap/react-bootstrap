import React from 'react';
import { useClassNameMapper } from './ThemeProvider';

export default (className: string) => {
  return React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    (p, ref) => {
      const classNames = useClassNameMapper();
      return (
        <div
          {...p}
          ref={ref}
          className={classNames((p as any).className, className)}
        />
      );
    },
  );
};
