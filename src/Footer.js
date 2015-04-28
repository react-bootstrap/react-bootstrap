import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const Footer = React.createClass({
  mixins: [BootstrapMixin],

  render() {
    return (
      <footer {...this.props} className={classNames(this.props.className, 'footer')}>
        <div className="container">
          {this.props.children}
        </div>
      </footer>
    );
  }
});

export default Footer;
