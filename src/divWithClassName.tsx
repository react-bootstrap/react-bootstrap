import React from 'react';
import classNames from 'classnames';

export default (className: string) =>
  React.forwardRef<HTMLDivElement>((p, ref) => (
    <div
      {...p}
      ref={ref}
      className={classNames((p as any).className, className)}
    />
  ));
