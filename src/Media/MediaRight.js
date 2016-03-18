import React, {Component, PropTypes} from 'react';

export default class MediaRight extends Component {
  static propTypes = {
    /**
     * The media will link to the address given here
     */
    href: PropTypes.string,
    /**
     * Align the media to one of these positions
     */
    align: PropTypes.oneOf(['top', 'middle', 'bottom'])
  }

  static defaultProps = {
    href: '#',
    align: 'top'
  }

  render() {
    const {href, align, children, className} = this.props;

    return (
      <div className={`media-right media-${align} ${className}`}>
        <a href={href}>
          {children}
        </a>
      </div>
    );
  }
}
