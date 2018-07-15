import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';

class ButtonToolbar extends React.Component {
  static propTypes = {
    /**
     * @default 'btn-toolbar'
     */
    bsPrefix: PropTypes.string,

    /**
     * The ARIA role describing the button toolbar. Generally the default
     * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
     * prop is also recommended.
     */
    role: PropTypes.string,
  };

  static defaultProps = {
    role: 'toolbar',
  };

  render() {
    const { bsPrefix, className, ...props } = this.props;
    return <div {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(ButtonToolbar, 'btn-toolbar');
