import React from 'react';
import classSet from 'classnames';

const Jumbotron = React.createClass({
  render() {
    return (
      <div {...this.props} className={classSet(this.props.className, 'jumbotron')}>
        {this.props.children}
      </div>
    );
  }
});

export default Jumbotron;
