import React, { PropTypes } from 'react';
import tbsUtils from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import classNames from 'classnames';


let NavbarToggle = React.createClass({

  propTypes: {
    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: PropTypes.node
  },

  contextTypes: {
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_onToggle: PropTypes.func,
  },

  getInitialState: function(){
    return {collapsed: true};
  },

  handleCollapsedState: function() {
    this.setState({collapsed: !this.state.collapsed});
  },

  render() {
    let { children, ...props } = this.props;
    let {
      $bs_navbar_bsClass: bsClass = 'navbar',
      $bs_navbar_onToggle: onToggle
    } = this.context;

    return (
      <button type="button"
        onClick={createChainedFunction(this.handleCollapsedState, onToggle)}
        className={ classNames(tbsUtils.prefix({ bsClass }, 'toggle'), {'collapsed': this.state.collapsed}) }
      >
        { children || [
          <span className="sr-only" key={0}>Toggle navigation</span>,
          <span className="icon-bar" key={1}></span>,
          <span className="icon-bar" key={2}></span>,
          <span className="icon-bar" key={3}></span>
        ]
        }
      </button>
    );
  }
});

export default NavbarToggle;
