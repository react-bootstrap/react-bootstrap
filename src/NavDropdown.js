import React from 'react';
import Dropdown from './Dropdown';
import Glyphicon from './Glyphicon';

class NavDropdown extends React.Component {

  render() {
    let { children, title, noCaret, glyph, ...props } = this.props;

    if (glyph !== null) {
      title = ' ' + title;
    }

    return (
      <Dropdown {...props} componentClass="li">
        <Dropdown.Toggle
          useAnchor
          disabled={props.disabled}
          noCaret={noCaret}
        >
          {glyph &&
            <Glyphicon glyph={glyph} />}
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NavDropdown.propTypes = {
  noCaret: React.PropTypes.bool,
  title: React.PropTypes.node.isRequired,
  glyph: React.PropTypes.string,
  ...Dropdown.propTypes
};

export default NavDropdown;
