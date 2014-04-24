/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';


var Navbar = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    fixedTop: React.PropTypes.bool,
    fixedBottom: React.PropTypes.bool,
    staticTop: React.PropTypes.bool,
    inverse: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      collapsed: true
    };
  },

  getDefaultProps: function () {
    return {
      bsClass: 'navbar',
      bsStyle: 'default'
    };
  },

  handleCollapse: function() {
    var collapsed = !this.state.collapsed;
    this.setState({collapsed: collapsed});
  },

  render: function () {
    var classes = this.getBsClassSet();

    var toggleClass = classSet({
      "navbar-toggle": true,
      "collapsed": this.state.collapsed
    });
    var collapseClass = classSet({
      "navbar-collapse": true,
      "collapse": true,
      "in": !this.state.collapsed
    });

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return this.transferPropsTo(
      <nav className={classSet(classes)} role="navigation">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className={toggleClass} data-toggle="collapse"
                data-target={'#' + this.props.target} onClick={this.handleCollapse}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{this.props.brand}</a>
          </div>

          <div className={collapseClass} id={this.props.target}>
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
});

export default = Navbar;