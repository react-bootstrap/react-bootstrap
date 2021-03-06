import PropTypes from 'prop-types';
import * as React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  assertive: PropTypes.bool,
};

class Announce extends React.Component {
  render() {
    const { assertive, children, ...props } = this.props;
    return ReactDOM.createPortal(
      <div
        {...props}
        role="alert"
        className="visually-hidden"
        aria-live={assertive ? 'assertive' : 'polite'}
      >
        {children}
      </div>,
      document.body,
    );
  }
}

Announce.propTypes = propTypes;

export default Announce;
