import * as React from 'react';

function DocLink({ path, children }) {
  return <a href={`https://getbootstrap.com/docs/5.3/${path}`}>{children}</a>;
}

export default DocLink;
