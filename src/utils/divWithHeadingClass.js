import React from 'react';
import classNames from 'classnames';

export default headingClass =>
  React.forwardRef((p, ref) => (
    <div {...p} ref={ref} className={classNames(p.className, headingClass)} />
  ));
