import * as React from 'react';
import clsx from 'clsx';

export default (className: string) =>
  // eslint-disable-next-line react/display-name
  React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>((p, ref) => (
    <div {...p} ref={ref} className={clsx((p as any).className, className)} />
  ));
