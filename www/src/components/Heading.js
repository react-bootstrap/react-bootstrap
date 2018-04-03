import React from 'react';

function Heading({ h, id, subtitle, children }) {
  const H = `h${h}`;

  return (
    <H id={id}>
      <a href={`#${id}`} className="anchor">
        <span className="anchor-icon">#</span>
        {children}
      </a>
      {subtitle}
    </H>
  );
}

export default Heading;
