import React from 'react';
import classNames from 'classnames';

const Jumbotron = React.createClass({
  render() {
    return (
      <div {...this.props} className={classNames(this.props.className, 'jumbotron')}>
        {this.props.children}
      </div>
    );
  }
});

export default Jumbotron;
