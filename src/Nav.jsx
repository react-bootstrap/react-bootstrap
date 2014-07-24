/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';


var Nav = React.createClass({
    mixins: [BootstrapMixin],

    propTypes: {
        bsStyle: React.PropTypes.oneOf(['tabs','pills','navbar-nav']),
        stacked: React.PropTypes.bool,
        justified: React.PropTypes.bool,
        navbar: React.PropTypes.bool,
        right: React.PropTypes.bool,
        dropdown: React.PropTypes.bool,
        onSelect: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            bsClass: 'nav',
            navbar: false
        };
    },

    render: function () {
        var classes = this.getBsClassSet(this.props.navbar);

        classes['nav-stacked'] = this.props.stacked;
        classes['nav-justified'] = this.props.justified;
        classes['navbar-right'] = this.props.right;
        classes['dropdown-menu'] = this.props.dropdown;

        if (this.props.dropdown) {
            classes['nav'] = false;
        }

        if (!this.props.navbar && !this.props.dropdown) {
            return this.transferPropsTo(
                <nav>
                    <NavItemRender classes={classes} children={this.props.children} renderNavItem={this.renderNavItem} id={this.props.id} topLevel={true} />
                </nav>
            );
        } else {
            return (
                <NavItemRender classes={classes} children={this.props.children} renderNavItem={this.renderNavItem} id={this.props.id}  />
            );
        }
    },

    getChildActiveProp: function (child) {
        if (child.props.active) {
            return true;
        }
        if (this.props.activeKey != null) {
            if (child.props.key === this.props.activeKey) {
                return true;
            }
        }
        if (this.props.activeHref != null) {
            if (child.props.href === this.props.activeHref) {
                return true;
            }
        }

        return child.props.active;
    },

    renderNavItem: function (child) {
        return utils.cloneWithProps(
            child,
            {
                active: this.getChildActiveProp(child),
                activeKey: this.props.activeKey,
                activeHref: this.props.activeHref,
                onSelect: utils.createChainedFunction(child.onSelect, this.props.onSelect),
                ref: child.props.ref,
                key: child.props.key
            }
        );
    }
});

var NavItemRender = function (props) {
    return (
        <ul className={classSet(props.classes)} id={props.id}>
            {utils.modifyChildren(props.children, props.renderNavItem)}
        </ul>
    );
};

export default = Nav;