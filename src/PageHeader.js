import React from 'react';
import classNames from 'classnames';

import ensureDomProps from './utils/ensureDomProps';

const PageHeader = React.createClass({
  render() {
    const domProps = ensureDomProps(this.props, 'div');
    return (
      <div {...domProps} className={classNames(this.props.className, 'page-header')}>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

export default PageHeader;
