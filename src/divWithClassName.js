import React from 'react';
import classNames from 'classnames';

export default (className) =>
  React.forwardRef((p, ref) => (
    <div {...p} ref={ref} className={classNames(p.className, className)} />
  ));
