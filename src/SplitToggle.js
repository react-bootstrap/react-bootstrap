import React from 'react';
import DropdownToggle from './DropdownToggle';

export default class SplitToggle extends React.Component {
  render() {
    return (
      <DropdownToggle
        {...this.props}
        title={undefined}
        useAnchor={false}>
        <span className="sr-only">
          {this.props.title}
        </span>
      </DropdownToggle>
    );
  }
}

SplitToggle.propTypes = {
  title: React.PropTypes.string
};

SplitToggle.isToggle = true;
SplitToggle.titleProp = 'dropdownTitle';
SplitToggle.onClickProp = 'handleDropdownClick';
