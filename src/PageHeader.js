import React from 'react';
import classSet from 'classnames';

const PageHeader = React.createClass({
  render() {
    return (
      <div {...this.props} className={classSet(this.props.className, 'page-header')}>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

export default PageHeader;
