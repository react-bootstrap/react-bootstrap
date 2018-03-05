import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import {
  bsClass,
  bsStyles,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';

class Badge extends React.Component {
  static propTypes = {
    pill: PropTypes.bool.isRequired
  };
  static defaultProps = {
    pill: false
  };
  render() {
    const { className, children, pill, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'pill')]: pill
    };

    return (
      <span {...elementProps} className={classNames(className, classes)}>
        {children}
      </span>
    );
  }
}

export default bsClass(
  'badge',
  bsStyles(
    [
      ...Object.values(State),
      Style.PRIMARY,
      Style.SECONDARY,
      Style.LIGHT,
      Style.DARK
    ],
    Style.SECONDARY,
    Badge
  )
);
