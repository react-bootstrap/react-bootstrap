import React from 'react';
import classNames from 'classnames';

const PageHeader = React.createClass({
  render() {
    return (
      <div {...this.props} className={classNames(this.props.className, 'page-header')}>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

export default PageHeader;
