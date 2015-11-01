import React from 'react';
import Dropdown from './Dropdown';
import omit from 'lodash-compat/object/omit';
import Button from './Button';

class DropdownButton extends React.Component {

  render() {
    let { title, ...props } = this.props;

    let toggleProps = omit(props, Dropdown.ControlledComponent.propTypes);

    return (
      <Dropdown {...props}>
        <Dropdown.Toggle {...toggleProps}>
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DropdownButton.propTypes = {
  bsStyle: Button.propTypes.bsStyle,
  bsSize: Button.propTypes.bsSize,

  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: React.PropTypes.bool,
  title: React.PropTypes.node.isRequired,

  ...Dropdown.propTypes,
};

DropdownButton.defaultProps = {
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

export default DropdownButton;
