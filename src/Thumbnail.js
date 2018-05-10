import PropTypes from 'prop-types';
import React from 'react';
import classSet from 'classnames';
import SafeAnchor from './SafeAnchor';
import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';

class Thumbnail extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.string
  };

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    if (this.props.href) {
      return (
        <SafeAnchor {...this.props} href={this.props.href} className={classSet(this.props.className, classes)}>
          <img src={this.props.src} alt={this.props.alt} />
        </SafeAnchor>
      );
    }

    if (this.props.children) {
      return (
        <div {...this.props} className={classSet(this.props.className, classes)}>
          <img src={this.props.src} alt={this.props.alt} />
          <div className="caption">
            {this.props.children}
          </div>
        </div>
      );
    }

    return (
      <div {...this.props} className={classSet(this.props.className, classes)}>
        <img src={this.props.src} alt={this.props.alt} />
      </div>
    );
  }
}

export default bsClass('thumbnail', Thumbnail);
