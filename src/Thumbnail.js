import React from 'react';
import classSet from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import SafeAnchor from './SafeAnchor';

const Thumbnail = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
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
    let classes = this.getBsClassSet();

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

export default Thumbnail;
