import React, {Component} from 'react';

export default class Media extends Component {
  render() {
    const {className, children} = this.props;
    return (
      <div className={`media ${className}`}>
        {children}
      </div>
    );
  }
}
