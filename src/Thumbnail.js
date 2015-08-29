import React from 'react';
import classSet from 'classnames';
import SafeAnchor from './SafeAnchor';
import bootstrapUtils from './utils/bootstrapUtils';

const Thumbnail = React.createClass({


  propTypes: {
    ...bootstrapUtils.propTypes,
    alt: React.PropTypes.string,
    href: React.PropTypes.string,
    src: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'thumbnail'
    };
  },

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);

    if(this.props.href) {
      return (
        <SafeAnchor {...this.props} href={this.props.href} className={classSet(this.props.className, classes)}>
          <img src={this.props.src} alt={this.props.alt} />
        </SafeAnchor>
      );
    } else {
      if(this.props.children) {
        return (
          <div {...this.props} className={classSet(this.props.className, classes)}>
            <img src={this.props.src} alt={this.props.alt} />
            <div className="caption">
              {this.props.children}
            </div>
          </div>
        );
      } else {
        return (
          <div {...this.props} className={classSet(this.props.className, classes)}>
            <img src={this.props.src} alt={this.props.alt} />
          </div>
        );
      }
    }
  }
});

export default Thumbnail;
