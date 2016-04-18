import classSet from 'classnames';
import React from 'react';

import { bsClass, getClassSet } from './utils/bootstrapUtils';

import SafeAnchor from './SafeAnchor';

const Thumbnail = React.createClass({

  propTypes: {
    alt: React.PropTypes.string,
    href: React.PropTypes.string,
    src: React.PropTypes.string
  },

  render() {
    let classes = getClassSet(this.props);

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
});

export default bsClass('thumbnail', Thumbnail);
