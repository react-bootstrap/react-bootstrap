import * as React from 'react';
import classNames from 'classnames';

export default (className: string) =>
  // eslint-disable-next-line react/display-name
  React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>((p, ref) => (
    <div
      {...p}
      ref={ref}
      className={classNames((p as any).className, className)}
    />
  ));
