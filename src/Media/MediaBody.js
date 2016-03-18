import React, {Component, PropTypes} from 'react';

export default class MediaBody extends Component {
  static propTypes = {
    /**
     * The heading of the media object
     */
    heading: PropTypes.string
  }

  render() {
    const {heading, children, className} = this.props;
    return (
      <div className={`media-body ${className}`}>
        <h4 className="media-heading">{heading}</h4>
        {children}
      </div>
    );
  }
}
