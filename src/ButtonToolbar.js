import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

class ButtonToolbar extends React.Component {
  static propTypes = {
    /**
     * The ARIA role describing the button toolbar. Generally the default
     * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
     * prop is also recommended.
     */
    role: PropTypes.string
  };
  static defaultProps = {
    role: 'toolbar'
  };
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return <div {...elementProps} className={classNames(className, classes)} />;
  }
}

export default bsClass('btn-toolbar', ButtonToolbar);
