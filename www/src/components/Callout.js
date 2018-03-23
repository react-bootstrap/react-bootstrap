import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.oneOf(['danger', 'warning', 'info']).isRequired
};

function Callout({ title, children, theme }) {
  return (
    <div className={`bs-callout bs-callout-${theme}`}>
      {title && <h4>{title}</h4>}
      <p>{children}</p>
    </div>
  );
}

Callout.propTypes = propTypes;

export default Callout;
