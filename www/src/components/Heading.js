import React from 'react';
import Anchor from './Anchor';

function Heading({ h, id, subtitle, children }) {
  return (
    <Anchor as={`h${h}`} id={id} className="d-flex align-items-center">
      {children}
      <span className="ml-auto" />
      {subtitle}
    </Anchor>
  );
}

export default Heading;
