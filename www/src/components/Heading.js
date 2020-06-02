import React, { useEffect } from 'react';
import classNames from 'classnames';
import mapContextToProps from '@restart/context/mapContextToProps';
import { css } from 'astroturf';

import { TocContext } from './Toc';

const styles = css`
  .heading {
    composes: __heading from global;

    position: relative;
    pointer-events: none;

    &:before {
      display: block;
      height: 6rem;
      margin-top: -6rem;
      visibility: hidden;
      content: '';
    }
  }
  .inner {
    pointer-events: auto;
  }
`;

const Heading = ({ h, id, title, className, children, registerNode }) => {
  useEffect(() => {
    if (registerNode) {
      registerNode(parseInt(h, 10), title, id);
    }
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  const H = `h${h}`;
  return (
    <H id={id} className={classNames(className, styles.heading)}>
      <div className={styles.inner}>{children}</div>
    </H>
  );
};

export default mapContextToProps(
  TocContext,
  (c) => ({ registerNode: c.registerNode }),
  Heading,
);
